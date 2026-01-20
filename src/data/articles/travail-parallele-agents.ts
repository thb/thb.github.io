import type { Article } from './index'

export const travailParalleleAgents: Article = {
  slug: 'travail-parallele-agents-ia',
  title: "10 terminaux, 10 agents : notre nouvelle façon de travailler",
  description: "L'IA n'est pas un outil qu'on utilise. C'est un dialogue permanent avec des experts qui nous drive autant qu'on les drive.",
  date: '2026-01-20',
  tags: ['IA', 'Productivité', 'Réflexion', 'Workflow'],
  content: `
## La nouvelle capacité

Aujourd'hui, je travaille avec 10 onglets de terminal ouverts. Chaque onglet est une conversation avec un agent IA qui itère sur une tâche différente :

- **Onglet 1** : Dev backend — on refactorise un service d'authentification
- **Onglet 2** : Dev frontend — on corrige un bug de rendu
- **Onglet 3** : DevOps — on configure un nouveau service Docker
- **Onglet 4** : Time management — on planifie la semaine
- **Onglet 5** : Rédaction — on écrit cet article

Et ainsi de suite.

Ce n'est pas du multitâche. C'est du **dialogue parallèle**.

## Nous drivons l'IA, l'IA nous drive

La relation n'est pas unidirectionnelle. Je ne donne pas des ordres à un outil.

**Je drive l'agent** :
- Je lui donne le contexte
- Je valide ou refuse ses propositions
- Je recadre quand il part dans une mauvaise direction

**L'agent me drive** :
- Il me pose des questions que je n'avais pas anticipées
- Il me rappelle des cas limites que j'aurais oubliés
- Il structure ma pensée floue en spec concrète
- Il me force à clarifier ce que je veux vraiment

C'est un dialogue. Pas une commande.

## Des experts dans chaque onglet

Chaque terminal est une conversation avec un spécialiste différent :

| Onglet | Expert | Dialogue type |
|--------|--------|---------------|
| Dev | Senior developer | "Ce pattern a un code smell, voici pourquoi..." |
| DevOps | SRE | "Ta config expose un port inutilement..." |
| Product | PM | "Avant de coder, clarifions les user stories..." |
| Coach | Productivité | "Tu dérives, recentre-toi sur ta priorité..." |
| Writer | Rédacteur | "Ce paragraphe est confus, reformulons..." |

Je n'ai pas besoin d'être expert dans tous ces domaines. J'ai juste besoin de savoir **dialoguer** avec ces experts.

## La rapidité du changement de contexte

Ce qui était impossible avant :
- Passer du code au DevOps prenait 30 minutes de recherche
- Écrire une spec demandait une demi-journée de réflexion
- Planifier sa semaine nécessitait un outil externe et du temps calme

Maintenant :
- Je switch d'onglet
- Je reprends le dialogue là où je l'ai laissé
- L'agent a le contexte complet de notre conversation
- En 2 minutes, je suis productif sur un autre sujet

Le **coût du changement de contexte** a drastiquement baissé.

## Ce n'est pas du multitâche

Le multitâche classique fragmente l'attention et détruit la productivité.

Ce que je fais est différent :
1. **Une seule tâche à la fois** dans ma tête
2. **Plusieurs dialogues en cours** qui avancent en parallèle
3. **L'agent maintient le contexte** pendant que je suis ailleurs

Quand je reviens sur un onglet, je ne repars pas de zéro. L'agent sait où on en était. Il me résume. On continue.

C'est comme avoir une équipe qui travaille en parallèle, et je passe de bureau en bureau pour débloquer, valider, orienter.

## Le nouveau skill : savoir dialoguer

La compétence clé n'est plus de tout savoir faire soi-même.

C'est de savoir :
- **Poser les bonnes questions** pour obtenir ce qu'on veut
- **Évaluer les réponses** pour détecter les erreurs
- **Recadrer** quand l'agent part dans une mauvaise direction
- **Synthétiser** les outputs de plusieurs agents

On devient **chef d'orchestre** plutôt qu'instrumentiste.

## Le piège : perdre le contrôle

Le risque existe :
- Se laisser porter par l'IA sans direction claire
- Accepter des réponses sans les challenger
- Ouvrir 10 onglets et ne rien finir

Le dialogue doit rester **intentionnel**. Je choisis quand je switch. Je sais pourquoi je suis dans cet onglet. J'ai une définition de "fini" pour chaque conversation.

## Ma pratique actuelle

**Matin (focus)** :
- 2-3 onglets max
- Tâches importantes uniquement
- Dialogues profonds, pas de papillonnage

**Après-midi (courant)** :
- Plus d'onglets ouverts
- Tâches admin, emails, petits fixes
- Dialogues courts, résolution rapide

**Soir (wrap-up)** :
- Un seul onglet
- Bilan de la journée
- L'agent m'aide à voir ce qui a été fait

## Conclusion

L'IA n'est pas un outil qu'on utilise ponctuellement.

C'est une **nouvelle façon de travailler** : un dialogue permanent avec des experts qui nous challengent autant qu'on les dirige.

La productivité vient de la **fluidité de ce dialogue** et de notre capacité à orchestrer plusieurs conversations en parallèle sans perdre le fil.

On ne code plus seul. On ne réfléchit plus seul. On dialogue.
  `.trim()
}
