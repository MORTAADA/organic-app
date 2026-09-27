/* =========================================================
   Utilitaires pour le modèle Mechanism
   ========================================================= */

import type {
  Mechanism,
  MechanismStep,
  MechanismStepId,
} from "./types";

/* =========================================================
   Création d'un mécanisme
   ========================================================= */

export function createMechanism(
  id: string,
  steps: MechanismStep[] = [],
): Mechanism {
  return {
    id,
    steps,
  };
}

/* =========================================================
   Recherche d'une étape
   ========================================================= */

export function getMechanismStep(
  mechanism: Mechanism,
  stepId: MechanismStepId,
): MechanismStep | undefined {
  return mechanism.steps.find(
    (step) => step.id === stepId,
  );
}

/* =========================================================
   Recherche par index
   ========================================================= */

export function getMechanismStepAt(
  mechanism: Mechanism,
  index: number,
): MechanismStep | undefined {
  return mechanism.steps[index];
}

/* =========================================================
   Nombre d'étapes
   ========================================================= */

export function getMechanismStepCount(
  mechanism: Mechanism,
): number {
  return mechanism.steps.length;
}

/* =========================================================
   Vérification d'un index
   ========================================================= */

export function hasMechanismStepAt(
  mechanism: Mechanism,
  index: number,
): boolean {
  return (
    index >= 0 &&
    index < mechanism.steps.length
  );
}

/* =========================================================
   Ajout d'une étape
   ========================================================= */

export function addMechanismStep(
  mechanism: Mechanism,
  step: MechanismStep,
): Mechanism {
  return {
    ...mechanism,
    steps: [
      ...mechanism.steps,
      step,
    ],
  };
}
