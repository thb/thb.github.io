import type { Article } from './index'

export const promptsMagiques: Article = {
  slug: 'prompts-magiques-agents-ia',
  title: "Les prompts magiques : ce qui marche vraiment avec les agents IA",
  description: "J'étais sceptique sur le prompt engineering. Mais certains prompts simples changent vraiment la donne.",
  date: '2026-01-19',
  tags: ['IA', 'Prompts', 'Productivité', 'Code Review'],
  content: `
## Mon scepticisme initial

Les cheatsheets de "prompt engineering" avec leurs formules magiques ("Act as a senior developer...", "Think step by step...") m'ont toujours laissé dubitatif.

Mais après des mois d'utilisation quotidienne des agents IA, j'ai identifié quelques prompts qui changent vraiment la qualité des résultats.

Ce ne sont pas des formules magiques. Ce sont des **questions qu'un bon développeur poserait** — sauf que l'IA ne les pose pas spontanément.

## Le diagnostic complet

### Code smells et qualité

\`\`\`
"Analyse le code actuel et cherche :
- Les code smells (fonctions trop longues, classes god object, etc.)
- La duplication de code
- Les mauvais nommages (variables, fonctions, classes)
- Le non-respect des couches logicielles (logique métier dans les controllers, etc.)"
\`\`\`

**Ce que ça fait** : L'agent parcourt le code et produit un diagnostic structuré. Il trouve des choses que tu ne vois plus à force de travailler dans le code.

**Variantes utiles** :
- "Cherche les incohérences de nommage entre les fichiers"
- "Liste les fonctions de plus de 50 lignes"
- "Trouve les TODO et FIXME oubliés"

### Audit sécurité

\`\`\`
"Fais un audit sécurité du code :
- Injections SQL potentielles
- XSS possibles
- Mass assignment non protégés
- Endpoints sans authentification
- Secrets hardcodés
- Dépendances avec CVE connues"
\`\`\`

L'agent ne remplace pas un pentest, mais il attrape les erreurs évidentes que tu aurais pu manquer.

### Cohérence design system

\`\`\`
"Vérifie la cohérence avec le design system :
- Composants qui n'utilisent pas les tokens définis
- Couleurs hardcodées au lieu des variables
- Spacing incohérents
- Typographie qui dévie du système"
\`\`\`

### Qualité UX

\`\`\`
"Analyse l'UX de ce parcours utilisateur :
- États de chargement manquants
- Messages d'erreur peu clairs
- Actions sans feedback
- Formulaires sans validation côté client
- Accessibilité (labels, focus states, contraste)"
\`\`\`

## Le prompt de clarification

C'est peut-être le plus puissant. Avant de coder une feature non triviale :

\`\`\`
"Avant de coder, pose-moi des questions sur :
- Les points qui ne sont pas clairs dans ma demande
- Les edge cases que je n'ai pas mentionnés
- Les choix techniques que tu dois faire
- Les dépendances avec le code existant"
\`\`\`

**Pourquoi ça marche** : L'agent identifie les zones d'ombre de ta spec. Tu clarifies AVANT qu'il code, pas après 3 itérations de corrections.

**Exemple concret** :

\`\`\`
Moi : "Ajoute un système de notifications"

Agent : "Avant de coder, j'ai quelques questions :

1. **Canaux** : In-app uniquement, ou aussi email/push ?
2. **Temps réel** : WebSocket ou polling ?
3. **Persistance** : Combien de temps garder l'historique ?
4. **Préférences** : L'utilisateur peut désactiver certains types ?
5. **Actions groupées** : Si 10 commentaires arrivent, 10 notifs ou 1 groupée ?
6. **Existant** : J'ai vu un modèle Notification, je l'utilise ou je repars de zéro ?"
\`\`\`

6 questions qui auraient généré 6 allers-retours si l'agent avait codé directement.

## Le prompt de spécification

Une fois les questions clarifiées :

\`\`\`
"Écris une spécification complète avant de coder :
- User stories
- Critères d'acceptation
- Choix techniques avec justification
- Modèle de données
- Points d'attention"
\`\`\`

Tu obtiens un document que tu peux relire et valider. L'agent code ensuite en suivant SA spec — il la comprend mieux qu'une spec externe.

## Le prompt de review

Après avoir codé :

\`\`\`
"Review ton propre code comme si tu étais un reviewer externe :
- Bugs potentiels
- Cas non gérés
- Performance
- Lisibilité
- Tests manquants"
\`\`\`

L'agent prend du recul sur son propre travail et trouve souvent des améliorations.

## Le prompt d'exploration

Quand tu arrives sur un nouveau codebase :

\`\`\`
"Explore ce projet et explique-moi :
- L'architecture globale
- Les patterns utilisés
- Les conventions de nommage
- Les points d'entrée principaux
- Les zones de complexité"
\`\`\`

En 2 minutes, tu as une carte mentale du projet.

## Le prompt de refactoring ciblé

\`\`\`
"Propose un refactoring pour [cette partie du code] :
- Garde le comportement identique
- Améliore la lisibilité
- Respecte les patterns du projet
- Explique chaque changement"
\`\`\`

Le "explique chaque changement" est clé : tu comprends le raisonnement et tu peux challenger.

## Ce qui ne marche pas

### Les formules creuses

- "Act as a 10x developer" → Ne change rien
- "Think step by step" → Utile parfois, souvent superflu
- "You are an expert in..." → L'agent sait déjà ce qu'il sait

### Les prompts trop longs

Un prompt de 500 mots dilue l'intention. Les meilleurs prompts sont **courts et précis**.

### Les prompts sans contexte

"Améliore ce code" sans dire CE QUI doit être amélioré donne des résultats génériques.

## La règle d'or

**Pose les questions qu'un bon collègue poserait avant de commencer.**

L'agent IA est compétent mais pas devin. Il ne sait pas :
- Ce que tu considères comme important
- Les contraintes non écrites du projet
- Tes préférences personnelles
- Le contexte business

Ces prompts "magiques" sont juste une façon de **forcer la communication** avant l'action.

## Mon workflow actuel

1. **Brief** : Je décris ce que je veux en 2-3 phrases
2. **Clarification** : "Pose-moi des questions"
3. **Spec** : "Écris la spec avant de coder"
4. **Validation** : Je relis et j'ajuste
5. **Code** : L'agent implémente
6. **Review** : "Review ton code"
7. **Diagnostic** : "Cherche les code smells"

Ça semble long, mais c'est plus rapide que 5 itérations de code → feedback → correction.
  `.trim()
}
