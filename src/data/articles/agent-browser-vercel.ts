import type { Article } from './index'

export const agentBrowserVercel: Article = {
  slug: 'agent-browser-vercel-tests-automatises',
  title: "agent-browser de Vercel : automatiser les tests de vos agents IA",
  description: "Un CLI qui pilote un navigateur avec des instructions en langage naturel pour valider le code généré par l'IA.",
  date: '2026-01-19',
  tags: ['IA', 'Tests', 'Automatisation', 'Vercel'],
  content: `
## Le problème

Comment tester qu'un agent IA a correctement implémenté une feature ?

Les tests unitaires vérifient le code, pas le comportement utilisateur. Tu peux avoir 100% de couverture et une UI cassée.

Et écrire des tests E2E manuellement après chaque génération de code est contre-productif.

## La solution : agent-browser

Un CLI de Vercel qui pilote un navigateur headless avec des instructions en langage naturel.

\`\`\`bash
npx agent-browser "Va sur localhost:3000, connecte-toi avec test@example.com,
crée un nouveau projet nommé 'Test Agent' et vérifie qu'il apparaît dans la liste"
\`\`\`

Le navigateur exécute les actions, et l'agent vérifie le résultat.

## Cas d'usage

### 1. Smoke tests après génération de code

\`\`\`bash
# L'agent Claude code une feature
claude "Ajoute un bouton de suppression sur les projets"

# Puis teste automatiquement
npx agent-browser "Supprime le projet 'Test' et vérifie qu'il n'apparaît plus dans la liste"
\`\`\`

L'agent a écrit le code, maintenant il vérifie que ça marche vraiment.

### 2. Tests de régression conversationnels

Plus lisibles que les sélecteurs CSS de Playwright/Cypress :

\`\`\`
"Remplis le formulaire d'inscription avec un email invalide
et vérifie que le message 'Email invalide' s'affiche"

"Clique sur 'Mot de passe oublié', entre test@example.com,
et vérifie que le message de confirmation apparaît"
\`\`\`

Un non-développeur peut lire et comprendre ces tests.

### 3. Validation de parcours complets

\`\`\`bash
npx agent-browser "
1. Crée un compte avec email random
2. Complète l'onboarding en 3 étapes
3. Crée un premier projet
4. Invite un collaborateur
5. Vérifie que le collaborateur apparaît dans l'équipe
"
\`\`\`

### 4. Capture de bugs visuels

L'agent peut décrire ce qu'il voit :

\`\`\`bash
npx agent-browser "Va sur /dashboard et décris ce que tu vois"
# Output: "Je vois un tableau avec 3 colonnes: Nom, Date, Statut.
# Il y a 5 lignes de données. Le bouton 'Créer' est en haut à droite."
\`\`\`

Utile pour débugger sans ouvrir le navigateur.

## Intégration dans le workflow

\`\`\`bash
#!/bin/bash
# Script de validation post-développement

npm run build
npm run test:unit
npm run test:e2e

# Tests conversationnels de smoke
npx agent-browser scenarios/login.txt
npx agent-browser scenarios/create-project.txt
npx agent-browser scenarios/critical-path.txt
\`\`\`

## Fichiers de scénarios

Crée des fichiers .txt réutilisables :

\`\`\`
# scenarios/login.txt
Va sur la page de connexion
Entre l'email "test@example.com" et le mot de passe "password123"
Clique sur le bouton de connexion
Vérifie que tu es redirigé vers le dashboard
Vérifie que le nom de l'utilisateur apparaît dans le header
\`\`\`

## Limites actuelles

| Limite | Contournement |
|--------|---------------|
| Moins précis que des sélecteurs CSS | Pour les cas critiques, reste sur Playwright |
| Coût API (chaque action = appel LLM) | Réserver aux smoke tests, pas aux suites complètes |
| Pas adapté pour CI à grande échelle | Utiliser en local ou sur des runs ciblés |
| Peut échouer sur des UI complexes | Simplifier l'UI ou guider avec des instructions plus précises |

## Quand l'utiliser

- **Validation rapide** après génération de code par l'IA
- **Tests exploratoires** pour découvrir des bugs
- **Documentation vivante** des parcours utilisateur
- **Démo** de fonctionnalités à des non-tech

## Quand ne pas l'utiliser

- Suites de tests en CI (trop lent, trop coûteux)
- Tests de performance (pas conçu pour ça)
- Tests de sécurité (utilise des outils dédiés)

## Conclusion

agent-browser comble le gap entre "le code compile" et "ça marche vraiment".

C'est l'équivalent de demander à un QA de tester rapidement une feature — sauf que le QA est disponible 24/7 et ne se plaint jamais.
  `.trim()
}
