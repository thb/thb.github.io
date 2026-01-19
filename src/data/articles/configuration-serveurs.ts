import type { Article } from './index'

export const configurationServeurs: Article = {
  slug: 'agents-ia-configuration-serveurs',
  title: "Utiliser les agents IA pour configurer vos serveurs",
  description: "Comment j'ai créé une infrastructure Docker complète avec sécurité, backups et monitoring — l'IA à 70-80% d'autonomie.",
  date: '2026-01-19',
  tags: ['IA', 'DevOps', 'Docker', 'Infrastructure'],
  content: `
## Le contexte

Je voulais réduire mes coûts d'hébergement en auto-hébergeant des solutions open source :
- **Sentry/Glitchtip** pour le monitoring d'erreurs
- **Matomo** pour les analytics (bye bye Google Analytics)
- **Side projects** et sites d'amis

Plutôt que de payer 50€/mois par service SaaS, un serveur dédié à 30€/mois peut tout héberger.

Le problème : configurer tout ça demande des compétences DevOps que je n'avais pas envie de maintenir manuellement.

## La solution : l'IA comme DevOps

J'ai demandé à Claude de créer une structure complète de services Docker avec :
- Reverse proxy (Traefik) avec SSL automatique
- Isolation entre services
- Backups automatisés
- Monitoring serveur

**Résultat : l'IA a été autonome à 70-80%** sur la création de cette infrastructure.

## Architecture créée

\`\`\`
rdmpr-one/
├── traefik/              # Reverse proxy + certificats SSL auto
│   ├── docker-compose.yml
│   ├── traefik.yml
│   └── .env
├── glitchtip/            # Error tracking (alternative Sentry)
│   ├── docker-compose.yml
│   └── .env
├── matomo/               # Analytics
├── uptime-kuma/          # Monitoring uptime
├── beszel/               # Monitoring ressources serveur
├── folklovers/           # Side project Rails
├── revela/               # Side project Rails
└── scripts/
    ├── backup.sh         # Backup quotidien → S3
    └── deploy.sh         # Déploiement automatisé
\`\`\`

Chaque service est **cloisonné** dans son propre docker-compose avec son propre réseau.

## Principes 12-factor respectés

L'IA a naturellement appliqué les bonnes pratiques :

### 1. Configuration par variables d'environnement

\`\`\`yaml
# Chaque service a son .env
environment:
  - DATABASE_URL=\${DATABASE_URL}
  - SECRET_KEY_BASE=\${SECRET_KEY_BASE}
  - SMTP_HOST=\${SMTP_HOST}
\`\`\`

### 2. Aucun stockage local critique

Les données persistantes sont sur des volumes nommés, les backups partent vers S3 :

\`\`\`yaml
volumes:
  - postgres_data:/var/lib/postgresql/data
  - uploads:/app/storage
\`\`\`

### 3. Services liés déclarativement

\`\`\`yaml
depends_on:
  - postgres
  - redis
\`\`\`

## Accès aux services cloud

L'agent utilise les CLI cloud pour gérer l'infrastructure externe. Dans mon cas, Scaleway :

\`\`\`bash
# L'agent peut exécuter ces commandes
scw dns record add mydomain.com --type A --data 1.2.3.4
scw object-storage bucket create backups-prod
scw tem domain add mydomain.com
\`\`\`

**Ce que l'IA gère en autonomie :**
- Création et configuration des buckets S3 (Object Storage)
- Configuration des domaines et DNS
- Setup des emails transactionnels
- Configuration CDN si nécessaire

## Système de backup

L'agent a créé un script de backup complet :

\`\`\`bash
#!/bin/bash
# backup.sh - Exécuté chaque nuit à 3h

SERVICES="glitchtip matomo folklovers revela"
BUCKET="s3://rdmpr-one-backups"
RETENTION_DAYS=90

for service in $SERVICES; do
  # Dump des bases de données
  docker compose -f $service/docker-compose.yml exec -T postgres \\
    pg_dump -U app > /tmp/$service.sql

  # Upload vers S3
  aws s3 cp /tmp/$service.sql $BUCKET/$service/$(date +%Y-%m-%d).sql

  # Nettoyage vieux backups
  aws s3 ls $BUCKET/$service/ | while read -r line; do
    # ... logique de rétention
  done
done
\`\`\`

**Résultat** : backups automatiques, stockés sur Scaleway S3, rétention 90 jours.

## Monitoring

### Uptime Kuma
- Vérifie que chaque service répond
- Alertes Slack/email si down

### Beszel
- Monitoring CPU, RAM, disque
- Alertes si ressources critiques

L'agent a configuré les deux et les a intégrés à Traefik.

## Repository miroir

Toute la configuration est versionnée sur GitHub :

\`\`\`
servers/
└── rdmpr-one/
    ├── README.md           # Documentation générée par l'IA
    ├── docker-compose.yml  # Orchestration globale
    └── services/
        └── [chaque service]/
\`\`\`

Le README contient les instructions pour reproduire l'infra sur un nouveau serveur.

## Ce que l'IA ne fait pas (encore)

- **Diagnostic réseau complexe** : quand ça marche pas, il faut parfois débugger manuellement
- **Optimisation fine** : les configs par défaut marchent, mais pas toujours optimales
- **Sécurité avancée** : j'ai fait une review manuelle des règles firewall

## Workflow type

1. **Je décris le besoin** : "Je veux héberger Matomo pour mes analytics"
2. **L'agent génère** : docker-compose.yml, .env.example, config Traefik
3. **Je review** : vérification sécurité, variables d'env
4. **Déploiement** : \`docker compose up -d\`
5. **Documentation** : L'agent met à jour le README

## Coût final

| Avant (SaaS) | Après (self-hosted) |
|--------------|---------------------|
| Sentry : 26€/mois | Glitchtip : 0€ |
| Analytics : 9€/mois | Matomo : 0€ |
| Monitoring : 15€/mois | Uptime Kuma : 0€ |
| **Total : ~50€/mois** | **Serveur : 30€/mois** |

Plus la flexibilité totale et la propriété des données.

## Conclusion

L'IA transforme le DevOps d'une expertise rare en une compétence accessible.

Tu décris ce que tu veux, l'agent génère la config, tu valides et déploies. Le serveur tourne avec un coût négligeable.

La clé : **donner accès SSH à l'agent et aux CLI cloud**. Il peut alors tout orchestrer.
  `.trim()
}
