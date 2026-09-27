/* =========================================================
   Modèle chimique commun — Phase 1 / F2

   Ces types sont indépendants de React, Three.js et du rendu 2D.
   Ils constituent la base commune pour :
   - la visualisation 2D
   - la visualisation 3D
   - les exercices
   - le futur constructeur de mécanismes
   - le futur assistant pédagogique
   ========================================================= */

/* =========================================================
   Identifiants chimiques
   ========================================================= */

export type AtomId = string;
export type BondId = string;
export type MoleculeId = string;
export type ReactionId = string;
export type MechanismStepId = string;

/* =========================================================
   Charges et rôles chimiques
   ========================================================= */

export type PartialCharge = "δ+" | "δ-";

export type AtomRole =
  | "nucleophile"
  | "electrophile"
  | "leaving-group"
  | "proton"
  | "spectator";

/* =========================================================
   Atome
   ========================================================= */

export interface Atom {
  /** Identifiant unique dans la molécule. */
  id: AtomId;

  /** Symbole chimique : C, O, N, H, Mg, Br, etc. */
  element: string;

  /** Charge formelle entière : -1, 0, +1, etc. */
  formalCharge?: number;

  /** Charge partielle utilisée pour représenter une polarisation. */
  partialCharge?: PartialCharge;

  /** Position optionnelle utilisée par les visualisations 2D/3D. */
  position?: [number, number, number];

  /** Rôle pédagogique/chimique de l'atome dans l'étape. */
  role?: AtomRole;

  /** Label pédagogique optionnel : R, R′, OH₂⁺, etc. */
  label?: string;
}

/* =========================================================
   Liaison
   ========================================================= */

export type BondOrder = 1 | 2 | 3;

export type BondType =
  | "covalent"
  | "ionic"
  | "coordinate";

export type BondStatus =
  | "formed"
  | "broken"
  | "unchanged";

export interface Bond {
  /** Identifiant unique de la liaison dans la molécule. */
  id: BondId;

  /** Identifiant de l'atome de départ. */
  from: AtomId;

  /** Identifiant de l'atome d'arrivée. */
  to: AtomId;

  /** Ordre de liaison : simple, double ou triple. */
  order: BondOrder;

  /** Nature de la liaison. */
  type?: BondType;

  /** État de la liaison dans une transformation de mécanisme. */
  status?: BondStatus;
}

/* =========================================================
   Molécule
   ========================================================= */

export interface Molecule {
  /** Identifiant unique de la molécule dans une étape. */
  id: MoleculeId;

  /** Nom chimique ou pédagogique optionnel. */
  name?: string;

  /** Atomes constituant la molécule. */
  atoms: Atom[];

  /** Liaisons entre les atomes. */
  bonds: Bond[];
}

/* =========================================================
   Mouvement électronique
   ========================================================= */

export type ElectronMovementType =
  | "bond-to-atom"
  | "lone-pair-to-atom"
  | "bond-to-bond";

export interface ElectronMovement {
  /** Type de déplacement du doublet électronique. */
  type: ElectronMovementType;

  /** Source du doublet : liaison, atome ou doublet identifié. */
  from: string;

  /** Destination du doublet. */
  to: string;

  /** Explication pédagogique optionnelle. */
  description?: string;
}

/* =========================================================
   Flèche de mécanisme
   ========================================================= */

export interface MechanismArrow {
  /** Point de départ de la flèche. */
  from: [number, number, number];

  /** Point d'arrivée de la flèche. */
  to: [number, number, number];

  /** Couleur optionnelle de la flèche. */
  color?: string;
}

/* =========================================================
   Étape d'un mécanisme
   ========================================================= */

export interface MechanismStep {
  /** Identifiant stable de l'étape. */
  id: MechanismStepId;

  /** Titre court de l'étape. */
  title: string;

  /** Description de ce qui se passe chimiquement. */
  description: string;

  /** Molécules présentes à cette étape. */
  molecules: Molecule[];

  /** Déplacements électroniques de l'étape. */
  electronMovements?: ElectronMovement[];

  /** Flèches visuelles associées au mécanisme. */
  arrows?: MechanismArrow[];

  /** Résultat chimique de l'étape. */
  result?: string;

  /** Explication de la raison de la transformation. */
  why?: string;

  /** Explication pédagogique de la destination des électrons. */
  electronExplanation?: string;
}

/* =========================================================
   Mécanisme complet
   ========================================================= */

export interface Mechanism {
  /** Identifiant du mécanisme. */
  id: string;

  /** Étapes ordonnées du mécanisme. */
  steps: MechanismStep[];
}

/* =========================================================
   Étape descriptive d'une réaction

   Cette structure permet de conserver les informations
   pédagogiques générales déjà présentes dans reactions.ts
   pendant la migration progressive vers MechanismStep.
   ========================================================= */

export interface ReactionStepDescription {
  title: string;
  description: string;
}

/* =========================================================
   Réaction
   ========================================================= */

export interface Reaction {
  /** Identifiant unique de la réaction. */
  id: ReactionId;

  /** Nom complet de la réaction. */
  title: string;

  /** Nom court utilisé dans les interfaces compactes. */
  shortTitle?: string;

  /** Sous-titre pédagogique. */
  subtitle?: string;

  /** Réactif ou espèce nucléophile principale. */
  nucleophile?: string;

  /** Produit principal. */
  product?: string;

  /** Conditions expérimentales. */
  conditions?: string;

  /** Équation réactionnelle. */
  reactionEquation?: string;

  /** Description générale de la transformation. */
  description?: string;

  /** Exemple d'application. */
  example?: string;

  /** Couleur d'interface associée à la réaction. */
  color?: string;

  /** Description historique des étapes pendant la migration. */
  steps?: ReactionStepDescription[];

  /** Mécanisme chimique structuré. */
  mechanism?: Mechanism;
}
