/* =========================================================
   Utilitaires pour le modèle Molecule
   ========================================================= */

import type {
  Atom,
  AtomId,
  Bond,
  BondId,
  Molecule,
} from "./types";

/* =========================================================
   Création
   ========================================================= */

export function createMolecule(
  id: string,
  atoms: Atom[] = [],
  bonds: Bond[] = [],
  name?: string,
): Molecule {
  return {
    id,
    name,
    atoms,
    bonds,
  };
}

/* =========================================================
   Recherche d'un atome
   ========================================================= */

export function getAtom(
  molecule: Molecule,
  atomId: AtomId,
): Atom | undefined {
  return molecule.atoms.find((atom) => atom.id === atomId);
}

/* =========================================================
   Recherche d'une liaison
   ========================================================= */

export function getBond(
  molecule: Molecule,
  bondId: BondId,
): Bond | undefined {
  return molecule.bonds.find((bond) => bond.id === bondId);
}

/* =========================================================
   Recherche d'une liaison entre deux atomes
   ========================================================= */

export function getBondBetweenAtoms(
  molecule: Molecule,
  from: AtomId,
  to: AtomId,
): Bond | undefined {
  return molecule.bonds.find(
    (bond) =>
      (bond.from === from && bond.to === to) ||
      (bond.from === to && bond.to === from),
  );
}

/* =========================================================
   Vérification de présence d'un atome
   ========================================================= */

export function hasAtom(
  molecule: Molecule,
  atomId: AtomId,
): boolean {
  return molecule.atoms.some((atom) => atom.id === atomId);
}

/* =========================================================
   Vérification de présence d'une liaison
   ========================================================= */

export function hasBond(
  molecule: Molecule,
  bondId: BondId,
): boolean {
  return molecule.bonds.some((bond) => bond.id === bondId);
}

/* =========================================================
   Ajout d'un atome
   ========================================================= */

export function addAtom(
  molecule: Molecule,
  atom: Atom,
): Molecule {
  return {
    ...molecule,
    atoms: [...molecule.atoms, atom],
  };
}

/* =========================================================
   Ajout d'une liaison
   ========================================================= */

export function addBond(
  molecule: Molecule,
  bond: Bond,
): Molecule {
  return {
    ...molecule,
    bonds: [...molecule.bonds, bond],
  };
}

/* =========================================================
   Suppression d'un atome

   Les liaisons associées sont également supprimées.
   ========================================================= */

export function removeAtom(
  molecule: Molecule,
  atomId: AtomId,
): Molecule {
  return {
    ...molecule,

    atoms: molecule.atoms.filter(
      (atom) => atom.id !== atomId,
    ),

    bonds: molecule.bonds.filter(
      (bond) =>
        bond.from !== atomId &&
        bond.to !== atomId,
    ),
  };
}

/* =========================================================
   Suppression d'une liaison
   ========================================================= */

export function removeBond(
  molecule: Molecule,
  bondId: BondId,
): Molecule {
  return {
    ...molecule,

    bonds: molecule.bonds.filter(
      (bond) => bond.id !== bondId,
    ),
  };
}
