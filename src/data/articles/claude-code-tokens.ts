import type { Article } from './index'

export const claudeCodeTokens: Article = {
  slug: 'claude-code-gestion-tokens',
  title: "Optimiser sa consommation de tokens dans Claude Code",
  description: "Le contexte de 200K tokens se remplit vite. Voici comment économiser jusqu'à 60% avec /clear, /compact, et quelques bonnes pratiques.",
  date: '2026-01-22',
  tags: ['IA', 'Claude Code', 'Tokens', 'Optimisation'],
  content: `
## Le contexte : 200K tokens max

Claude Code a une fenêtre de contexte de **200 000 tokens**. Ça semble énorme, mais ça se remplit vite :

| Composant | Tokens | % |
|-----------|--------|---|
| Base (system prompt, tools) | ~15k | 7.5% |
| MCP servers | ~47k | 23.5% |
| Historique session | ~83k | 41.5% |
| **Reste pour travailler** | ~55k | 27.5% |

Une session fraîche dans un monorepo coûte déjà **~20k tokens** (10%) avant même de commencer.

## Pourquoi c'est un problème

1. **Performance dégradée** : La qualité des réponses baisse quand le contexte est plein
2. **Coût** : Chaque requête envoie tout le contexte → on paie pour du vieux
3. **Auto-compact imprévisible** : À 75% de capacité, Claude compresse automatiquement — souvent au mauvais moment

## Les commandes essentielles

### \`/clear\` — Reset complet

\`\`\`
/clear
\`\`\`

Efface tout l'historique. À utiliser **entre des tâches non liées**.

**Tip** : Faire \`/rename\` avant pour retrouver la session, puis \`/resume\` pour y revenir si besoin.

### \`/compact\` — Compression contrôlée

\`\`\`
/compact
\`\`\`

Résume l'historique. Mieux que l'auto-compact car **tu contrôles le timing**.

**Avec instructions** (le vrai power move) :

\`\`\`
/compact Focus on code samples and API usage

/compact only keep the names of the files we modified

/compact preserve the coding patterns we established
\`\`\`

Tu dis à Claude **quoi garder** dans le résumé.

### \`/context\` — Diagnostic

\`\`\`
/context
\`\`\`

Affiche la répartition des tokens et suggère des optimisations. Permet d'identifier quel MCP server bouffe le plus.

### \`/cost\` — Suivi des dépenses

\`\`\`
/cost
\`\`\`

Affiche le coût API de la session en cours.

## Optimisations avancées

### 1. Désactiver les MCP servers inutilisés

Chaque MCP server charge ses définitions d'outils dans le contexte. Si tu as 5 MCPs mais que tu n'en utilises qu'un :

\`\`\`
/mcp
# ou
@server-name disable
\`\`\`

**Impact** : La mise à jour Tool Search de janvier 2026 a réduit les tokens MCP de **46.9%** (51k → 8.5k) en chargeant les outils à la demande.

### 2. Garder CLAUDE.md sous 500 lignes

Le fichier CLAUDE.md est chargé **à chaque session**. Si tu y mets des instructions détaillées pour des workflows spécifiques (PR reviews, migrations DB...), ces tokens sont présents même quand tu fais autre chose.

**Solution** : Déplacer les instructions spécialisées dans des **Skills** qui se chargent uniquement à l'invocation.

### 3. Utiliser des sub-agents pour les tâches verbeuses

Les tests, logs, et gros outputs peuvent exploser le contexte. En les déléguant à un sub-agent :

- L'output reste dans le contexte du sub-agent
- Seul le résumé remonte dans ta conversation principale

### 4. Réduire le budget de thinking

Extended thinking est activé par défaut avec 31,999 tokens. Pour des tâches simples :

\`\`\`
# Dans /config ou variable d'env
MAX_THINKING_TOKENS=8000
\`\`\`

Les tokens de thinking sont facturés comme des tokens de sortie — donc chers.

### 5. Choisir le bon modèle

| Tâche | Modèle recommandé |
|-------|-------------------|
| Architecture, planning complexe | Opus |
| Implémentation courante | Sonnet |
| Validation syntaxe, parsing | Haiku |

\`\`\`
/model sonnet
\`\`\`

## Mon nouveau workflow

1. **Début de tâche** : \`/clear\` si nouvelle tâche, \`/context\` pour vérifier l'état
2. **Pendant le travail** : \`/compact\` avec instructions aux points naturels (feature terminée, pause)
3. **Tâches verbeuses** : Déléguer aux sub-agents
4. **Fin de session** : \`/rename\` pour archiver proprement

## Les chiffres

| Métrique | Valeur |
|----------|--------|
| Coût moyen par dev | ~$6/jour |
| 90% des devs sous | ~$12/jour |
| Coût mensuel estimé | $100-200/dev |
| Réduction avec context editing | **84%** |
| Réduction avec Tool Search | **46.9%** |

## Ce qui ne marche pas

- **Laisser l'auto-compact décider** : Il se déclenche à 75%, souvent en plein milieu d'une tâche
- **CLAUDE.md de 2000 lignes** : Chargé à chaque session, même pour un "hello world"
- **Tous les MCPs activés** : Slack + BigQuery + Sentry + Linear = contexte explosé avant de commencer

## Conclusion

Le contexte illimité est une illusion. À 75%, Claude commence à compresser automatiquement et la qualité baisse.

**La règle** : Traiter le contexte comme de la RAM. \`/compact\` régulièrement, \`/clear\` entre les tâches.

Avec ces pratiques, tu peux réduire ta consommation de **60%** tout en gardant des réponses de qualité.

---

Sources :
- [Manage costs effectively - Claude Code Docs](https://code.claude.com/docs/en/costs)
- [Context windows - Claude Docs](https://docs.claude.com/en/docs/build-with-claude/context-windows)
- [Claude Code Just Cut MCP Context Bloat by 46.9%](https://medium.com/@joe.njenga/claude-code-just-cut-mcp-context-bloat-by-46-9-51k-tokens-down-to-8-5k-with-new-tool-search-ddf9e905f734)
- [How to Optimize Claude Code Token Usage](https://claudelog.com/faqs/how-to-optimize-claude-code-token-usage/)
  `.trim()
}
