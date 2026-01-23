import type { Article } from './index'

export const optimisationPerfIA: Article = {
  slug: 'optimisation-performances-saas-ia',
  title: "Comment l'IA a optimisé les performances de mon SaaS en 10 minutes",
  description: "Benchmarking, réseau Docker, tuning PostgreSQL : l'IA a trouvé un cache hit ratio de 50% et l'a corrigé.",
  date: '2026-01-23',
  tags: ['IA', 'Performance', 'PostgreSQL', 'Docker', 'DevOps'],
  content: `
## Le contexte

J'héberge plusieurs SaaS sur mon serveur dédié (rdmpr-one). En comparant avec Scalingo (PaaS), je trouvais mes apps plus lentes. Scalingo a sûrement des optimisations (disques NVMe, tuning fin), mais il y avait forcément des choses à améliorer de mon côté.

J'ai demandé à Claude de faire un audit de performance.

## Étape 1 : Benchmarking réseau

Premier constat : les apps avec SSR (Next.js, TanStack Start) appelaient l'API backend **via Internet** même côté serveur.

\`\`\`
Browser → Next.js (SSR) → Internet → API Backend
                ↑
        Passage par Internet inutile
\`\`\`

### La solution : réseau Docker interne

Claude a proposé d'utiliser deux URLs différentes :

\`\`\`bash
# Pour le SSR (côté serveur) - réseau Docker interne
API_URL=http://backend:3000

# Pour le client (navigateur) - URL publique
NEXT_PUBLIC_API_URL=https://api.monapp.com
\`\`\`

Le SSR passe maintenant par le réseau Docker interne, sans sortir sur Internet.

**Gain** : latence divisée par 3-4 sur les pages SSR.

## Étape 2 : Investigation PostgreSQL

J'ai demandé à Claude d'aller plus loin. Il a commencé par mesurer les temps de requête :

\`\`\`
=== Query timing ===
SELECT COUNT(*) FROM users;    → 2ms
SELECT COUNT(*) FROM projects; → 7ms
\`\`\`

2-7ms pour des COUNT sur des petites tables ? C'est lent.

### Le diagnostic : cache hit ratio

\`\`\`sql
SELECT
  sum(heap_blks_read) as disk_reads,
  sum(heap_blks_hit) as cache_hits,
  round(100.0 * sum(heap_blks_hit) /
    nullif(sum(heap_blks_hit) + sum(heap_blks_read), 0), 2)
    as cache_hit_ratio
FROM pg_statio_user_tables;
\`\`\`

Résultat :

\`\`\`
 disk_reads | cache_hits | cache_hit_ratio
------------+------------+-----------------
     304261 |     304690 |           50.04
\`\`\`

**50% de cache hit ratio.** La moitié des lectures allaient au disque.

Pour référence, un PostgreSQL bien configuré devrait avoir **99%+** de cache hit.

### La cause : configuration par défaut

PostgreSQL avec \`shared_buffers=128MB\` (la valeur par défaut) était largement sous-dimensionné pour mes workloads.

## Étape 3 : Tuning PostgreSQL

Claude a proposé de modifier le docker-compose pour passer des paramètres à PostgreSQL :

\`\`\`yaml
services:
  db:
    image: postgres:16
    environment:
      POSTGRES_USER: \${POSTGRES_USER}
      POSTGRES_PASSWORD: \${POSTGRES_PASSWORD}
      POSTGRES_DB: \${POSTGRES_DB}
    # Tuning PostgreSQL pour meilleures performances
    command:
      - "postgres"
      - "-c"
      - "shared_buffers=256MB"
      - "-c"
      - "effective_cache_size=1GB"
      - "-c"
      - "work_mem=16MB"
      - "-c"
      - "maintenance_work_mem=128MB"
      - "-c"
      - "random_page_cost=1.1"  # SSD
\`\`\`

### Explication des paramètres

| Paramètre | Défaut | Nouveau | Effet |
|-----------|--------|---------|-------|
| \`shared_buffers\` | 128MB | 256MB | Cache des données en RAM |
| \`effective_cache_size\` | 4GB | 1GB | Estimation pour le planner |
| \`work_mem\` | 4MB | 16MB | Mémoire pour tris/hashs |
| \`maintenance_work_mem\` | 64MB | 128MB | Mémoire pour VACUUM |
| \`random_page_cost\` | 4.0 | 1.1 | Optimisé pour SSD |

## Résultats : les chiffres

Après redémarrage du container PostgreSQL :

\`\`\`
 disk_reads | cache_hits | cache_hit_ratio
------------+------------+-----------------
       1203 |     892451 |           99.87
\`\`\`

**De 50% à 99.87% de cache hit ratio.**

### Benchmark complet : rdmpr-one vs Scalingo

| Métrique | Staging (rdmpr-one) | Production (Scalingo) |
|----------|---------------------|----------------------|
| Frontend TTFB | ~186ms | ~181ms |
| API externe | ~140ms | ~60ms |
| API interne Docker | **~3ms** | N/A |

Le vrai gain : les appels API server-side (SSR) passent de 60-140ms à **3ms**.

### Récapitulatif des optimisations

| Action | Avant | Après |
|--------|-------|-------|
| PostgreSQL shared_buffers | 128MB | 256MB |
| PostgreSQL effective_cache_size | 512MB | 1GB |
| API interne (Docker) | ~70ms HTTPS | ~3ms HTTP |
| Frontend TTFB staging | ~200ms | ~186ms |

## Impact sur ma stratégie de migration

Je migre progressivement de Scalingo (PaaS) vers mon serveur dédié. Ces benchmarks ont clarifié la stratégie :

### Apps avec SSR (Next.js, TanStack Start)

**Verdict : migration idéale.**

- Frontend + Backend sur le même serveur = appels internes à 3ms
- Le TTFB est équivalent à Scalingo (~186ms vs ~181ms)
- Le SSR bénéficie à fond du réseau Docker interne

### Apps SPA (frontend statique)

**Verdict : migration OK, latence comparable.**

- Les appels API viennent du navigateur utilisateur
- La latence dépend de la distance user ↔ serveur
- Pour des utilisateurs européens : ~50-100ms (comme Scalingo, aussi en Europe)
- Option : servir le frontend statique via CDN si besoin

### Conclusion stratégique

La différence de 60ms vs 140ms sur l'API directe vient de la distance géographique (mon laptop vs les datacenters). Pour les vrais utilisateurs dispersés en Europe, les deux solutions sont équivalentes.

**Le vrai gain du serveur dédié** : pour les apps SSR, les appels API server-side passent de 60-140ms à 3ms. C'est un avantage que Scalingo ne peut pas offrir (frontend et backend sur des containers séparés).

## Ce que l'IA a aussi investigué

En 10 minutes, Claude a balayé plusieurs pistes :

- **Workers Puma** : 8 workers, OK pour le serveur
- **Réseau Docker** : bridge vs host mode
- **SSL/TLS** : overhead négligeable
- **Connection pooling** : PgBouncer pas nécessaire à cette échelle
- **Indexes** : tous présents et utilisés

Il a identifié les deux vrais problèmes (réseau SSR + cache PostgreSQL) parmi toutes ces variables.

## Le workflow

1. **"Fais un audit de performance de mon app"**
2. Claude lance des benchmarks via SSH
3. Il identifie les anomalies (latence réseau, cache ratio bas)
4. Il propose des fixes concrets (URLs, docker-compose)
5. On applique et on vérifie

Le tout en une session de 10 minutes, avec accès SSH au serveur.

## Ce que ça m'aurait coûté sans l'IA

- Rechercher les bonnes métriques PostgreSQL : 30 min
- Comprendre les paramètres de tuning : 1h
- Diagnostiquer le problème réseau SSR : 30 min
- Tester différentes configurations : 2h

**Total : ~4h de travail condensées en 10 minutes.**

## Conclusion

L'IA excelle dans ce type de tâche :
- Accès au serveur via SSH/Docker
- Connaissance des métriques de diagnostic
- Benchmark méthodique de plusieurs variables
- Propositions de fixes concrètes et applicables

Je n'aurais jamais pensé à vérifier le cache hit ratio PostgreSQL. L'IA si.

C'est ça le vrai gain : **l'IA sait quoi chercher**, même quand toi tu ne sais pas par où commencer.
  `.trim()
}
