import type { Article } from './index'

export const dashboardGithubActions: Article = {
  slug: 'dashboard-github-actions',
  title: "J'ai besoin d'un dashboard pour toutes mes GitHub Actions",
  description: "Quand la CI/CD devient centrale, voir le statut de tous ses projets d'un coup devient un vrai besoin.",
  date: '2026-01-20',
  tags: ['GitHub', 'CI/CD', 'DevOps', 'Outils'],
  content: `
## Le constat

Avec l'utilisation massive de GitHub Actions sur tous mes projets, je me retrouve à jongler entre :

- **zenflow-back** : API Rails, tests + build + deploy
- **zenflow-front** : App React, tests + build + deploy
- **zenflow-mobile** : App Expo, build iOS/Android
- **fabrix-platform** : Next.js + Rails, preview + prod
- **thb.github.io** : Ce site, deploy sur GitHub Pages
- **servers** : Scripts infra, validation configs

Chaque projet a son workflow. Certains ont plusieurs workflows (test, build, deploy, scheduled).

**Le problème** : pour voir si tout va bien, je dois ouvrir chaque repo, aller dans l'onglet Actions, scanner visuellement.

C'est 6 repos × 2-3 workflows × quelques secondes = trop de friction.

## Ce que je voudrais

Un dashboard unique qui affiche :

\`\`\`
┌─────────────────────────────────────────────────────┐
│  TOUS MES WORKFLOWS                                 │
├─────────────────────────────────────────────────────┤
│  ✓ zenflow-back      Deploy     2 min ago    15s   │
│  ✓ zenflow-front     Deploy     5 min ago    22s   │
│  ✗ zenflow-mobile    Build iOS  1h ago       FAIL  │
│  ✓ fabrix-platform   Preview    3h ago       45s   │
│  ✓ thb.github.io     Deploy     4h ago       25s   │
│  ⏳ servers          Backup     running...         │
└─────────────────────────────────────────────────────┘
\`\`\`

D'un coup d'œil :
- Quel projet a un problème (rouge)
- Quel workflow tourne en ce moment
- Depuis combien de temps ça a été déployé

## Ce qui existe : gitactionboard

Après une recherche Google, je tombe sur [gitactionboard](https://otto-de.github.io/gitactionboard/).

**Ce que ça fait** :
- Agrège les workflows de plusieurs repos
- Affiche le statut en temps réel
- Open source, self-hostable

**Le problème** : c'est assez moche. L'UI date. Pas de dark mode. Difficile à scanner visuellement.

Mais ça prouve que le besoin existe et que d'autres l'ont résolu.

## Les alternatives

### 1. GitHub Mobile
L'app mobile notifie les échecs, mais pas de vue d'ensemble.

### 2. Slack/Discord notifications
On peut configurer des webhooks pour être notifié des échecs. Mais :
- Ça ne donne pas une vue globale
- Ça pollue les channels
- Pas de "tout va bien" visible

### 3. Grafana + GitHub API
On peut builder son propre dashboard avec :
- L'API GitHub pour récupérer les statuts
- Grafana pour visualiser
- Un cron qui poll régulièrement

Overkill pour mon usage, mais propre.

### 4. Un side project ?

C'est typiquement le genre de projet que l'IA peut aider à construire rapidement :

\`\`\`
"Crée une app React qui :
- Prend une liste de repos GitHub en config
- Fetch les derniers workflow runs via l'API GitHub
- Affiche un dashboard minimaliste avec statut, durée, date
- Auto-refresh toutes les 30 secondes
- Dark mode par défaut"
\`\`\`

En une session de travail avec un agent, c'est faisable.

## Ce que ça dit sur notre workflow

Ce besoin émerge parce que **la CI/CD est devenue centrale**.

Avant : on déployait manuellement, on savait ce qui tournait.

Maintenant : tout est automatisé, on a besoin de **visibilité** sur l'automatisation.

C'est un pattern récurrent :
1. On automatise un process
2. On perd la visibilité manuelle qu'on avait
3. On a besoin d'un dashboard pour retrouver cette visibilité

## Prochaine étape

Soit j'utilise gitactionboard malgré son UI datée.

Soit je construis un mini-dashboard minimaliste adapté à mes besoins.

Dans les deux cas, le besoin est clair : **voir d'un coup d'œil si tous mes projets sont verts**.

---

*Si quelqu'un connaît un outil propre pour ça, je suis preneur.*
  `.trim()
}
