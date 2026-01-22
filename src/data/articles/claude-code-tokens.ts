import type { Article } from './index'

export const claudeCodeTokens: Article = {
  slug: 'claude-code-gestion-tokens',
  title: "TIL : Claude Code consomme énormément de tokens si on ne clear pas",
  description: "Le contexte de Claude Code s'accumule. Sans /clear, /compress ou /plan, on peut exploser sa facture tokens.",
  date: '2026-01-22',
  tags: ['IA', 'Claude Code', 'Tokens', 'TIL'],
  content: `
## Le problème

Claude Code garde tout en mémoire : chaque fichier lu, chaque commande exécutée, chaque échange. Le contexte grossit à chaque interaction.

Sur une longue session de travail, ça peut représenter **des dizaines de milliers de tokens** envoyés à chaque nouveau message.

Et on paie à chaque requête pour tout ce contexte accumulé.

## Les symptômes

- Les réponses deviennent plus lentes
- La facture API explose
- Claude commence à "oublier" des choses (le contexte est tronqué)

## Les solutions

### 1. \`/clear\` — Reset complet

\`\`\`
/clear
\`\`\`

Efface tout le contexte. Claude repart de zéro. À utiliser quand on change complètement de sujet ou qu'on a terminé une tâche.

**Inconvénient** : On perd tout, y compris ce qui pourrait être utile.

### 2. \`/compact\` — Compression intelligente

\`\`\`
/compact
\`\`\`

Claude résume la conversation et garde uniquement l'essentiel. Le contexte est réduit mais les informations importantes sont préservées.

**Meilleur compromis** : On garde le fil sans traîner tout l'historique.

### 3. Plan mode — Contexte limité par design

Quand on travaille en plan mode (\`Shift+Tab\` x2), Claude se concentre sur la planification. Le contexte reste plus léger car on n'exécute pas de code.

Une fois le plan validé, on peut \`/clear\` et exécuter avec un contexte frais.

## Mon nouveau workflow

1. **Début de session** : Je vérifie que le contexte est propre
2. **Après une grosse tâche** : \`/compact\` pour garder l'essentiel
3. **Changement de sujet** : \`/clear\` et on repart
4. **Tâches complexes** : Plan mode d'abord, exécution ensuite

## Le coût caché

Imaginons une session de 2h sans clear :

- 50 échanges
- Contexte moyen de 20k tokens par requête
- = 1M tokens consommés

Avec des \`/compact\` réguliers :

- Même 50 échanges
- Contexte moyen de 5k tokens
- = 250k tokens

**4x moins cher** pour le même travail.

## Conclusion

Claude Code est puissant, mais le contexte illimité est un piège.

Habitude à prendre : \`/compact\` après chaque milestone, \`/clear\` entre les tâches distinctes.

C'est comme vider sa RAM — ça fait du bien.
  `.trim()
}
