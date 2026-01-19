import type { Article } from './index'

export const specificationsIA: Article = {
  slug: 'specifications-ecrites-par-ia',
  title: "Faire écrire des spécifications par les agents IA",
  description: "Inverser le flux : l'agent pose les bonnes questions, structure les besoins, et produit des specs qu'il suivra mieux.",
  date: '2026-01-19',
  tags: ['IA', 'Spécifications', 'Product', 'Documentation'],
  content: `
## Pourquoi inverser le flux ?

**Traditionnellement** : Specs écrites par humain → Code généré par IA

**Nouvelle approche** : Brief humain → Questions de l'IA → Specs générées → Code

L'avantage ? Quand l'agent a écrit la spec, il la comprend mieux et produit un code plus cohérent.

## Le processus

### Étape 1 : Brief minimal

Tu décris le besoin en 2-3 phrases :

\`\`\`
"J'ai besoin d'un système de notifications pour mon app.
Les utilisateurs doivent être informés des actions importantes."
\`\`\`

### Étape 2 : Questions structurantes de l'agent

L'agent identifie les zones grises et pose des questions :

\`\`\`
Questions sur les notifications :

1. **Canaux** : Push mobile, email, in-app, ou combinaison ?
2. **Temps réel** : Notifications instantanées ou batch quotidien ?
3. **Préférences** : L'utilisateur peut-il choisir ses notifications ?
4. **Historique** : Doit-on garder un historique consultable ?
5. **Actions** : Peut-on agir depuis la notification (marquer comme lu, archiver) ?
6. **Groupement** : Grouper les notifications similaires ?
\`\`\`

Tu réponds, et l'agent affine.

### Étape 3 : Spec générée

L'agent produit un document structuré :

\`\`\`markdown
## Feature : Système de notifications

### User Stories
- En tant qu'utilisateur, je veux recevoir une notification quand
  quelqu'un commente mon projet
- En tant qu'utilisateur, je veux pouvoir désactiver certains
  types de notifications
- En tant qu'utilisateur, je veux voir l'historique de mes
  notifications des 30 derniers jours

### Acceptance Criteria
- [ ] Les notifications apparaissent en temps réel (WebSocket)
- [ ] L'utilisateur peut marquer une notification comme lue
- [ ] L'utilisateur peut marquer toutes les notifications comme lues
- [ ] Un badge indique le nombre de notifications non lues
- [ ] Les préférences sont modifiables dans /settings/notifications

### Technical Notes
- WebSocket via ActionCable (Rails) ou Socket.io (Node)
- Table \`notifications\` avec \`notifiable_type\` polymorphique
- Index sur \`(user_id, read_at)\` pour les requêtes fréquentes
- Cache Redis pour le compteur de non-lues

### Out of Scope (v2)
- Notifications SMS
- Digest email hebdomadaire
- Notifications push mobile
\`\`\`

### Étape 4 : Review humain

Tu valides ou amends. "Ajoute le groupement par jour" → l'agent met à jour la spec.

### Étape 5 : Implémentation

L'agent code en suivant SA propre spec. Il a le contexte complet.

## Bénéfices

### 1. Clarification forcée

L'agent pose des questions que tu aurais oubliées. Il pense aux edge cases :

- Que se passe-t-il si l'utilisateur est déconnecté pendant 1 semaine ?
- Limite de notifications stockées ?
- Comportement sur actions groupées (bulk) ?

### 2. Format cohérent

Chaque spec suit le même template. Facilite la review et la maintenance.

### 3. Traçabilité

La spec devient la documentation. Tu sais exactement ce qui a été demandé et implémenté.

### 4. Meilleure implémentation

L'agent qui a écrit la spec la suit mieux qu'une spec externe qu'il doit interpréter.

## Template de spec recommandé

\`\`\`markdown
## Feature : [Nom]

### Contexte
[Pourquoi cette feature existe]

### User Stories
[Liste des stories au format "En tant que... je veux... afin de..."]

### Acceptance Criteria
[Checklist des critères de validation]

### Technical Notes
[Choix techniques, modèles de données, dépendances]

### UI/UX Notes
[Maquettes, comportements attendus, états]

### Out of Scope
[Ce qui n'est PAS inclus dans cette version]

### Open Questions
[Points à clarifier avant implémentation]
\`\`\`

## Workflow intégré

1. **Brief oral/écrit** : Tu décris le besoin
2. **Questions** : L'agent clarifie les zones grises
3. **Spec draft** : L'agent génère le document
4. **Review** : Tu valides/corriges
5. **Ticket** : La spec devient l'issue Linear/GitHub
6. **Code** : L'agent implémente en référençant la spec
7. **Validation** : Tu vérifies contre les acceptance criteria

## Conclusion

Faire écrire les specs par l'agent, c'est :
- Gagner du temps sur la rédaction
- Forcer la clarification des besoins
- Améliorer la qualité de l'implémentation

L'agent devient ton Business Analyst avant d'être ton développeur.
  `.trim()
}
