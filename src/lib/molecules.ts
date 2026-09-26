import type { Atom3D, Bond3D } from "@/components/Molecule3D";
import type { ReactionId } from "./reactions";

export interface MoleculeStep {
  title: string;
  caption: string;
  atoms: Atom3D[];
  bonds: Bond3D[];
  arrows?: {
    from: [number, number, number];
    to: [number, number, number];
    color?: string;
  }[];
}

const colors = {
  hyd: "#38bdf8",
  amine: "#a78bfa",
  alc: "#34d399",
  g: "#fb923c",
  hcn: "#facc15",
};

/* =========================================================
   STRUCTURE DE BASE : CARBONYLE
   ========================================================= */

function carbonyl() {
  return {
    atoms: [
      {
        id: "C",
        symbol: "C",
        position: [0, 0, 0] as [number, number, number],
        charge: "δ+",
      },
      {
        id: "O",
        symbol: "O",
        position: [1.35, 0.9, 0] as [number, number, number],
        charge: "δ-",
      },
      {
        id: "R",
        symbol: "R",
        position: [-1.3, 0.6, 0.2] as [number, number, number],
        label: "R",
      },
      {
        id: "Rp",
        symbol: "R",
        position: [-0.3, -1.3, -0.2] as [number, number, number],
        label: "R′",
      },
    ],
    bonds: [
      {
        from: "C",
        to: "O",
        order: 2 as const,
      },
      {
        from: "C",
        to: "R",
      },
      {
        from: "C",
        to: "Rp",
      },
    ],
  };
}

/* =========================================================
   HYDRATATION
   ========================================================= */

function hydratationSteps(): MoleculeStep[] {
  return [
    {
      title: "Protonation du carbonyle",
      caption:
        "H₃O⁺ protonne l'oxygène du carbonyle et augmente l'électrophilie du carbone.",
      atoms: [
        ...carbonyl().atoms,
        {
          id: "H3O",
          symbol: "O",
          position: [3.5, -0.3, 0.5] as [number, number, number],
          charge: "+",
          label: "H₃O⁺",
        },
      ],
      bonds: carbonyl().bonds,
      arrows: [
        {
          from: [3.1, -0.2, 0.4],
          to: [1.4, 0.75, 0.05],
          color: colors.hyd,
        },
      ],
    },

    {
      title: "Attaque nucléophile de H₂O",
      caption:
        "H₂O attaque le carbone électrophile du carbonyle et la liaison π(C=O) se déplace vers O.",
      atoms: [
        {
          id: "C",
          symbol: "C",
          position: [0, 0, 0] as [number, number, number],
        },
        {
          id: "O",
          symbol: "O",
          position: [1.35, 0.9, 0] as [number, number, number],
          charge: "+",
        },
        {
          id: "R",
          symbol: "R",
          position: [-1.3, 0.6, 0.2] as [number, number, number],
          label: "R",
        },
        {
          id: "Rp",
          symbol: "R",
          position: [-0.3, -1.3, -0.2] as [number, number, number],
          label: "R′",
        },
        {
          id: "Ow",
          symbol: "O",
          position: [1.2, -0.8, 0.7] as [number, number, number],
          charge: "+",
        },
      ],
      bonds: [
        {
          from: "C",
          to: "O",
        },
        {
          from: "C",
          to: "R",
        },
        {
          from: "C",
          to: "Rp",
        },
        {
          from: "C",
          to: "Ow",
        },
      ],
      arrows: [
        {
          from: [1.0, -0.6, 0.7],
          to: [0.15, 0, 0.05],
          color: colors.hyd,
        },
        {
          from: [0.75, 0.55, 0.05],
          to: [1.2, 0.78, 0.05],
          color: colors.hyd,
        },
      ],
    },

    {
      title: "Déprotonation",
      caption:
        "Une base du milieu retire un proton de OH₂⁺ et forme le gem-diol.",
      atoms: [
        {
          id: "C",
          symbol: "C",
          position: [0, 0, 0] as [number, number, number],
        },
        {
          id: "O1",
          symbol: "O",
          position: [1.25, 0.85, 0] as [number, number, number],
        },
        {
          id: "O2",
          symbol: "O",
          position: [1.2, -0.85, 0.6] as [number, number, number],
        },
        {
          id: "R",
          symbol: "R",
          position: [-1.3, 0.6, 0.2] as [number, number, number],
          label: "R",
        },
        {
          id: "Rp",
          symbol: "R",
          position: [-0.3, -1.3, -0.2] as [number, number, number],
          label: "R′",
        },
      ],
      bonds: [
        {
          from: "C",
          to: "O1",
        },
        {
          from: "C",
          to: "O2",
        },
        {
          from: "C",
          to: "R",
        },
        {
          from: "C",
          to: "Rp",
        },
      ],
    },

    {
      title: "Gem-diol",
      caption:
        "Produit final de l'hydratation: R₂C(OH)₂.",
      atoms: [
        {
          id: "C",
          symbol: "C",
          position: [0, 0, 0] as [number, number, number],
        },
        {
          id: "O1",
          symbol: "O",
          position: [1.25, 0.85, 0] as [number, number, number],
        },
        {
          id: "H1",
          symbol: "H",
          position: [2.1, 1.1, 0.1] as [number, number, number],
        },
        {
          id: "O2",
          symbol: "O",
          position: [1.2, -0.85, 0.6] as [number, number, number],
        },
        {
          id: "H2",
          symbol: "H",
          position: [2.05, -1.1, 0.7] as [number, number, number],
        },
        {
          id: "R",
          symbol: "R",
          position: [-1.3, 0.6, 0.2] as [number, number, number],
          label: "R",
        },
        {
          id: "Rp",
          symbol: "R",
          position: [-0.3, -1.3, -0.2] as [number, number, number],
          label: "R′",
        },
      ],
      bonds: [
        {
          from: "C",
          to: "O1",
        },
        {
          from: "O1",
          to: "H1",
        },
        {
          from: "C",
          to: "O2",
        },
        {
          from: "O2",
          to: "H2",
        },
        {
          from: "C",
          to: "R",
        },
        {
          from: "C",
          to: "Rp",
        },
      ],
    },
  ];
}

/* =========================================================
   AMINE / FORMATION D'IMINE
   ========================================================= */

function amineSteps(): MoleculeStep[] {
  return [
    {
      title: "Addition nucléophile de l'amine",
      caption:
        "R″NH₂ attaque le carbone électrophile du carbonyle et forme un intermédiaire tétraédrique.",
      atoms: [
        {
          id: "C",
          symbol: "C",
          position: [0, 0, 0] as [number, number, number],
        },
        {
          id: "O",
          symbol: "O",
          position: [1.3, 0.8, 0] as [number, number, number],
          charge: "-",
        },
        {
          id: "R",
          symbol: "R",
          position: [-1.3, 0.6, 0.2] as [number, number, number],
          label: "R",
        },
        {
          id: "Rp",
          symbol: "R",
          position: [-0.3, -1.3, -0.2] as [number, number, number],
          label: "R′",
        },
        {
          id: "N",
          symbol: "N",
          position: [1.3, -0.8, 0.7] as [number, number, number],
          charge: "+",
        },
        {
          id: "R2",
          symbol: "R",
          position: [2.3, -0.8, 1.2] as [number, number, number],
          label: "R″",
        },
      ],
      bonds: [
        {
          from: "C",
          to: "O",
        },
        {
          from: "C",
          to: "R",
        },
        {
          from: "C",
          to: "Rp",
        },
        {
          from: "C",
          to: "N",
        },
        {
          from: "N",
          to: "R2",
        },
      ],
      arrows: [
        {
          from: [1.05, -0.55, 0.7],
          to: [0.15, 0, 0.05],
          color: colors.amine,
        },
        {
          from: [0.75, 0.55, 0.05],
          to: [1.2, 0.78, 0.05],
          color: colors.amine,
        },
      ],
    },

    {
      title: "Carbinolamine",
      caption:
        "Après les transferts de protons, on obtient l'intermédiaire carbinolamine.",
      atoms: [
        {
          id: "C",
          symbol: "C",
          position: [0, 0, 0] as [number, number, number],
        },
        {
          id: "O",
          symbol: "O",
          position: [1.3, 0.8, 0] as [number, number, number],
        },
        {
          id: "N",
          symbol: "N",
          position: [1.3, -0.8, 0.7] as [number, number, number],
        },
        {
          id: "R",
          symbol: "R",
          position: [-1.3, 0.6, 0.2] as [number, number, number],
          label: "R",
        },
        {
          id: "Rp",
          symbol: "R",
          position: [-0.3, -1.3, -0.2] as [number, number, number],
          label: "R′",
        },
        {
          id: "R2",
          symbol: "R",
          position: [2.3, -0.8, 1.2] as [number, number, number],
          label: "R″",
        },
      ],
      bonds: [
        {
          from: "C",
          to: "O",
        },
        {
          from: "C",
          to: "N",
        },
        {
          from: "C",
          to: "R",
        },
        {
          from: "C",
          to: "Rp",
        },
        {
          from: "N",
          to: "R2",
        },
      ],
    },

    {
      title: "Protonation du groupe OH",
      caption:
        "Le groupe OH est protoné pour devenir OH₂⁺, un meilleur groupe partant.",
      atoms: [
        {
          id: "C",
          symbol: "C",
          position: [0, 0, 0] as [number, number, number],
        },
        {
          id: "O",
          symbol: "O",
          position: [1.3, 0.8, 0] as [number, number, number],
          charge: "+",
        },
        {
          id: "H",
          symbol: "H",
          position: [2.1, 1.1, 0.1] as [number, number, number],
        },
        {
          id: "N",
          symbol: "N",
          position: [1.3, -0.8, 0.7] as [number, number, number],
        },
        {
          id: "R",
          symbol: "R",
          position: [-1.3, 0.6, 0.2] as [number, number, number],
          label: "R",
        },
        {
          id: "Rp",
          symbol: "R",
          position: [-0.3, -1.3, -0.2] as [number, number, number],
          label: "R′",
        },
        {
          id: "R2",
          symbol: "R",
          position: [2.3, -0.8, 1.2] as [number, number, number],
          label: "R″",
        },
      ],
      bonds: [
        {
          from: "C",
          to: "O",
        },
        {
          from: "O",
          to: "H",
        },
        {
          from: "C",
          to: "N",
        },
        {
          from: "C",
          to: "R",
        },
        {
          from: "C",
          to: "Rp",
        },
        {
          from: "N",
          to: "R2",
        },
      ],
    },

    {
      title: "Élimination de H₂O",
      caption:
        "L'eau quitte et le doublet de N forme la liaison π C=N.",
      atoms: [
        {
          id: "C",
          symbol: "C",
          position: [0, 0, 0] as [number, number, number],
        },
        {
          id: "N",
          symbol: "N",
          position: [1.35, 0.8, 0] as [number, number, number],
          charge: "+",
        },
        {
          id: "R",
          symbol: "R",
          position: [-1.3, 0.6, 0.2] as [number, number, number],
          label: "R",
        },
        {
          id: "Rp",
          symbol: "R",
          position: [-0.3, -1.3, -0.2] as [number, number, number],
          label: "R′",
        },
        {
          id: "R2",
          symbol: "R",
          position: [2.35, 1.2, 0.1] as [number, number, number],
          label: "R″",
        },
        {
          id: "H2O",
          symbol: "O",
          position: [2.7, -0.8, 0.5] as [number, number, number],
          label: "H₂O",
        },
      ],
      bonds: [
        {
          from: "C",
          to: "N",
          order: 2,
        },
        {
          from: "C",
          to: "R",
        },
        {
          from: "C",
          to: "Rp",
        },
        {
          from: "N",
          to: "R2",
        },
      ],
      arrows: [
        {
          from: [1.05, 0.65, 0.05],
          to: [0.35, 0.05, 0.05],
          color: colors.amine,
        },
      ],
    },

    {
      title: "Imine",
      caption:
        "Déprotonation finale de l'ion iminium pour former l'imine R₂C=NR″.",
      atoms: [
        {
          id: "C",
          symbol: "C",
          position: [0, 0, 0] as [number, number, number],
        },
        {
          id: "N",
          symbol: "N",
          position: [1.35, 0.8, 0] as [number, number, number],
        },
        {
          id: "R",
          symbol: "R",
          position: [-1.3, 0.6, 0.2] as [number, number, number],
          label: "R",
        },
        {
          id: "Rp",
          symbol: "R",
          position: [-0.3, -1.3, -0.2] as [number, number, number],
          label: "R′",
        },
        {
          id: "R2",
          symbol: "R",
          position: [2.35, 1.2, 0.1] as [number, number, number],
          label: "R″",
        },
      ],
      bonds: [
        {
          from: "C",
          to: "N",
          order: 2,
        },
        {
          from: "C",
          to: "R",
        },
        {
          from: "C",
          to: "Rp",
        },
        {
          from: "N",
          to: "R2",
        },
      ],
    },
  ];
}

/* =========================================================
   ACETALISATION
   ========================================================= */

function acetalSteps(): MoleculeStep[] {
  return [
    {
      title: "Protonation du carbonyle",
      caption:
        "H⁺ protonne l'oxygène du carbonyle et rend le carbone plus électrophile.",
      atoms: [
        ...carbonyl().atoms,
        {
          id: "H",
          symbol: "H",
          position: [2.0, 1.15, 0.1] as [number, number, number],
        },
      ],
      bonds: [
        ...carbonyl().bonds,
        {
          from: "O",
          to: "H",
        },
      ],
      arrows: [
        {
          from: [2.0, 1.0, 0.1],
          to: [1.4, 0.75, 0.05],
          color: colors.alc,
        },
      ],
    },

    {
      title: "Addition nucléophile de R′OH",
      caption:
        "Le premier alcool R′OH attaque le carbone du carbonyle; la liaison π(C=O) se déplace vers O.",
      atoms: [
        {
          id: "C",
          symbol: "C",
          position: [0, 0, 0] as [number, number, number],
        },
        {
          id: "O",
          symbol: "O",
          position: [1.3, 0.8, 0] as [number, number, number],
          charge: "-",
        },
        {
          id: "R",
          symbol: "R",
          position: [-1.3, 0.6, 0.2] as [number, number, number],
          label: "R",
        },
        {
          id: "Rp",
          symbol: "R",
          position: [-0.3, -1.3, -0.2] as [number, number, number],
          label: "R′",
        },
        {
          id: "O1",
          symbol: "O",
          position: [1.3, -0.8, 0.7] as [number, number, number],
          charge: "+",
        },
        {
          id: "R1",
          symbol: "R",
          position: [2.3, -0.8, 1.2] as [number, number, number],
          label: "R′",
        },
      ],
      bonds: [
        {
          from: "C",
          to: "O",
        },
        {
          from: "C",
          to: "R",
        },
        {
          from: "C",
          to: "Rp",
        },
        {
          from: "C",
          to: "O1",
        },
        {
          from: "O1",
          to: "R1",
        },
      ],
      arrows: [
        {
          from: [1.05, -0.55, 0.7],
          to: [0.15, 0, 0.05],
          color: colors.alc,
        },
        {
          from: [0.75, 0.55, 0.05],
          to: [1.2, 0.78, 0.05],
          color: colors.alc,
        },
      ],
    },

    {
      title: "Hémiacétal",
      caption:
        "Après transfert de proton, on obtient l'hémiacétal R₂C(OH)(OR′).",
      atoms: [
        {
          id: "C",
          symbol: "C",
          position: [0, 0, 0] as [number, number, number],
        },
        {
          id: "O",
          symbol: "O",
          position: [1.3, 0.8, 0] as [number, number, number],
        },
        {
          id: "O1",
          symbol: "O",
          position: [1.3, -0.8, 0.7] as [number, number, number],
        },
        {
          id: "R1",
          symbol: "R",
          position: [2.3, -0.8, 1.2] as [number, number, number],
          label: "R′",
        },
        {
          id: "H",
          symbol: "H",
          position: [2.1, 1.1, 0.1] as [number, number, number],
        },
        {
          id: "R",
          symbol: "R",
          position: [-1.3, 0.6, 0.2] as [number, number, number],
          label: "R",
        },
        {
          id: "Rp",
          symbol: "R",
          position: [-0.3, -1.3, -0.2] as [number, number, number],
          label: "R′",
        },
      ],
      bonds: [
        {
          from: "C",
          to: "O",
        },
        {
          from: "O",
          to: "H",
        },
        {
          from: "C",
          to: "O1",
        },
        {
          from: "O1",
          to: "R1",
        },
        {
          from: "C",
          to: "R",
        },
        {
          from: "C",
          to: "Rp",
        },
      ],
    },

    {
      title: "Protonation du groupe OH",
      caption:
        "Le groupe OH est protoné pour former OH₂⁺, un bon groupe partant.",
      atoms: [
        {
          id: "C",
          symbol: "C",
          position: [0, 0, 0] as [number, number, number],
        },
        {
          id: "O",
          symbol: "O",
          position: [1.3, 0.8, 0] as [number, number, number],
          charge: "+",
        },
        {
          id: "H",
          symbol: "H",
          position: [2.1, 1.1, 0.1] as [number, number, number],
        },
        {
          id: "O1",
          symbol: "O",
          position: [1.3, -0.8, 0.7] as [number, number, number],
        },
        {
          id: "R1",
          symbol: "R",
          position: [2.3, -0.8, 1.2] as [number, number, number],
          label: "R′",
        },
        {
          id: "R",
          symbol: "R",
          position: [-1.3, 0.6, 0.2] as [number, number, number],
          label: "R",
        },
        {
          id: "Rp",
          symbol: "R",
          position: [-0.3, -1.3, -0.2] as [number, number, number],
          label: "R′",
        },
      ],
      bonds: [
        {
          from: "C",
          to: "O",
        },
        {
          from: "O",
          to: "H",
        },
        {
          from: "C",
          to: "O1",
        },
        {
          from: "O1",
          to: "R1",
        },
        {
          from: "C",
          to: "R",
        },
        {
          from: "C",
          to: "Rp",
        },
      ],
    },

    {
      title: "Départ de H₂O",
      caption:
        "L'eau quitte et forme un ion oxocarbenium stabilisé par le groupe OR′.",
      atoms: [
        {
          id: "C",
          symbol: "C",
          position: [0, 0, 0] as [number, number, number],
          charge: "+",
        },
        {
          id: "O1",
          symbol: "O",
          position: [1.3, -0.8, 0.7] as [number, number, number],
        },
        {
          id: "R1",
          symbol: "R",
          position: [2.3, -0.8, 1.2] as [number, number, number],
          label: "R′",
        },
        {
          id: "R",
          symbol: "R",
          position: [-1.3, 0.6, 0.2] as [number, number, number],
          label: "R",
        },
        {
          id: "Rp",
          symbol: "R",
          position: [-0.3, -1.3, -0.2] as [number, number, number],
          label: "R′",
        },
        {
          id: "H2O",
          symbol: "O",
          position: [2.8, 1.0, 0.5] as [number, number, number],
          label: "H₂O",
        },
      ],
      bonds: [
        {
          from: "C",
          to: "O1",
        },
        {
          from: "O1",
          to: "R1",
        },
        {
          from: "C",
          to: "R",
        },
        {
          from: "C",
          to: "Rp",
        },
      ],
      arrows: [
        {
          from: [1.1, 0.55, 0.1],
          to: [2.35, 0.85, 0.4],
          color: colors.alc,
        },
      ],
    },

    {
      title: "Addition du second alcool",
      caption:
        "Un deuxième R′OH attaque l'ion oxocarbenium pour former l'intermédiaire protoné.",
      atoms: [
        {
          id: "C",
          symbol: "C",
          position: [0, 0, 0] as [number, number, number],
        },
        {
          id: "O1",
          symbol: "O",
          position: [1.25, 0.8, 0] as [number, number, number],
        },
        {
          id: "R1",
          symbol: "R",
          position: [2.25, 1.2, 0.1] as [number, number, number],
          label: "R′",
        },
        {
          id: "O2",
          symbol: "O",
          position: [1.3, -0.8, 0.7] as [number, number, number],
          charge: "+",
        },
        {
          id: "R2",
          symbol: "R",
          position: [2.3, -0.8, 1.2] as [number, number, number],
          label: "R′",
        },
        {
          id: "R",
          symbol: "R",
          position: [-1.3, 0.6, 0.2] as [number, number, number],
          label: "R",
        },
        {
          id: "Rp",
          symbol: "R",
          position: [-0.3, -1.3, -0.2] as [number, number, number],
          label: "R′",
        },
      ],
      bonds: [
        {
          from: "C",
          to: "O1",
        },
        {
          from: "O1",
          to: "R1",
        },
        {
          from: "C",
          to: "O2",
        },
        {
          from: "O2",
          to: "R2",
        },
        {
          from: "C",
          to: "R",
        },
        {
          from: "C",
          to: "Rp",
        },
      ],
      arrows: [
        {
          from: [3.0, -0.4, 1.0],
          to: [0.2, 0, 0.05],
          color: colors.alc,
        },
      ],
    },

    {
      title: "Déprotonation",
      caption:
        "Une base retire le proton du groupe OR′H⁺ pour donner l'acétal neutre.",
      atoms: [
        {
          id: "C",
          symbol: "C",
          position: [0, 0, 0] as [number, number, number],
        },
        {
          id: "O1",
          symbol: "O",
          position: [1.25, 0.8, 0] as [number, number, number],
        },
        {
          id: "R1",
          symbol: "R",
          position: [2.25, 1.2, 0.1] as [number, number, number],
          label: "R′",
        },
        {
          id: "O2",
          symbol: "O",
          position: [1.3, -0.8, 0.7] as [number, number, number],
        },
        {
          id: "R2",
          symbol: "R",
          position: [2.3, -0.8, 1.2] as [number, number, number],
          label: "R′",
        },
        {
          id: "R",
          symbol: "R",
          position: [-1.3, 0.6, 0.2] as [number, number, number],
          label: "R",
        },
        {
          id: "Rp",
          symbol: "R",
          position: [-0.3, -1.3, -0.2] as [number, number, number],
          label: "R′",
        },
      ],
      bonds: [
        {
          from: "C",
          to: "O1",
        },
        {
          from: "O1",
          to: "R1",
        },
        {
          from: "C",
          to: "O2",
        },
        {
          from: "O2",
          to: "R2",
        },
        {
          from: "C",
          to: "R",
        },
        {
          from: "C",
          to: "Rp",
        },
      ],
    },
  ];
}

/* =========================================================
   GRIGNARD
   ========================================================= */

function grignardSteps(): MoleculeStep[] {
  return [
    {
      title: "Polarisation du réactif de Grignard",
      caption:
        "La liaison C–Mg est fortement polarisée: le carbone de R″–MgX possède un caractère nucléophile δ−.",
      atoms: [
        ...carbonyl().atoms,
        {
          id: "CGr",
          symbol: "C",
          position: [3.4, -0.5, 0.6] as [number, number, number],
          charge: "δ-",
          label: "R″",
        },
        {
          id: "Mg",
          symbol: "Mg",
          position: [4.7, 0, 0.7] as [number, number, number],
          charge: "δ+",
        },
        {
          id: "X",
          symbol: "Br",
          position: [5.7, 0.6, 0.8] as [number, number, number],
          label: "X",
        },
      ],
      bonds: [
        ...carbonyl().bonds,
        {
          from: "CGr",
          to: "Mg",
        },
        {
          from: "Mg",
          to: "X",
        },
      ],
      arrows: [
        {
          from: [3.1, -0.4, 0.55],
          to: [0.2, 0, 0.05],
          color: colors.g,
        },
      ],
    },

    {
      title: "Attaque nucléophile",
      caption:
        "Le carbone nucléophile R″ attaque le carbone du carbonyle et la liaison π(C=O) se déplace vers O.",
      atoms: [
        {
          id: "C",
          symbol: "C",
          position: [0, 0, 0] as [number, number, number],
        },
        {
          id: "O",
          symbol: "O",
          position: [1.3, 0.8, 0] as [number, number, number],
          charge: "-",
        },
        {
          id: "R",
          symbol: "R",
          position: [-1.3, 0.6, 0.2] as [number, number, number],
          label: "R",
        },
        {
          id: "Rp",
          symbol: "R",
          position: [-0.3, -1.3, -0.2] as [number, number, number],
          label: "R′",
        },
        {
          id: "RGr",
          symbol: "R",
          position: [1.3, -0.8, 0.7] as [number, number, number],
          label: "R″",
        },
        {
          id: "Mg",
          symbol: "Mg",
          position: [2.6, -1.25, 1.2] as [number, number, number],
          charge: "+",
        },
        {
          id: "X",
          symbol: "Br",
          position: [3.6, -0.7, 1.7] as [number, number, number],
          label: "X",
        },
      ],
      bonds: [
        {
          from: "C",
          to: "O",
        },
        {
          from: "C",
          to: "R",
        },
        {
          from: "C",
          to: "Rp",
        },
        {
          from: "C",
          to: "RGr",
        },
        {
          from: "RGr",
          to: "Mg",
          dashed: true,
        },
        {
          from: "Mg",
          to: "X",
        },
      ],
      arrows: [
        {
          from: [1.05, -0.55, 0.7],
          to: [0.15, 0, 0.05],
          color: colors.g,
        },
        {
          from: [0.75, 0.55, 0.05],
          to: [1.2, 0.78, 0.05],
          color: colors.g,
        },
      ],
    },

    {
      title: "Formation de l'alcoolate",
      caption:
        "L'addition donne un alcoolate: le carbone devient tétraédrique et l'oxygène porte une charge négative.",
      atoms: [
        {
          id: "C",
          symbol: "C",
          position: [0, 0, 0] as [number, number, number],
        },
        {
          id: "O",
          symbol: "O",
          position: [1.3, 0.8, 0] as [number, number, number],
          charge: "-",
        },
        {
          id: "R",
          symbol: "R",
          position: [-1.3, 0.6, 0.2] as [number, number, number],
          label: "R",
        },
        {
          id: "Rp",
          symbol: "R",
          position: [-0.3, -1.3, -0.2] as [number, number, number],
          label: "R′",
        },
        {
          id: "RGr",
          symbol: "R",
          position: [1.3, -0.8, 0.7] as [number, number, number],
          label: "R″",
        },
        {
          id: "Mg",
          symbol: "Mg",
          position: [2.7, 1.15, 0.4] as [number, number, number],
          charge: "+",
        },
        {
          id: "X",
          symbol: "Br",
          position: [3.7, 1.55, 0.8] as [number, number, number],
          label: "X",
        },
      ],
      bonds: [
        {
          from: "C",
          to: "O",
        },
        {
          from: "C",
          to: "R",
        },
        {
          from: "C",
          to: "Rp",
        },
        {
          from: "C",
          to: "RGr",
        },
        {
          from: "O",
          to: "Mg",
          dashed: true,
        },
        {
          from: "Mg",
          to: "X",
        },
      ],
    },

    {
      title: "Protonation de l'alcoolate",
      caption:
        "Lors du traitement acide, H₃O⁺ transfère un proton à l'oxygène O⁻.",
      atoms: [
        {
          id: "C",
          symbol: "C",
          position: [0, 0, 0] as [number, number, number],
        },
        {
          id: "O",
          symbol: "O",
          position: [1.3, 0.8, 0] as [number, number, number],
          charge: "-",
        },
        {
          id: "R",
          symbol: "R",
          position: [-1.3, 0.6, 0.2] as [number, number, number],
          label: "R",
        },
        {
          id: "Rp",
          symbol: "R",
          position: [-0.3, -1.3, -0.2] as [number, number, number],
          label: "R′",
        },
        {
          id: "RGr",
          symbol: "R",
          position: [1.3, -0.8, 0.7] as [number, number, number],
          label: "R″",
        },
        {
          id: "H3O",
          symbol: "O",
          position: [3.2, 1.0, 0.5] as [number, number, number],
          charge: "+",
          label: "H₃O⁺",
        },
        {
          id: "H",
          symbol: "H",
          position: [2.45, 1.05, 0.4] as [number, number, number],
        },
      ],
      bonds: [
        {
          from: "C",
          to: "O",
        },
        {
          from: "C",
          to: "R",
        },
        {
          from: "C",
          to: "Rp",
        },
        {
          from: "C",
          to: "RGr",
        },
        {
          from: "H3O",
          to: "H",
        },
      ],
      arrows: [
        {
          from: [2.4, 1.0, 0.4],
          to: [1.45, 0.85, 0.05],
          color: colors.g,
        },
      ],
    },

    {
      title: "Alcool tertiaire",
      caption:
        "Produit final: R₂C(OH)R″. Avec une cétone de départ, le produit est un alcool tertiaire.",
      atoms: [
        {
          id: "C",
          symbol: "C",
          position: [0, 0, 0] as [number, number, number],
        },
        {
          id: "O",
          symbol: "O",
          position: [1.3, 0.8, 0] as [number, number, number],
        },
        {
          id: "H",
          symbol: "H",
          position: [2.1, 1.1, 0.1] as [number, number, number],
        },
        {
          id: "R",
          symbol: "R",
          position: [-1.3, 0.6, 0.2] as [number, number, number],
          label: "R",
        },
        {
          id: "Rp",
          symbol: "R",
          position: [-0.3, -1.3, -0.2] as [number, number, number],
          label: "R′",
        },
        {
          id: "RGr",
          symbol: "R",
          position: [1.3, -0.8, 0.7] as [number, number, number],
          label: "R″",
        },
      ],
      bonds: [
        {
          from: "C",
          to: "O",
        },
        {
          from: "O",
          to: "H",
        },
        {
          from: "C",
          to: "R",
        },
        {
          from: "C",
          to: "Rp",
        },
        {
          from: "C",
          to: "RGr",
        },
      ],
    },
  ];
}

/* =========================================================
   HCN / FORMATION D'UNE CYANOHYDRINE
   ========================================================= */

function hcnSteps(): MoleculeStep[] {
  return [
    {
      title: "Formation de CN⁻",
      caption:
        "HCN peut fournir CN⁻ en présence d'une base; CN⁻ est le nucléophile qui attaque le carbonyle.",
      atoms: [
        ...carbonyl().atoms,
        {
          id: "CNc",
          symbol: "C",
          position: [3.4, -0.5, 0.6] as [number, number, number],
          charge: "-",
        },
        {
          id: "N",
          symbol: "N",
          position: [4.5, -0.5, 0.6] as [number, number, number],
        },
      ],
      bonds: [
        ...carbonyl().bonds,
        {
          from: "CNc",
          to: "N",
          order: 3,
        },
      ],
      arrows: [
        {
          from: [3.2, -0.45, 0.6],
          to: [0.2, 0, 0.05],
          color: colors.hcn,
        },
      ],
    },

    {
      title: "Addition nucléophile de CN⁻",
      caption:
        "CN⁻ attaque le carbone électrophile du carbonyle et la liaison π(C=O) se déplace vers l'oxygène.",
      atoms: [
        {
          id: "C",
          symbol: "C",
          position: [0, 0, 0] as [number, number, number],
        },
        {
          id: "O",
          symbol: "O",
          position: [1.3, 0.8, 0] as [number, number, number],
          charge: "-",
        },
        {
          id: "R",
          symbol: "R",
          position: [-1.3, 0.6, 0.2] as [number, number, number],
          label: "R",
        },
        {
          id: "Rp",
          symbol: "R",
          position: [-0.3, -1.3, -0.2] as [number, number, number],
          label: "R′",
        },
        {
          id: "CNc",
          symbol: "C",
          position: [1.3, -0.8, 0.7] as [number, number, number],
        },
        {
          id: "N",
          symbol: "N",
          position: [2.4, -0.8, 0.7] as [number, number, number],
        },
      ],
      bonds: [
        {
          from: "C",
          to: "O",
        },
        {
          from: "C",
          to: "R",
        },
        {
          from: "C",
          to: "Rp",
        },
        {
          from: "C",
          to: "CNc",
        },
        {
          from: "CNc",
          to: "N",
          order: 3,
        },
      ],
      arrows: [
        {
          from: [1.05, -0.55, 0.7],
          to: [0.15, 0, 0.05],
          color: colors.hcn,
        },
        {
          from: [0.75, 0.55, 0.05],
          to: [1.2, 0.78, 0.05],
          color: colors.hcn,
        },
      ],
    },

    {
      title: "Formation de l'alcoolate",
      caption:
        "L'intermédiaire tétraédrique possède un alcoolate O⁻ et un groupe nitrile C≡N.",
      atoms: [
        {
          id: "C",
          symbol: "C",
          position: [0, 0, 0] as [number, number, number],
        },
        {
          id: "O",
          symbol: "O",
          position: [1.3, 0.8, 0] as [number, number, number],
          charge: "-",
        },
        {
          id: "R",
          symbol: "R",
          position: [-1.3, 0.6, 0.2] as [number, number, number],
          label: "R",
        },
        {
          id: "Rp",
          symbol: "R",
          position: [-0.3, -1.3, -0.2] as [number, number, number],
          label: "R′",
        },
        {
          id: "CNc",
          symbol: "C",
          position: [1.3, -0.8, 0.7] as [number, number, number],
        },
        {
          id: "N",
          symbol: "N",
          position: [2.4, -0.8, 0.7] as [number, number, number],
        },
      ],
      bonds: [
        {
          from: "C",
          to: "O",
        },
        {
          from: "C",
          to: "R",
        },
        {
          from: "C",
          to: "Rp",
        },
        {
          from: "C",
          to: "CNc",
        },
        {
          from: "CNc",
          to: "N",
          order: 3,
        },
      ],
    },

    {
      title: "Protonation de l'alcoolate",
      caption:
        "O⁻ capte un proton de HCN ou d'une autre source protonique du milieu.",
      atoms: [
        {
          id: "C",
          symbol: "C",
          position: [0, 0, 0] as [number, number, number],
        },
        {
          id: "O",
          symbol: "O",
          position: [1.3, 0.8, 0] as [number, number, number],
        },
        {
          id: "H",
          symbol: "H",
          position: [2.1, 1.1, 0.1] as [number, number, number],
        },
        {
          id: "R",
          symbol: "R",
          position: [-1.3, 0.6, 0.2] as [number, number, number],
          label: "R",
        },
        {
          id: "Rp",
          symbol: "R",
          position: [-0.3, -1.3, -0.2] as [number, number, number],
          label: "R′",
        },
        {
          id: "CNc",
          symbol: "C",
          position: [1.3, -0.8, 0.7] as [number, number, number],
        },
        {
          id: "N",
          symbol: "N",
          position: [2.4, -0.8, 0.7] as [number, number, number],
        },
      ],
      bonds: [
        {
          from: "C",
          to: "O",
        },
        {
          from: "O",
          to: "H",
        },
        {
          from: "C",
          to: "R",
        },
        {
          from: "C",
          to: "Rp",
        },
        {
          from: "C",
          to: "CNc",
        },
        {
          from: "CNc",
          to: "N",
          order: 3,
        },
      ],
      arrows: [
        {
          from: [1.95, 1.0, 0.1],
          to: [1.45, 0.85, 0.05],
          color: colors.hcn,
        },
      ],
    },

    {
      title: "Cyanohydrine",
      caption:
        "Produit final: une cyanohydrine R₂C(OH)–C≡N.",
      atoms: [
        {
          id: "C",
          symbol: "C",
          position: [0, 0, 0] as [number, number, number],
        },
        {
          id: "O",
          symbol: "O",
          position: [1.3, 0.8, 0] as [number, number, number],
        },
        {
          id: "H",
          symbol: "H",
          position: [2.1, 1.1, 0.1] as [number, number, number],
        },
        {
          id: "R",
          symbol: "R",
          position: [-1.3, 0.6, 0.2] as [number, number, number],
          label: "R",
        },
        {
          id: "Rp",
          symbol: "R",
          position: [-0.3, -1.3, -0.2] as [number, number, number],
          label: "R′",
        },
        {
          id: "CNc",
          symbol: "C",
          position: [1.3, -0.8, 0.7] as [number, number, number],
        },
        {
          id: "N",
          symbol: "N",
          position: [2.4, -0.8, 0.7] as [number, number, number],
        },
      ],
      bonds: [
        {
          from: "C",
          to: "O",
        },
        {
          from: "O",
          to: "H",
        },
        {
          from: "C",
          to: "R",
        },
        {
          from: "C",
          to: "Rp",
        },
        {
          from: "C",
          to: "CNc",
        },
        {
          from: "CNc",
          to: "N",
          order: 3,
        },
      ],
    },
  ];
}

/* =========================================================
   EXPORT
   ========================================================= */

export const MOLECULE_STEPS: Record<ReactionId, MoleculeStep[]> = {
  hydratation: hydratationSteps(),
  amine: amineSteps(),
  alcool: acetalSteps(),
  grignard: grignardSteps(),
  hcn: hcnSteps(),
};
