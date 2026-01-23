import type { Article } from './index'

export const claudeCodeSkills: Article = {
  slug: 'claude-code-skills-slash-commands',
  title: "Claude Code Skills : créer ses propres commandes",
  description: "Comment créer des slash commands personnalisées qui se chargent à la demande et économisent des tokens.",
  date: '2026-01-23',
  tags: ['IA', 'Claude Code', 'Skills', 'Productivité'],
  content: `
## C'est quoi un Skill ?

Un Skill est une commande personnalisée pour Claude Code. Tu crées un fichier markdown avec des instructions, et ça devient une commande \`/mon-skill\` utilisable dans le terminal.

**L'avantage clé** : contrairement au CLAUDE.md qui est chargé à chaque session, un Skill ne consomme des tokens que quand tu l'invoques.

## Structure minimale

Un skill = un dossier avec un fichier \`SKILL.md\` :

\`\`\`
.claude/skills/deploy/
└── SKILL.md
\`\`\`

Le fichier contient deux parties : **frontmatter YAML** + **instructions markdown**.

\`\`\`yaml
---
name: deploy
description: Déploie l'application en production
disable-model-invocation: true
---

Déploie l'application :

1. Lance les tests
2. Build le projet
3. Push sur le serveur
4. Vérifie le health check
\`\`\`

Invocation : \`/deploy\`

## Où placer ses skills

| Emplacement | Chemin | Portée |
|-------------|--------|--------|
| Personnel | \`~/.claude/skills/<nom>/SKILL.md\` | Tous tes projets |
| Projet | \`.claude/skills/<nom>/SKILL.md\` | Ce projet uniquement |

## Le frontmatter YAML

Les options les plus utiles :

\`\`\`yaml
---
name: mon-skill                  # Devient /mon-skill
description: Quand l'utiliser    # Claude peut auto-trigger si pertinent
disable-model-invocation: true   # Seulement toi peux l'invoquer (pas d'auto)
allowed-tools: Read, Grep        # Restreint les outils autorisés
context: fork                    # Exécute dans un subagent isolé
agent: Explore                   # Type de subagent
---
\`\`\`

### Invocation manuelle vs auto-trigger

| Option | Toi | Claude |
|--------|-----|--------|
| Par défaut | ✅ \`/skill\` | ✅ Auto si description match |
| \`disable-model-invocation: true\` | ✅ \`/skill\` | ❌ |
| \`user-invocable: false\` | ❌ | ✅ Auto uniquement |

**Règle** : Mets \`disable-model-invocation: true\` pour les skills avec side effects (deploy, commit, envoi de messages).

## Variables et arguments

### \`$ARGUMENTS\`

\`\`\`yaml
---
name: fix-issue
---

Corrige l'issue GitHub #$ARGUMENTS en suivant nos conventions.
\`\`\`

\`/fix-issue 123\` → Claude reçoit "Corrige l'issue GitHub #123..."

### Injection shell avec \`!\`

\`\`\`yaml
---
name: pr-summary
---

## Contexte de la PR
- Diff: !\`gh pr diff\`
- Fichiers: !\`gh pr diff --name-only\`

Résume cette PR.
\`\`\`

Les commandes s'exécutent **avant** que Claude voie le contenu. Pratique pour injecter du contexte dynamique.

## Exemples concrets

### 1. Commit-push-pr (le classique de Boris Cherny)

\`\`\`yaml
---
name: commit-push-pr
description: Commit, push et crée une PR
disable-model-invocation: true
---

1. Stage tous les changements avec git add -A
2. Crée un commit avec un message descriptif basé sur les changements
3. Push sur origin avec git push -u origin HEAD
4. Crée une PR avec gh pr create
5. Retourne l'URL de la PR
\`\`\`

### 2. Review de code (avec subagent)

\`\`\`yaml
---
name: review
description: Review le code modifié
context: fork
agent: Explore
allowed-tools: Read, Grep, Glob
---

## Changements à reviewer
!\`git diff --name-only HEAD~1\`

Review ces fichiers :
- Bugs potentiels
- Code smells
- Suggestions d'amélioration

Sois concis et actionnable.
\`\`\`

Le \`context: fork\` fait tourner la review dans un subagent isolé — le gros output reste dans son contexte, pas le tien.

### 3. Documentation API

\`\`\`yaml
---
name: api-docs
description: Conventions API de ce projet. Charge automatiquement quand on travaille sur des endpoints.
---

## Conventions API

- Endpoints RESTful : GET /resources, POST /resources, etc.
- Réponses JSON avec structure { data, meta, errors }
- Codes HTTP standards : 200, 201, 400, 404, 422, 500
- Pagination : ?page=1&per_page=20
- Auth : Bearer token dans header Authorization
\`\`\`

Celui-ci n'a pas \`disable-model-invocation\` — Claude le charge automatiquement quand tu travailles sur des endpoints.

### 4. Skill de debug avec contexte serveur

\`\`\`yaml
---
name: debug-prod
description: Debug un problème en production
disable-model-invocation: true
---

## État actuel du serveur
!\`ssh deploy@server "docker ps --format 'table {{.Names}}\t{{.Status}}'"\`

## Logs récents
!\`ssh deploy@server "docker logs --tail 50 app-web"\`

Analyse ces infos et propose des solutions.
\`\`\`

## Fichiers de support

Pour les skills complexes, garde \`SKILL.md\` sous 500 lignes et référence des fichiers :

\`\`\`
.claude/skills/api-design/
├── SKILL.md           # Instructions principales
├── conventions.md     # Détails des conventions
├── examples/
│   └── endpoint.md    # Exemple d'endpoint bien fait
└── templates/
    └── controller.md  # Template de controller
\`\`\`

Dans \`SKILL.md\` :

\`\`\`markdown
Pour les conventions détaillées, voir [conventions.md](conventions.md).
Pour un exemple, voir [examples/endpoint.md](examples/endpoint.md).
\`\`\`

Claude charge les fichiers référencés uniquement si nécessaire.

## Pourquoi c'est mieux que CLAUDE.md

| Aspect | CLAUDE.md | Skill |
|--------|-----------|-------|
| Chargement | Toujours (chaque session) | À la demande |
| Tokens | Consommés en permanence | Seulement à l'invocation |
| Organisation | Un seul fichier | Un dossier par workflow |
| Maintenance | Devient vite énorme | Modulaire |

**La règle** : CLAUDE.md pour le contexte projet essentiel (< 500 lignes). Skills pour les workflows spécialisés.

## Migration depuis CLAUDE.md

Si ton CLAUDE.md fait 2000 lignes avec des sections "Déploiement", "Review PR", "Conventions API"...

1. Crée un skill par section
2. Garde dans CLAUDE.md uniquement : architecture, conventions de base, chemins importants
3. Tes tokens te remercieront

## Troubleshooting

| Problème | Solution |
|----------|----------|
| Skill pas listé | Vérifie le chemin : \`.claude/skills/<nom>/SKILL.md\` |
| Auto-trigger trop fréquent | Ajoute \`disable-model-invocation: true\` |
| Pas assez d'auto-trigger | Améliore la \`description\` avec des mots-clés |
| Skill trop gros | Déplace le détail dans des fichiers de support |

---

Sources :
- [Extend Claude with skills - Claude Code Docs](https://code.claude.com/docs/en/slash-commands)
- [Claude Code customization guide](https://alexop.dev/posts/claude-code-customization-guide-claudemd-skills-subagents/)
  `.trim()
}
