import type { Article } from './index'

export const testsE2EAgentsIA: Article = {
  slug: 'tests-e2e-agents-ia-comparatif',
  title: "Tests E2E avec agents IA : agent-browser, Playwright MCP, et la génération de tests",
  description: "Comparatif des solutions pour automatiser les tests E2E avec l'IA. Agent-browser consomme 5.7x moins de tokens que Playwright MCP.",
  date: '2026-01-23',
  tags: ['IA', 'Tests', 'E2E', 'Playwright', 'Automatisation'],
  content: `
## Deux usages distincts

Quand on parle de tests E2E avec des agents IA, il y a deux besoins différents :

1. **L'agent qui navigue** : Claude contrôle un navigateur pour tester, valider, explorer
2. **L'agent qui génère des tests** : Claude écrit des scénarios Playwright/Cypress pour le CI/CD

Les outils ne sont pas les mêmes.

## Les options pour la navigation agent

### 1. agent-browser (Vercel)

CLI optimisé pour les agents IA. Pas un MCP, juste des commandes bash.

\`\`\`bash
agent-browser open "https://monapp.com"
agent-browser snapshot    # Renvoie les éléments interactifs avec refs
agent-browser click @e1   # Clique sur l'élément ref=e1
agent-browser fill @e2 "hello"
agent-browser screenshot
\`\`\`

**Le système Snapshot + Refs** : Au lieu de renvoyer tout le DOM ou une image, agent-browser renvoie une liste condensée d'éléments interactifs avec des IDs courts (@e1, @e2...).

C'est comme donner à l'agent un plan de métro au lieu d'une photo satellite.

### 2. Playwright MCP

Le MCP officiel de Microsoft. Plus puissant, mais plus gourmand.

\`\`\`
"Use playwright mcp to open a browser to example.com"
\`\`\`

Expose 26+ outils : navigation, clics, remplissage, screenshots, interception réseau, multi-onglets, génération PDF...

### 3. Autres MCPs

- **mcp-playwright** (executeautomation) : Alternative community
- **Puppeteer MCP** : Pour ceux qui préfèrent Puppeteer
- **Cypress MCP** : Existe aussi

## Le problème : les tokens

C'est là que ça devient intéressant.

### Playwright MCP est gourmand

| Métrique | Playwright MCP | agent-browser |
|----------|----------------|---------------|
| Tokens pour 6 tests | ~7,800 | ~1,400 |
| Caractères | ~31K | ~5.5K |
| Définitions d'outils | 26+ outils | CLI simple |

**Playwright MCP consomme 5.7x plus de tokens** pour les mêmes actions.

Pourquoi ? Parce qu'il :
- Charge 26+ définitions d'outils dans le contexte
- Renvoie des arbres d'accessibilité complets (milliers de nœuds)
- Chaque screenshot = 15,000+ tokens

Des utilisateurs rapportent avoir épuisé leur allocation de 5 heures en quelques étapes d'automatisation.

### agent-browser est optimisé

Vercel a conçu agent-browser spécifiquement pour les agents :

- **Pas de MCP** = pas de définitions d'outils qui mangent le contexte
- **Snapshot + Refs** = représentation compacte du DOM
- **Architecture Rust + Node.js** = performance

Résultat : **réduction du contexte jusqu'à 93%**.

## Quand utiliser quoi

| Besoin | Outil recommandé |
|--------|------------------|
| Navigation simple, validation | agent-browser |
| Sessions longues, budget tokens | agent-browser |
| Interception réseau, multi-onglets | Playwright MCP |
| Génération PDF, fonctions avancées | Playwright MCP |
| Intégration Claude Code existante | Playwright MCP |

**Ma recommandation** : agent-browser pour l'exploration et la validation quotidienne. Playwright MCP quand tu as besoin de ses fonctionnalités avancées.

## L'autre besoin : générer des vrais tests E2E

Faire naviguer l'agent, c'est bien pour valider. Mais ce qu'on veut à terme, c'est **générer des scénarios de tests** qui tournent en CI/CD sans l'agent.

### Le workflow idéal

1. L'agent explore l'app avec agent-browser
2. Il identifie les parcours critiques
3. Il **génère du code Playwright/Cypress** correspondant
4. Ces tests tournent en CI sans agent, sans tokens

### Les outils qui font ça

**Playwright codegen** (natif) :

\`\`\`bash
npx playwright codegen https://monapp.com
\`\`\`

Enregistre tes actions et génère le code. Pas parfait, mais bon pour prototyper.

**Checksum.ai** :
- Génère des tests Playwright ou Cypress automatiquement
- Self-healing : quand un test casse, l'IA le répare
- Quand tu ajoutes une feature, l'agent ajuste les tests

**Applitools Autonomous** :
- Génère des tests E2E visuels et fonctionnels depuis une URL
- Pas de code à écrire

**Skill Playwright pour Claude Code** :

Il existe un skill Claude Code qui fait exactement ça :

\`\`\`yaml
---
name: generate-e2e-test
description: Génère un test Playwright à partir d'un parcours utilisateur
---

1. Utilise agent-browser pour naviguer le parcours
2. Note chaque action et assertion
3. Génère le code Playwright correspondant
4. Écris le fichier dans tests/e2e/
\`\`\`

L'agent navigue, observe, et produit du code testable.

## Exemple concret : générer un test de login

**Étape 1** : Navigation avec agent-browser

\`\`\`
agent-browser open "https://app.example.com/login"
agent-browser snapshot
# → @e1: input[name=email], @e2: input[name=password], @e3: button[submit]

agent-browser fill @e1 "test@example.com"
agent-browser fill @e2 "password123"
agent-browser click @e3
agent-browser wait 2000
agent-browser snapshot
# → Page dashboard, @e4: text "Welcome back"
\`\`\`

**Étape 2** : Génération du test Playwright

\`\`\`typescript
// tests/e2e/login.spec.ts
import { test, expect } from '@playwright/test';

test('user can login successfully', async ({ page }) => {
  await page.goto('https://app.example.com/login');

  await page.getByRole('textbox', { name: 'email' }).fill('test@example.com');
  await page.getByRole('textbox', { name: 'password' }).fill('password123');
  await page.getByRole('button', { name: 'Submit' }).click();

  await expect(page.getByText('Welcome back')).toBeVisible();
});
\`\`\`

L'agent a navigué une fois, le test tourne en CI indéfiniment.

## Les bonnes pratiques

### Pour la navigation agent

- Utilise agent-browser pour les sessions longues
- Réserve Playwright MCP pour les besoins avancés
- Fais \`/compact\` régulièrement si tu utilises Playwright MCP

### Pour la génération de tests

- Préfère les locators accessibles (\`getByRole\`, \`getByTestId\`)
- Évite les sélecteurs CSS/XPath fragiles
- Génère des tests atomiques (un parcours = un test)
- Ajoute des assertions explicites

### Pour le CI/CD

- Les tests générés doivent tourner **sans agent**
- Pas de dépendance aux tokens ou à l'IA
- Self-healing optionnel via Checksum ou autre

## Conclusion

L'écosystème des tests E2E avec agents IA est encore jeune, mais les options sont déjà nombreuses.

**Pour naviguer** : agent-browser gagne sur les tokens, Playwright MCP gagne sur les fonctionnalités.

**Pour générer des tests** : le workflow idéal combine navigation agent + génération de code Playwright. L'agent explore une fois, les tests tournent pour toujours.

Le futur : des agents qui maintiennent automatiquement les suites de tests. Quand l'UI change, l'agent détecte, navigue, et met à jour les tests. On n'en est pas loin.

---

Sources :
- [agent-browser - Vercel Labs](https://github.com/vercel-labs/agent-browser)
- [Playwright MCP - Microsoft](https://github.com/microsoft/playwright-mcp)
- [The Context Wars: Why Your Browser Tools Are Bleeding Tokens](https://paddo.dev/blog/agent-browser-context-efficiency/)
- [Playwright MCP Explained: AI-Powered Test Automation 2026](https://www.testleaf.com/blog/playwright-mcp-ai-test-automation-2026/)
- [Checksum - E2E AI Playwright Tests](https://checksum.ai/)
  `.trim()
}
