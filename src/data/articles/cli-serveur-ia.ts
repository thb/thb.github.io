import type { Article } from './index'

export const cliServeurIA: Article = {
  slug: 'cli-gestion-serveur-ia',
  title: "Créer son CLI de gestion serveur avec l'IA",
  description: "Comment j'ai créé en une session un CLI style Scalingo pour gérer mon serveur dédié : rails c, backups, restore, logs...",
  date: '2026-01-21',
  tags: ['IA', 'CLI', 'DevOps', 'Infrastructure', 'Bash'],
  content: `
## Le problème

J'ai un serveur dédié (rdmpr-one) qui héberge une dizaine de services Docker : apps Rails, WordPress, monitoring... Chaque fois que je veux :

- Ouvrir une console Rails
- Vérifier les logs
- Lancer un backup
- Restaurer une base de données

Je dois me souvenir de la bonne commande Docker, du bon nom de container, des credentials S3... C'est fastidieux.

Sur Scalingo (PaaS), tout ça se fait en une commande : \`scalingo -a myapp run rails c\`. Je voulais la même chose pour mon serveur.

## La solution : 1h avec Claude Code

J'ai ouvert Claude Code dans mon repo \`servers/rdmpr-one\` et j'ai demandé :

> "Crée-moi un CLI bash style Scalingo pour interagir avec mes services. Je veux pouvoir faire \`rdmpr -a folklovers rails c\` pour ouvrir une console Rails, \`rdmpr -a folklovers backup\` pour lancer un backup, etc."

Claude a lu mon CLAUDE.md (qui documente toute l'architecture), et m'a proposé un script complet.

## Le résultat : \`rdmpr\`

Un CLI de 340 lignes qui fait tout :

\`\`\`bash
# Console Rails
rdmpr -a folklovers rails c

# Console PostgreSQL
rdmpr -a daysplit psql

# Shell dans le container
rdmpr -a revela bash

# Logs en streaming
rdmpr -a astuto logs
rdmpr -a astuto logs db  # logs de la DB

# Upload un fichier SQL et l'exécuter
rdmpr -a folklovers sql migration.sql

# Backup manuel
rdmpr -a folklovers backup

# Lister les backups S3
rdmpr -a folklovers backups list

# Restaurer un backup (avec confirmation)
rdmpr -a folklovers restore 20260121_folklovers.pgsql

# Lister les apps disponibles
rdmpr apps
\`\`\`

## Architecture du CLI

Le script utilise une fonction de configuration par app :

\`\`\`bash
get_config() {
  local app="$1"
  case "$app" in
    folklovers)
      WEB="folklovers-backend-1"
      DB="folklovers-db-1"
      DB_USER="folklovers"
      DB_NAME="folklovers_production"
      S3_PREFIX="folklovers"
      SERVICE_DIR="folklovers"
      HAS_BACKUP=true
      ;;
    daysplit)
      # ...
      ;;
  esac
}
\`\`\`

Chaque app a sa config : nom des containers, credentials DB, préfixe S3 pour les backups.

## Les commandes implémentées

### 1. Console Rails

\`\`\`bash
rdmpr -a folklovers rails c
\`\`\`

Exécute \`docker exec -it folklovers-backend-1 bundle exec rails c\` via SSH. Le \`-t\` de SSH préserve le TTY pour l'interactivité.

### 2. Console PostgreSQL

\`\`\`bash
rdmpr -a daysplit psql
\`\`\`

Se connecte directement au container DB avec les bons credentials.

### 3. Gestion des backups

\`\`\`bash
# Liste les 30 derniers backups (triés du plus récent)
rdmpr -a folklovers backups list

# Output:
# 2026-01-21 03:00:05   45.2 MiB 20260121030005_folklovers.pgsql
# 2026-01-20 03:00:04   45.1 MiB 20260120030004_folklovers.pgsql
# ...
\`\`\`

Le CLI charge les credentials S3 depuis le \`.env\` du service et utilise AWS CLI pour lister le bucket.

### 4. Restore avec confirmation

\`\`\`bash
rdmpr -a folklovers restore 20260121_folklovers.pgsql

# === RESTORE DATABASE ===
# App:    folklovers
# DB:     folklovers_production
# Backup: 20260121_folklovers.pgsql
#
# ATTENTION: Cette opération va écraser la base de données actuelle !
#
# Êtes-vous sûr de vouloir continuer ? (yes/no):
\`\`\`

Le restore :
1. Télécharge le backup depuis S3
2. Le copie dans le container DB
3. Exécute \`pg_restore\` (PostgreSQL) ou mysql (WordPress)
4. Nettoie les fichiers temporaires

### 5. Exécution SQL

\`\`\`bash
rdmpr -a folklovers sql fix_data.sql
\`\`\`

Upload le fichier, le copie dans le container, et l'exécute. Pratique pour les migrations manuelles ou les corrections de données.

## Ce que l'IA a apporté

### 1. Lecture du contexte existant

Mon CLAUDE.md documentait déjà :
- Les noms des containers
- Les commandes de backup/restore
- L'architecture réseau
- Les credentials patterns

Claude a synthétisé tout ça en un CLI cohérent.

### 2. Gestion des edge cases

- Support MySQL pour WordPress (pas que PostgreSQL)
- Gestion des noms de containers avec \`-1\` (docker compose)
- Fallback \`/bin/sh\` si \`/bin/bash\` n'existe pas
- Confirmation avant restore destructif

### 3. Couleurs et UX

\`\`\`bash
RED='\\033[0;31m'
GREEN='\\033[0;32m'
YELLOW='\\033[0;33m'
BLUE='\\033[0;34m'
\`\`\`

Le CLI est agréable à utiliser avec des messages colorés et clairs.

## Installation

Le script vit dans \`bin/rdmpr\` du repo. Pour l'utiliser globalement :

\`\`\`bash
# Symlink dans le PATH
ln -s /Users/thb/Projects/servers/rdmpr-one/bin/rdmpr /usr/local/bin/rdmpr

# Ou alias dans .zshrc
alias rdmpr="/Users/thb/Projects/servers/rdmpr-one/bin/rdmpr"
\`\`\`

## Ce que je gagne

| Avant | Après |
|-------|-------|
| \`ssh deploy@rdmpr-one "docker exec -it folklovers-backend-1 bundle exec rails c"\` | \`rdmpr -a folklovers rails c\` |
| Chercher le nom du container dans la doc | \`rdmpr apps\` |
| Script de restore manuel avec 10 étapes | \`rdmpr -a folklovers restore <file>\` |

## Conclusion

En une heure, j'ai un CLI qui me fait gagner du temps chaque jour.

L'IA n'a pas inventé l'architecture — elle était déjà documentée dans mon CLAUDE.md. Mais elle a transformé cette documentation en outil utilisable.

C'est ça le vrai gain : **transformer la connaissance passive (documentation) en connaissance active (CLI)**.

Le fichier CLAUDE.md devient un investissement qui se rentabilise à chaque nouveau script généré.
  `.trim()
}
