# Chemistry Audit — Addition Nucléophile Lab

## Scope
Audit of the five reaction mechanisms, arrow direction, intermediates, charges, products, conditions, and synchronization between the reaction text, 2D mechanism and 3D stages.

## Scientific references consulted
- IUPAC Gold Book: electrophile — an electrophile accepts both bonding electrons from a nucleophile.
- Chemistry LibreTexts / OpenStax: nucleophilic addition to carbonyls; acid/base-catalysed hydration.
- Chemistry LibreTexts: primary amines → imines; secondary amines → enamines; acid-catalysed, reversible process.
- Chemistry LibreTexts: acid-catalysed hemiacetal/acetal formation and the seven elementary stages.
- Chemistry LibreTexts: Grignard addition — C–C bond formation followed by acidic work-up.
- Chemistry LibreTexts: CN− addition and cyanohydrin formation.

## Corrections applied

### Hydration
- Replaced the previous mixed/incorrect charge picture (C bonded simultaneously to O− and OH2+) with an acid-catalysed sequence.
- Arrow convention: electron source → electron sink.
- Explicitly separated protonation, nucleophilic attack/π-bond shift, deprotonation, and equilibrium product.

### Primary amine → imine
- Corrected the missing/incorrect C=O π-electron movement.
- Added the carbinolamine intermediate.
- Added OH protonation before water departure.
- Water departure is represented by C–O bond electrons returning to oxygen while N lone-pair electrons form C=N.
- Final step is deprotonation of the iminium ion.

### Alcohol → acetal
- Expanded the mechanism from an oversimplified 5-stage sequence to the standard 7-stage educational sequence.
- Removed the incorrect treatment of the intermediate as a simple free carbocation; the key intermediate is an oxonium species stabilized by the OR group.
- Added first alcohol addition, deprotonation, OH protonation, water loss, second alcohol addition, and final deprotonation.

### Grignard
- The nucleophilic atom is the carbon attached to Mg, not Mg itself.
- C–C bond formation and C=O π-electron shift are separated from the aqueous work-up.
- The final alcohol is only formed after protonation of the magnesium alkoxide during work-up.
- Reaction is explicitly marked anhydrous before work-up.

### HCN → cyanohydrin
- The nucleophilic atom is the carbon of CN−.
- CN− attacks the carbonyl carbon; C=O π electrons move to oxygen.
- The tetrahedral alkoxide intermediate is shown before protonation.
- Final product is R2C(OH)–CN and the addition is treated as reversible.

## Important implementation correction
The previous project snapshot contained an extra closing bracket in `src/lib/molecules.ts`, which made that file syntactically invalid. It has been removed.

## Verification limitation
A complete `npm run build` could not be executed in this environment because the project dependencies were not installed and the package installation attempt timed out. Static source inspection was performed, but runtime rendering of the 2D/3D scenes still needs a browser-side verification when dependencies can be installed.
