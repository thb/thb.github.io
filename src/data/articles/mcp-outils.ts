import type { Article } from './index'

export const mcpOutils: Article = {
  slug: 'mcp-model-context-protocol',
  title: "Les MCP (Model Context Protocol) : connecter Claude à vos outils",
  description: "Comment Claude interagit directement avec Trello, Google Sheets, Linear et Playwright pour automatiser votre workflow.",
  date: '2026-01-19',
  tags: ['IA', 'MCP', 'Automatisation', 'Productivité'],
  content: `
## Qu'est-ce qu'un MCP ?

Le Model Context Protocol est un standard ouvert permettant aux LLM d'interagir avec des services externes. Au lieu de copier-coller des données entre Claude et vos outils, Claude lit et écrit directement dedans.

C'est la différence entre "copie ce tableau dans mon spreadsheet" et "mets à jour la ligne 15 du backlog avec le statut Terminé".

## Cas d'usage concrets

### 1. Google Sheets — Gestion de backlog macro

\`\`\`
"Lis le backlog Fabrix, onglet BACKLOG, et liste-moi les items priorité haute"

"Ajoute une ligne 'Refonte notifications' avec statut 'À planifier'"

"Mets à jour le statut de la ligne 'Auth JWT' à 'En cours'"
\`\`\`

**Mon usage** : Je gère mes backlogs clients dans Google Sheets (niveau macro). Claude peut lire les besoins, mettre à jour les statuts, et faire le lien avec les tickets techniques.

### 2. Linear — Gestion technique micro

\`\`\`
"Crée une issue 'Implémenter endpoint /users/me' dans l'équipe Zenflow"

"Liste mes issues en cours et ajoute un commentaire sur celle de l'auth"

"Ferme l'issue ZEN-142 avec le commentaire 'Mergé dans main'"
\`\`\`

**Mon usage** : Linear contient le découpage technique réel. Chaque issue Google Sheets macro peut correspondre à 5-6 issues Linear micro.

### 3. Trello — Kanban visuel

\`\`\`
"Déplace la carte 'Landing page' de 'En cours' vers 'Review'"

"Ajoute un commentaire sur la carte avec le lien du PR"

"Crée une checklist 'Critères d'acceptation' sur la carte"
\`\`\`

**Mon usage** : Certains clients préfèrent Trello. Le MCP permet d'interagir sans changer d'outil.

### 4. Playwright — Tests E2E

\`\`\`
"Lance les tests du fichier auth.spec.ts"

"Génère un test E2E pour le parcours d'inscription complet"

"Vérifie que la page /dashboard charge en moins de 2 secondes"
\`\`\`

**Mon usage** : L'agent écrit le code ET vérifie qu'il fonctionne. La boucle feedback est immédiate.

## Architecture recommandée

\`\`\`
Claude Code
    ├── MCP Sheets → Backlog macro (besoins clients)
    ├── MCP Linear → Issues techniques (découpage réel)
    ├── MCP Trello → Kanban client (visibilité)
    └── MCP Playwright → Validation automatique
\`\`\`

## Workflow intégré type

1. **Lecture du besoin** dans Google Sheets ("Notifications temps réel")
2. **Création des issues** Linear (WebSocket, UI notifications, API push)
3. **Développement** du code par l'agent
4. **Tests automatiques** via Playwright
5. **Mise à jour du statut** dans Sheets une fois validé
6. **Déplacement de la carte** Trello vers "Done"

Le tout sans quitter le terminal.

## Configuration

Les MCP se configurent dans le fichier de config Claude Code :

\`\`\`json
{
  "mcpServers": {
    "google-sheets": {
      "command": "npx",
      "args": ["@anthropic/mcp-google-sheets"]
    },
    "linear": {
      "command": "npx",
      "args": ["@anthropic/mcp-linear"]
    }
  }
}
\`\`\`

## Sécurité

- Les tokens d'accès sont stockés localement
- Chaque MCP a des scopes limités (lecture seule possible)
- L'agent demande confirmation pour les actions destructives

## Conclusion

Les MCP transforment Claude d'un assistant conversationnel en un véritable orchestrateur de workflow.

Plus besoin de faire l'interface entre vos outils — Claude le fait pour vous.
  `.trim()
}
