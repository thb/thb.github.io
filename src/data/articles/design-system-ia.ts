import type { Article } from './index'

export const designSystemIA: Article = {
  slug: 'design-system-ia',
  title: "Faire créer un Design System par vos agents IA",
  description: "Un design system est répétitif par nature : variantes, états, tokens. C'est exactement le type de tâche où l'IA excelle.",
  date: '2026-01-19',
  tags: ['IA', 'Design System', 'UI/UX', 'Tailwind'],
  content: `
## Pourquoi ça fonctionne

Un design system est **répétitif par nature** : variantes de boutons, états de formulaires, tokens de couleurs. C'est exactement le type de tâche où l'IA excelle et où l'humain fatigue.

Là où tu passerais des heures à créer 12 variantes de boutons avec tous les états (hover, focus, disabled, loading), l'agent le fait en quelques minutes sans erreur d'attention.

## Méthodologie en 3 phases

### Phase 1 : Définir les primitives (tokens)

\`\`\`
Prompt : "Crée un fichier de tokens CSS/Tailwind avec :
- 5 nuances de gris (50 à 900)
- Une couleur primaire avec 5 variantes
- Spacing : 4, 8, 12, 16, 24, 32, 48, 64px
- Border radius : sm, md, lg, xl
- Typographie : 5 tailles avec line-height"
\`\`\`

L'agent produit un fichier cohérent que tu valides une fois. Ces tokens deviennent la source de vérité pour la suite.

### Phase 2 : Composants atomiques

- **Button** : variants (primary, secondary, ghost, destructive), sizes (sm, md, lg)
- **Input** : states (default, focus, error, disabled)
- **Badge**, **Avatar**, **Card**, **Tooltip**

Chaque composant utilise les tokens de la phase 1. L'agent ne peut pas dévier.

### Phase 3 : Composants composés

- Form fields (label + input + error message)
- Data tables avec tri et pagination
- Modals et drawers avec animations
- Navigation et breadcrumbs

## Avantages de cette approche

### 1. Cohérence garantie

L'agent utilise les mêmes tokens partout. Pas de "presque le bon gris" ou de "à peu près le bon spacing".

### 2. Documentation auto-générée

Demande à l'agent de générer les Storybook stories en même temps que les composants :

\`\`\`
"Pour chaque composant, génère aussi le fichier .stories.tsx avec
toutes les variantes documentées"
\`\`\`

### 3. Variantes exhaustives

L'agent ne "fatigue" pas. Il crée les 12 combinaisons bouton × taille × état sans erreur d'inattention.

### 4. Accessibilité intégrée

\`\`\`
"Inclus les attributs ARIA appropriés, les focus states visibles,
et vérifie les ratios de contraste WCAG AA"
\`\`\`

## Outils recommandés

| Outil | Usage |
|-------|-------|
| **Tailwind + Shadcn/ui** | Base solide que l'agent personnalise |
| **Storybook** | Documentation vivante générée avec les composants |
| **Figma Tokens** | Export JSON → l'agent convertit en config Tailwind |

## Piège à éviter

**Ne pas laisser l'agent décider de l'esthétique.**

L'agent implémente, il ne design pas. Fournis-lui :
- Des références visuelles (screenshots, liens)
- Un mood board ou une direction artistique
- Les contraintes de marque (couleurs, typographie)

Sinon tu obtiens du "générique mais correct" — techniquement bon mais sans personnalité.

## Workflow type

1. **Brief visuel** : Tu montres des références, tu décris l'ambiance
2. **Tokens** : L'agent génère les primitives, tu valides
3. **Composants** : L'agent code, tu reviews l'aspect visuel
4. **Itération** : "Plus de contraste", "Arrondis plus doux", etc.
5. **Documentation** : Storybook généré automatiquement

## Conclusion

Le design system est le cas d'usage parfait pour l'IA : travail répétitif, règles strictes, et une fois validé, c'est stable.

Tu gardes la direction artistique. L'agent fait le travail de moine.
  `.trim()
}
