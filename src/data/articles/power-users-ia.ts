import type { Article } from './index'

export const powerUsersIA: Article = {
  slug: 'power-users-ia-suivre',
  title: "Les power users IA que je suis pour progresser",
  description: "Boris Cherny, Ryan Carson, José Valim — les créateurs d'outils IA que je suis pour améliorer mon usage quotidien.",
  date: '2026-01-20',
  tags: ['IA', 'Claude Code', 'Ampcode', 'Tidewave', 'Productivité'],
  content: `
## Pourquoi suivre des power users ?

L'IA évolue tellement vite que les documentations officielles sont souvent en retard sur les usages réels. Les meilleurs tips viennent de ceux qui poussent les outils à leurs limites — et surtout de ceux qui les créent.

Voici trois personnes que je suis activement pour améliorer mon usage IA.

## Boris Cherny (@bcherny)

**Qui** : Créateur de Claude Code chez Anthropic.

**Pourquoi le suivre** : Il partage régulièrement des techniques avancées directement issues de son travail sur l'outil. Pas de la théorie — des usages concrets qu'il teste au quotidien.

### Son thread viral (52K likes, 7.5M vues)

Le 2 janvier 2026, Boris a partagé comment il utilise Claude Code. "Mon setup est étonnamment vanilla !" dit-il. Voici les points clés :

#### 1. Sessions parallèles massives

> "Je lance 5 Claude en parallèle dans mon terminal, avec des onglets numérotés 1-5. J'utilise les notifications système pour savoir quand un Claude a besoin d'input."

Et ce n'est pas tout — il lance aussi 5-10 sessions sur claude.ai/code en parallèle, avec possibilité de basculer entre local et web via \`--teleport\`.

#### 2. Opus 4.5 pour tout

> "J'utilise Opus 4.5 with thinking pour tout. C'est le meilleur modèle de codage que j'ai utilisé. Plus lent que Sonnet, mais nécessite moins de steering et maîtrise mieux les outils."

#### 3. CLAUDE.md partagé et itératif

Leur équipe maintient un seul CLAUDE.md pour tout le repo Claude Code, versionné en Git. **Toute l'équipe y contribue plusieurs fois par semaine.** À chaque fois que Claude fait une erreur, ils l'ajoutent au CLAUDE.md.

C'est de l'ingénierie de prompt incrémentale et collaborative.

#### 4. Code review avec @.claude

Pendant les reviews, Boris tag \`@.claude\` sur les PRs de ses collègues. Ils utilisent la GitHub Action Claude Code (\`/install-github-action\`) pour ça.

#### 5. Plan mode systématique

> "La plupart de mes sessions commencent en Plan mode (Shift+Tab deux fois). Je discute avec Claude jusqu'à aimer son plan, puis je passe en auto-accept."

L'idée : valider la stratégie avant l'exécution.

#### 6. Slash commands pour les inner loops

Boris utilise des slash commands pour chaque workflow répété plusieurs fois par jour. Elles vivent dans \`.claude/commands/\` et sont versionnées.

Exemple : \`/commit-push-pr\` — qu'il exécute "des dizaines de fois par jour".

#### 7. Subagents pour automatiser

Il utilise des subagents comme \`code-simplifier\` et \`verify-app\` pour standardiser les processus.

#### 8. Hook PostToolUse pour le formatage

Un hook applique automatiquement le formatage au code généré. "Claude fait 90% du boulot correctement, le hook gère les 10% restants pour éviter les erreurs de CI."

#### 9. Permissions granulaires

Plutôt que \`--dangerously-skip-permissions\`, il utilise \`/permissions\` pour pré-autoriser les commandes bash sûres. La config vit dans \`.claude/settings.json\` et est partagée.

#### 10. MCPs intégrés

Config des serveurs MCP (Slack, BigQuery, Sentry) dans \`.mcp.json\` pour que Claude accède directement à ces ressources.

#### 11. La règle d'or : vérification

> "Donner à Claude un moyen de vérifier son travail multiplie la qualité par 2-3x."

Que ce soit via une extension Chrome, des tests, ou un simulateur — la boucle de feedback change tout.

### Ce que je n'utilise pas encore

Être honnête : je suis loin d'utiliser tout ça.

**Ce que j'utilise** :
- Claude Code en terminal (1 session, pas 5)
- CLAUDE.md pour le contexte projet
- Les MCPs (Google Sheets, Linear, Trello)
- Le plan mode occasionnellement

**Ce que je veux explorer** :
- Les sessions parallèles (terminal + web)
- Les slash commands personnalisées
- La GitHub Action pour les reviews
- Les hooks PostToolUse

## Ryan Carson (@ryancarson)

**Qui** : Créateur d'Ampcode, un éditeur de code assisté par IA.

**Pourquoi le suivre** : Il explore l'intersection entre IA et développement sous un angle différent. Ampcode a sa propre approche de l'assistance au code, et suivre ses réflexions donne une perspective complémentaire à Claude Code.

### Ce que j'observe

- L'importance de l'UX dans les outils IA — comment rendre l'interaction fluide
- Les différentes approches du "AI-assisted coding" vs "AI-driven coding"
- Les retours utilisateurs qui façonnent l'évolution des produits

## José Valim (@josevalim)

**Qui** : Créateur d'Elixir et du framework Phoenix. Contributeur historique de Rails. Maintenant créateur de Tidewave.ai.

**Pourquoi le suivre** : José a un track record impressionnant de création d'outils qui changent la façon dont les développeurs travaillent. Elixir a révolutionné la programmation concurrente accessible. Que va faire Tidewave ?

### Tidewave.ai

Sa nouvelle aventure se concentre sur l'IA appliquée au développement. Venant de quelqu'un qui a créé un langage de programmation et un framework web majeurs, c'est particulièrement intéressant à suivre.

José apporte une perspective différente :
- Une compréhension profonde des langages et runtimes
- L'expérience de la création d'outils pour développeurs
- Une vision long terme (Elixir a 12 ans et continue d'évoluer)

## Comment je compte progresser

1. **Prendre un tip par semaine** et l'intégrer vraiment dans mon workflow
2. **Documenter ce qui marche** (d'où cet article et les précédents)
3. **Suivre les updates** de ces créateurs sur X
4. **Expérimenter** sur des projets perso avant les projets clients

## Les liens

- Boris Cherny : [x.com/bcherny](https://x.com/bcherny)
- Thread original : [x.com/bcherny/status/2007179832300581177](https://x.com/bcherny/status/2007179832300581177)
- Ryan Carson : [x.com/ryancarson](https://x.com/ryancarson)
- José Valim : [x.com/josevalim](https://x.com/josevalim)
- Tidewave : [tidewave.ai](https://tidewave.ai)
- Ampcode : [ampcode.com](https://ampcode.com)

## Conclusion

Les meilleurs enseignements viennent souvent de ceux qui construisent les outils.

Suivre les créateurs de Claude Code, Ampcode et Tidewave me permet de :
- Découvrir des techniques avant qu'elles soient documentées
- Comprendre la philosophie derrière les fonctionnalités
- Anticiper les évolutions à venir

L'IA pour le développement est encore jeune. Ceux qui expérimentent maintenant auront une longueur d'avance.
  `.trim()
}
