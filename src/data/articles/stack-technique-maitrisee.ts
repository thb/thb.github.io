import type { Article } from './index'

export const stackTechniqueMaitrisee: Article = {
  slug: 'stack-technique-maitrisee-agents-ia',
  title: "Pourquoi une stack technique maîtrisée est essentielle pour travailler avec les agents IA de code",
  description: "Les agents IA génèrent du code plausible mais pas toujours cohérent. Une architecture rigoureuse transforme l'agent en exécutant fiable.",
  date: '2026-01-19',
  tags: ['IA', 'Architecture', 'Claude Code', 'DevOps'],
  content: `
## Le problème

Les agents IA génèrent du code plausible mais pas toujours cohérent avec ton architecture existante. Sans cadre strict, tu te retrouves avec :

- Des patterns inconsistants entre fichiers
- Des librairies alternatives importées au hasard
- Des couches de sécurité oubliées ou mal implémentées
- Du code qui "fonctionne" mais ne respecte pas tes conventions

## La solution : contraindre l'agent par l'architecture

### 1. API Contracts stricts

Formats de réponse standardisés avec une enveloppe JSON cohérente. L'agent voit le pattern existant et le reproduit :

\`\`\`ruby
# L'agent voit ce pattern et le reproduit
render json: {
  data: resource,
  meta: { timestamp: Time.current }
}, status: :ok

render json: {
  error: { code: "VALIDATION_ERROR", messages: errors }
}, status: :unprocessable_entity
\`\`\`

Les gestion d'erreurs explicite avec codes et messages typés permet à l'agent de comprendre immédiatement comment gérer les cas d'erreur.

### 2. Authentification centralisée

- Un seul point d'entrée pour l'auth (middleware/concern)
- L'agent ne peut pas "oublier" la vérification car elle est déclarative
- Politiques d'autorisation explicites (Pundit, CanCanCan en Ruby, ou des guards en TypeScript)

\`\`\`ruby
class ApplicationController < ActionController::API
  before_action :authenticate_user!

  # Toute action hérite automatiquement de l'auth
end
\`\`\`

### 3. Structure de dossiers explicite

- Services, Queries, Commands séparés → l'agent sait où mettre quoi
- Conventions de nommage documentées dans un fichier CLAUDE.md à la racine
- L'agent lit la structure existante et s'y conforme

\`\`\`
app/
├── controllers/     # Orchestration HTTP uniquement
├── services/        # Logique métier complexe
├── queries/         # Requêtes DB composées
├── commands/        # Actions avec effets de bord
└── policies/        # Autorisation
\`\`\`

## Ce qui reste humain

### Le nommage et la modélisation

L'IA propose, l'humain dispose. Les noms de domaine, les relations entre entités, les choix sémantiques restent des décisions architecturales critiques.

L'agent peut suggérer "NotificationService" mais c'est toi qui décides si c'est le bon terme métier, si ça ne crée pas de confusion avec un autre concept existant.

### L'audit de sécurité

Même avec des patterns stricts, vérifie toujours :
- Les injections SQL (paramètres non échappés)
- Les mass assignments (attributs autorisés)
- Les permissions (accès aux ressources d'autres utilisateurs)

## Ma stack actuelle

| Composant | Choix | Pourquoi |
|-----------|-------|----------|
| Backend | Rails 8 + JWT | Conventions fortes, auth déclarative |
| Frontend | React 19 + TanStack | Wrappers typés pour les requêtes |
| Validation | Zod côté client | Schémas partagés avec le backend |
| Documentation | OpenAPI auto-généré | L'agent peut lire les specs |

## Conclusion

Plus ton architecture est rigide et documentée, plus l'agent devient un exécutant fiable plutôt qu'un improvisateur dangereux.

La clé : **documenter tes conventions dans un fichier que l'agent lit au démarrage** (CLAUDE.md, .cursorrules, etc.). L'agent n'invente plus, il applique.
  `.trim()
}
