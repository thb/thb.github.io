import type { Article } from './index'

export const modelisationIA: Article = {
  slug: 'ia-modelisation-donnees',
  title: "L'IA code vite, mais modélise mal",
  description: "L'IA veut foncer. Il faut la freiner 2 minutes pour réfléchir à la modélisation. Sinon, bonjour la dette technique.",
  date: '2026-02-04',
  tags: ['IA', 'Architecture', 'Rails', 'Modélisation'],
  content: `
## Le réflexe bourrin

L'IA est bonne pour choisir les mots. Noms de variables, noms de méthodes, elle fait ça bien. Mais quand il s'agit de **modélisation des données**, elle a souvent le réflexe du dev pressé : créer un nouveau modèle.

"On attaque les migrations ? Je peux commencer par Product et Transport dans le worktree dispatch-back."

Ça, c'est Claude qui veut foncer. Efficace. Rapide. **Problématique.**

## L'exemple criant

Contexte : Je bosse sur une app de planning de ressources (Zenflow). On a un modèle \`Phase\` qui gère des périodes avec des users et des machines. On doit ajouter un système de "dispatch" quotidien avec plus de types de ressources.

L'IA propose :

\`\`\`
Option A : Créer DispatchAssignment (nouveau modèle)

DispatchAssignment
├── date
├── project_id
├── resource_type (User/Machine/Product/Transport...)
├── resource_id
├── quantity
\`\`\`

Ça paraît clean. Séparation des concerns. Un modèle pour le planning long terme (Phase), un pour l'allocation quotidienne (DispatchAssignment).

**Sauf que non.**

## La question qui change tout

"Est-ce que DispatchAssignment doit exister, ou on peut utiliser notre modèle Phase existant ?"

Cette question, l'IA ne se la pose pas spontanément. Elle voit un nouveau besoin, elle crée un nouveau modèle.

Quand je la pousse à comparer :

| Aspect | Phase | Dispatch |
|--------|-------|----------|
| Granularité | Multi-jours | Journée |
| Ressources | Users + Machines | Users + Machines + Products + Transports... |
| Usage | "Planning projet" | "Allocation quotidienne" |

Elle conclut : "Deux concepts différents, je garderais DispatchAssignment séparé."

**Faux.**

## La vraie analyse

La seule différence réelle : le nombre de types de ressources. Et ce n'est même pas vrai que Phase est "multi-jours" et Dispatch est "quotidien" — les deux peuvent être sur plusieurs jours.

Ce que l'IA n'a pas vu :

1. **La duplication est un code smell énorme** en Model Driven Design
2. Les deux modèles font la même chose : associer des ressources à une période
3. Demain, on voudra ajouter des Products aux phases "classiques" — et on aura deux endroits à modifier

## La bonne solution

\`\`\`ruby
Phase
├── start_at, end_at
├── project_id
├── has_many :phase_resources  # polymorphique

PhaseResource
├── phase_id
├── resource_type  # User, Machine, Product, Transport, Rental, Transfer
├── resource_id
├── quantity
\`\`\`

Un seul modèle d'allocation. Une seule source de vérité. Le dispatch quotidien, c'est juste une Phase avec start_at = end_at.

## Pourquoi l'IA se trompe

L'IA est entraînée sur des millions de codebases. Elle a vu beaucoup de patterns. Quand elle voit un nouveau besoin, elle applique un pattern qu'elle connaît : "nouveau besoin = nouveau modèle".

C'est le réflexe du développeur junior. Ça marche. C'est rapide. **C'est de la dette technique.**

L'IA ne voit pas :
- L'évolution future du produit
- Les coûts de maintenance de la duplication
- La cohérence globale du domaine métier

## Comment guider l'IA

### 1. L'arrêter avant les migrations

Quand elle dit "On attaque les migrations ?", répondre : "Attends. Parlons modélisation."

### 2. Poser la question de l'existant

"Est-ce qu'un modèle existant peut faire le job ?"

### 3. Challenger la duplication

"Ces deux modèles font quoi de différent ?" Si la réponse c'est juste "le contexte d'usage", c'est probablement le même modèle.

### 4. Penser évolution

"Dans 6 mois, si on veut ajouter X, combien d'endroits faudra-t-il modifier ?"

## Le pattern récurrent

J'ai remarqué ce problème sur plusieurs projets :

- **Auth** : L'IA veut créer un modèle Session alors qu'un token JWT suffit
- **Notifications** : L'IA veut créer EmailNotification et PushNotification au lieu d'un Notification polymorphique
- **Documents** : L'IA veut Invoice et Quote séparés au lieu d'un Document avec type

À chaque fois, le réflexe "nouveau besoin = nouveau modèle" au lieu de "est-ce que ça enrichit un concept existant ?"

## Le bon équilibre

Je ne dis pas que l'IA a toujours tort. Parfois, créer un nouveau modèle est la bonne solution. Le problème, c'est qu'elle ne **pose pas la question**.

Mon workflow maintenant :

1. **Specs fonctionnelles** avec l'IA (elle est bonne pour ça)
2. **Pause modélisation** : je challenge les modèles proposés
3. **Migrations** seulement après validation de la structure

## Conclusion

L'IA est un excellent exécutant. Elle code vite, elle code bien. Mais elle ne réfléchit pas assez à la structure.

La modélisation, c'est le travail du développeur senior. C'est là qu'on passe de "ça marche" à "c'est maintenable".

Quand l'IA veut foncer sur les migrations, freine-la 2 minutes. Ces 2 minutes de réflexion peuvent économiser des jours de refactoring.

**"Option B mon capitaine !"** — Moi, après avoir challengé l'IA.
  `.trim()
}
