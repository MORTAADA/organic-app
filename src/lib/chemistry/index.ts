/* =========================================================
   Chemistry Model — Point d'entrée principal
   ========================================================= */

export type {
  AtomId,
  BondId,
  MoleculeId,
  ReactionId,
  MechanismStepId,

  PartialCharge,
  AtomRole,

  Atom,

  BondOrder,
  BondType,
  BondStatus,
  Bond,

  Molecule,

  ElectronMovementType,
  ElectronMovement,

  MechanismArrow,

  MechanismStep,
  Mechanism,

  ReactionStepDescription,
  Reaction,
} from "./types";

/* =========================================================
   Utilitaires Molecule
   ========================================================= */

export {
  createMolecule,
  getAtom,
  getBond,
  getBondBetweenAtoms,
  hasAtom,
  hasBond,
  addAtom,
  addBond,
  removeAtom,
  removeBond,
} from "./molecule";

/* =========================================================
   Utilitaires Mechanism
   ========================================================= */

export {
  createMechanism,
  getMechanismStep,
  getMechanismStepAt,
  getMechanismStepCount,
  hasMechanismStepAt,
  addMechanismStep,
} from "./mechanism";
