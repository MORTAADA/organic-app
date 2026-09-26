# Addition Nucléophile — Organic Chemistry Lab

Application React/TypeScript interactive pour étudier les additions nucléophiles sur les composés carbonylés.

## Réactions actuelles
1. Hydratation du carbonyle
2. Formation d'imines par les amines primaires
3. Acétalisation par les alcools
4. Addition de Grignard
5. Addition de HCN / cyanohydrine

## Architecture
- `src/lib/reactions.ts` : contenu scientifique, conditions, équations et étapes pédagogiques.
- `src/lib/molecules.ts` : états moléculaires 3D pour chaque étape.
- `src/components/Mechanism2D.tsx` : schémas 2D et flèches de déplacement électronique.
- `src/components/Molecule3D.tsx` : visualisation 3D WebGL avec solution de repli 2D.
- `src/pages/Reaction.tsx` : lecteur pas-à-pas et navigation.

## Installation
```bash
npm install
npm run dev
```

Build de production :
```bash
npm run build
```

Vérification TypeScript :
```bash
npm run typecheck
```

## Audit scientifique
Voir `CHEMISTRY_AUDIT.md` pour les corrections de mécanismes et les références pédagogiques utilisées.
