```ts
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

const C = [
  {
    id: "C",
    symbol: "C",
    position: [0, 0, 0] as [number, number, number],
  },
];

const colors = {
  hyd: "#38bdf8",
  amine: "#a78bfa",
  alc: "#34d399",
  g: "#fb923c",
  hcn: "#facc15",
};

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
      { from: "C", to: "O", order: 2 as const },
      { from: "C", to: "R" },
      { from: "C", to: "Rp" },
    ],
  };
}

function tetra(extra: Atom3D[], extraBonds: Bond3D[] = []) {
  return {
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
      ...extra,
    ],
    bonds: [
      { from: "C", to: "O" },
      { from: "C", to: "R" },
      { from: "C", to: "Rp" },
      ...extraBonds,
    ],
  };
}

/* =========================================================
   HYDRATATION DU CARBONE CARBONYLÉ
   ========================================================= */

function hydratationSteps(): MoleculeStep[] {
  return [
    {
      title: "Protonation du carbonyle",
      caption:
        "H₃O⁺ transfère un proton à l’oxygène du carbonyle. Le carbone carbonylé devient plus électrophile.",
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
          charge: "+",
        },
        {
          id: "Hc",
          symbol: "H",
          position: [2.1, 1.35, 0.1] as [number, number, number],
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

        // Molécule d'eau / milieu protonique
        {
          id: "H2O",
          symbol: "O",
          position: [3.8, -0.2, 0.5] as [number, number, number],
          label: "H₂O",
        },
        {
          id: "H2O_H1",
          symbol: "H",
          position: [4.45, 0.35, 0.55] as [number, number, number],
        },
        {
          id: "H2O_H2",
          symbol: "H",
          position: [4.45, -0.7, 0.55] as [number, number, number],
        },
      ],
      bonds: [
        { from: "C", to: "O" },
        { from: "O", to: "Hc" },
        { from: "C", to: "R" },
        { from: "C", to: "Rp" },
        { from: "H2O", to: "H2O_H1" },
        { from: "H2O", to: "H2O_H2" },
      ],
      arrows: [
        {
          from: [1.05, 0.7, 0.05],
          to: [2.0, 1.25, 0.1],
          color: colors.hyd,
        },
      ],
    },

    {
      title: "Attaque de l’eau",
      caption:
        "H₂O attaque le carbone carbonylé. La liaison π(C=O) se déplace vers l’oxygène du carbonyle.",
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
        },
        {
          id: "Hc",
          symbol: "H",
          position: [2.1, 1.35, 0.1] as [number, number, number],
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

        // Eau nucléophile
        {
          id: "Ow",
          symbol: "O",
          position: [1.25, -0.85, 0.7] as [number, number, number],
          charge: "+",
        },
        {
          id: "Hw1",
          symbol: "H",
          position: [2.1, -0.55, 0.9] as [number, number, number],
        },
        {
          id: "Hw2",
          symbol: "H",
          position: [1.05, -1.65, 0.9] as [number, number, number],
        },
      ],
      bonds: [
        { from: "C", to: "O" },
        { from: "O", to: "Hc" },
        { from: "C", to: "R" },
        { from: "C", to: "Rp" },
        { from: "C", to: "Ow" },
        { from: "Ow", to: "Hw1" },
        { from: "Ow", to: "Hw2" },
      ],
      arrows: [
        {
          from: [1.05, -0.65, 0.7],
          to: [0.2, 0, 0.1],
          color: colors.hyd,
        },
        {
          from: [0.75, 0.55, 0.05],
          to: [1.2, 0.82, 0.05],
          color: colors.hyd,
        },
      ],
    },

    {
      title: "Déprotonation",
      caption:
        "Une molécule d’eau retire un proton du groupe OH₂⁺. Le gem-diol neutre se forme et H₃O⁺ est régénéré.",
      atoms: [
        {
          id: "C",
          symbol: "C",
          position: [0, 0, 0] as [number, number, number],
        },
        {
          id: "O1",
          symbol: "O",
          position: [1.25, 0.9, 0] as [number, number, number],
        },
        {
          id: "H1",
          symbol: "H",
          position: [2.1, 1.25, 0.1] as [number, number, number],
        },
        {
          id: "O2",
          symbol: "O",
          position: [1.25, -0.85, 0.6] as [number, number, number],
        },
        {
          id: "H2",
          symbol: "H",
          position: [2.1, -1.15, 0.75] as [number, number, number],
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

        // H₃O⁺ régénéré
        {
          id: "Hydronium",
          symbol: "O",
          position: [4.0, -0.3, 0.5] as [number, number, number],
          charge: "+",
          label: "H₃O⁺",
        },
        {
          id: "H3_1",
          symbol: "H",
          position: [4.75, 0.25, 0.55] as [number, number, number],
        },
        {
          id: "H3_2",
          symbol: "H",
          position: [4.75, -0.85, 0.55] as [number, number, number],
        },
        {
          id: "H3_3",
          symbol: "H",
          position: [3.95, -0.3, 1.35] as [number, number, number],
        },
      ],
      bonds: [
        { from: "C", to: "O1" },
        { from: "O1", to: "H1" },
        { from: "C", to: "O2" },
        { from: "O2", to: "H2" },
        { from: "C", to: "R" },
        { from: "C", to: "Rp" },

        { from: "Hydronium", to: "H3_1" },
        { from: "Hydronium", to: "H3_2" },
        { from: "Hydronium", to: "H3_3" },
      ],
      arrows: [
        {
          from: [3.65, -0.25, 0.5],
          to: [2.0, -1.05, 0.7],
          color: colors.hyd,
        },
      ],
    },

    {
      title: "Gem-diol",
      caption:
        "Produit final : R₂C(OH)₂. L’hydratation du carbonyle est un équilibre réversible.",
      atoms: [
        {
          id: "C",
          symbol: "C",
          position: [0, 0, 0] as [number, number, number],
        },
        {
          id: "O1",
          symbol: "O",
          position: [1.25, 0.9, 0] as [number, number, number],
        },
        {
          id: "H1",
          symbol: "H",
          position: [2.1, 1.2, 0.1] as [number, number, number],
        },
        {
          id: "O2",
          symbol: "O",
          position: [1.25, -0.85, 0.6] as [number, number, number],
        },
        {
          id: "H2",
          symbol: "H",
          position: [2.1, -1.1, 0.7] as [number, number, number],
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
        { from: "C", to: "O1" },
        { from: "O1", to: "H1" },
        { from: "C", to: "O2" },
        { from: "O2", to: "H2" },
        { from: "C", to: "R" },
        { from: "C", to: "Rp" },
      ],
    },
  ];
}

/* =========================================================
   ADDITION D'UNE AMINE — FORMATION D'UNE IMINE
   ========================================================= */

function amineSteps(): MoleculeStep[] {
  const base = (charged = false) => [
    {
      id: "C",
      symbol: "C",
      position: [0, 0, 0] as [number, number, number],
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
      position: [1.3, -0.7, 0.7] as [number, number, number],
      charge: charged ? "+" : undefined,
    },
    {
      id: "Rn",
      symbol: "R",
      position: [2.3, -0.7, 1.4] as [number, number, number],
      label: "R″",
    },
    {
      id: "Hn",
      symbol: "H",
      position: [1.4, -1.5, 0.9] as [number, number, number],
    },
  ];

  return [
    {
      title: "Addition nucléophile",
      caption:
        "R″NH₂ attaque le carbone du carbonyle; π(C=O) se déplace vers O.",
      atoms: [
        ...carbonyl().atoms,
        {
          id: "N",
          symbol: "N",
          position: [1.4, -0.7, 0.7] as [number, number, number],
        },
        {
          id: "Hn1",
          symbol: "H",
          position: [2.1, -0.7, 1.3] as [number, number, number],
        },
        {
          id: "Hn2",
          symbol: "H",
          position: [1.3, -1.5, 0.8] as [number, number, number],
        },
        {
          id: "Rn",
          symbol: "R",
          position: [2.1, -0.7, 0] as [number, number, number],
          label: "R″",
        },
      ],
      bonds: [
        ...carbonyl().bonds,
        { from: "C", to: "N" },
        { from: "N", to: "Hn1" },
        { from: "N", to: "Hn2" },
        { from: "N", to: "Rn" },
      ],
      arrows: [
        {
          from: [1.1, -0.5, 0.7],
          to: [0.2, 0, 0.1],
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
      caption: "Après transferts de protons: R₂C(OH)-NHR″.",
      atoms: [
        ...base(),
        {
          id: "O",
          symbol: "O",
          position: [1.35, 0.9, 0] as [number, number, number],
        },
      ],
      bonds: [
        { from: "C", to: "O" },
        { from: "C", to: "R" },
        { from: "C", to: "Rp" },
        { from: "C", to: "N" },
        { from: "N", to: "Rn" },
        { from: "N", to: "Hn" },
        { from: "O", to: "Hn" },
      ],
    },

    {
      title: "OH protoné",
      caption: "Le OH devient OH₂⁺, un bon groupe partant.",
      atoms: [
        ...base(true),
        {
          id: "O",
          symbol: "O",
          position: [1.35, 0.9, 0] as [number, number, number],
          charge: "+",
        },
        {
          id: "Ho",
          symbol: "H",
          position: [2.1, 1.2, 0.1] as [number, number, number],
        },
      ],
      bonds: [
        { from: "C", to: "O" },
        { from: "C", to: "R" },
        { from: "C", to: "Rp" },
        { from: "C", to: "N" },
        { from: "N", to: "Rn" },
        { from: "N", to: "Hn" },
        { from: "O", to: "Ho" },
      ],
    },

    {
      title: "Élimination de l'eau",
      caption:
        "Le doublet de N forme C=N; la liaison C–OH₂ se rompt vers O.",
      atoms: [
        {
          id: "C",
          symbol: "C",
          position: [0, 0, 0] as [number, number, number],
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
          position: [1.35, 0.9, 0] as [number, number, number],
          charge: "+",
        },
        {
          id: "Rn",
          symbol: "R",
          position: [2.35, 1.25, 0.1] as [number, number, number],
          label: "R″",
        },
        {
          id: "H2O",
          symbol: "O",
          position: [2.5, -0.8, 0.6] as [number, number, number],
          label: "H₂O",
        },
      ],
      bonds: [
        { from: "C", to: "R" },
        { from: "C", to: "Rp" },
        { from: "C", to: "N", order: 2 },
        { from: "N", to: "Rn" },
      ],
      arrows: [
        {
          from: [1.05, 0.75, 0.05],
          to: [0.35, 0.05, 0.05],
          color: colors.amine,
        },
        {
          from: [0.75, 0.55, 0.05],
          to: [2.2, -0.65, 0.5],
          color: colors.amine,
        },
      ],
    },

    {
      title: "Imine",
      caption: "Déprotonation de l'ion iminium: R₂C=NR″.",
      atoms: [
        {
          id: "C",
          symbol: "C",
          position: [0, 0, 0] as [number, number, number],
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
          position: [1.35, 0.9, 0] as [number, number, number],
        },
        {
          id: "Rn",
          symbol: "R",
          position: [2.35, 1.25, 0.1] as [number, number, number],
          label: "R″",
        },
      ],
      bonds: [
        { from: "C", to: "R" },
        { from: "C", to: "Rp" },
        { from: "C", to: "N", order: 2 },
        { from: "N", to: "Rn" },
      ],
    },
  ];
}

/* =========================================================
   FORMATION D'UN ACÉTAL
   ========================================================= */

function acetalSteps(): MoleculeStep[] {
  const base = (stage: "hemi" | "ox" | "final") => {
    const atoms: Atom3D[] = [
      {
        id: "C",
        symbol: "C",
        position: [0, 0, 0] as [number, number, number],
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
    ];

    const bonds: Bond3D[] = [
      { from: "C", to: "R" },
      { from: "C", to: "Rp" },
    ];

    if (stage !== "final") {
      atoms.push(
        {
          id: "O1",
          symbol: "O",
          position: [1.3, 0.8, 0] as [number, number, number],
        },
        {
          id: "R1",
          symbol: "R",
          position: [2.2, 1.2, 0.1] as [number, number, number],
          label: "R′",
        },
      );

      bonds.push(
        { from: "C", to: "O1" },
        { from: "O1", to: "R1" },
      );
    } else {
      atoms.push(
        {
          id: "O1",
          symbol: "O",
          position: [1.3, 0.8, 0] as [number, number, number],
        },
        {
          id: "O2",
          symbol: "O",
          position: [1.3, -0.8, 0.4] as [number, number, number],
        },
        {
          id: "R1",
          symbol: "R",
          position: [2.2, 1.2, 0.1] as [number, number, number],
          label: "R′",
        },
        {
          id: "R2",
          symbol: "R",
          position: [2.2, -1.2, 0.5] as [number, number, number],
          label: "R′",
        },
      );

      bonds.push(
        { from: "C", to: "O1" },
        { from: "O1", to: "R1" },
        { from: "C", to: "O2" },
        { from: "O2", to: "R2" },
      );
    }

    return { atoms, bonds };
  };

  return [
    {
      title: "Protonation",
      caption: "H⁺ active l'oxygène carbonylé.",
      atoms: carbonyl().atoms,
      bonds: carbonyl().bonds,
      arrows: [
        {
          from: [1.1, 0.7, 0.05],
          to: [3, 0.2, 0.2],
          color: colors.alc,
        },
      ],
    },

    {
      title: "Addition du premier alcool",
      caption:
        "R′OH attaque le carbone; π(C=O) va vers O.",
      ...tetra(
        [
          {
            id: "ORH",
            symbol: "O",
            position: [1.25, -0.8, 0.7] as [number, number, number],
            charge: "+",
          },
          {
            id: "R1",
            symbol: "R",
            position: [2.25, -0.8, 1.2] as [number, number, number],
            label: "R′",
          },
        ],
        [
          { from: "C", to: "ORH" },
          { from: "ORH", to: "R1" },
        ],
      ),
      arrows: [
        {
          from: [1.05, -0.55, 0.7],
          to: [0.2, 0, 0.1],
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
      caption: "Déprotonation donne l'hémiacétal neutre.",
      ...base("hemi"),
    },

    {
      title: "Protonation du OH",
      caption:
        "Le OH devient OH₂⁺ et pourra partir sous forme d'eau.",
      atoms: [
        ...base("hemi").atoms.map((a) =>
          a.id === "O1" ? { ...a, charge: "+" } : a,
        ),
        {
          id: "H",
          symbol: "H",
          position: [2.0, 0.3, 0.2] as [number, number, number],
        },
      ],
      bonds: [
        ...base("hemi").bonds,
        { from: "O1", to: "H" },
      ],
      arrows: [
        {
          from: [2.2, 0.9, 0.2],
          to: [1.6, 0.75, 0.1],
          color: colors.alc,
        },
      ],
    },

    {
      title: "Départ de l'eau",
      caption:
        "Le doublet de OR′ forme C=O pendant que H₂O part; oxonium formé.",
      atoms: [
        {
          id: "C",
          symbol: "C",
          position: [0, 0, 0] as [number, number, number],
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
          id: "O1",
          symbol: "O",
          position: [1.3, -0.8, 0.3] as [number, number, number],
          charge: "+",
        },
        {
          id: "R1",
          symbol: "R",
          position: [2.2, -1.2, 0.6] as [number, number, number],
          label: "R′",
        },
      ],
      bonds: [
        { from: "C", to: "R" },
        { from: "C", to: "Rp" },
        { from: "C", to: "O1" },
        { from: "O1", to: "R1" },
      ],
      arrows: [
        {
          from: [1.05, -0.6, 0.25],
          to: [0.3, 0, 0.05],
          color: colors.alc,
        },
      ],
    },

    {
      title: "Addition du second alcool",
      caption:
        "Un second R′OH attaque l'oxonium pour former un acétal protoné.",
      ...base("ox"),
      arrows: [
        {
          from: [3.1, 0.4, 0.5],
          to: [0.2, 0, 0.1],
          color: colors.alc,
        },
      ],
    },

    {
      title: "Acétal",
      caption: "Déprotonation finale: R₂C(OR′)₂.",
      ...base("final"),
    },
  ];
}

/* =========================================================
   RÉACTION DE GRIGNARD
   ========================================================= */

function grignardSteps(): MoleculeStep[] {
  return [
    {
      title: "Grignard polarisé",
      caption:
        "R″–MgX est fortement polarisé; le carbone R″ est nucléophile.",
      atoms: [
        ...carbonyl().atoms,
        {
          id: "Cg",
          symbol: "C",
          position: [3.5, -0.4, 0.5] as [number, number, number],
          charge: "δ-",
          label: "R″",
        },
        {
          id: "Mg",
          symbol: "Mg",
          position: [4.6, 0, 0.6] as [number, number, number],
          charge: "δ+",
        },
        {
          id: "X",
          symbol: "Br",
          position: [5.5, 0.5, 0.8] as [number, number, number],
        },
      ],
      bonds: [
        ...carbonyl().bonds,
        { from: "Cg", to: "Mg" },
        { from: "Mg", to: "X" },
      ],
      arrows: [
        {
          from: [3.3, -0.3, 0.5],
          to: [0.2, 0, 0.1],
          color: colors.g,
        },
      ],
    },

    {
      title: "Addition C–C",
      caption:
        "R″ attaque C=O et π(C=O) se déplace vers O.",
      ...tetra(
        [
          {
            id: "Cg",
            symbol: "C",
            position: [1.3, -0.7, 0.7] as [number, number, number],
            label: "R″",
          },
          {
            id: "Mg",
            symbol: "Mg",
            position: [2.6, -1.2, 1.2] as [number, number, number],
            charge: "+",
          },
          {
            id: "X",
            symbol: "Br",
            position: [3.6, -0.7, 1.8] as [number, number, number],
          },
        ],
        [
          { from: "C", to: "Cg" },
          { from: "Cg", to: "Mg", dashed: true },
          { from: "Mg", to: "X" },
        ],
      ),
      arrows: [
        {
          from: [1.1, -0.55, 0.7],
          to: [0.2, 0, 0.1],
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
      title: "Alcoolate",
      caption:
        "Intermédiaire tétraédrique associé à MgX⁺.",
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
          id: "R2",
          symbol: "R",
          position: [1.3, -0.8, 0.7] as [number, number, number],
          label: "R″",
        },
        {
          id: "MgX",
          symbol: "Mg",
          position: [2.6, 1.2, 0.4] as [number, number, number],
          charge: "+",
          label: "MgX⁺",
        },
      ],
      bonds: [
        { from: "C", to: "O" },
        { from: "C", to: "R" },
        { from: "C", to: "Rp" },
        { from: "C", to: "R2" },
        { from: "O", to: "MgX", dashed: true },
      ],
    },

    {
      title: "Work-up acide",
      caption:
        "H₃O⁺ protonne l’alcoolate pour donner l’alcool.",
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
          id: "R2",
          symbol: "R",
          position: [1.3, -0.8, 0.7] as [number, number, number],
          label: "R″",
        },
      ],
      bonds: [
        { from: "C", to: "O" },
        { from: "O", to: "H" },
        { from: "C", to: "R" },
        { from: "C", to: "Rp" },
        { from: "C", to: "R2" },
      ],
    },
  ];
}

/* =========================================================
   ADDITION DE HCN
   ========================================================= */

function hcnSteps(): MoleculeStep[] {
  return [
    {
      title: "Addition de CN⁻",
      caption:
        "Le carbone de CN⁻ attaque le carbone carbonylé; π(C=O) va vers O.",
      atoms: [
        ...carbonyl().atoms,
        {
          id: "CNc",
          symbol: "C",
          position: [3.4, -0.5, 0.6] as [number, number, number],
          charge: "-",
          label: "CN",
        },
        {
          id: "N",
          symbol: "N",
          position: [4.5, -0.5, 0.6] as [number, number, number],
        },
      ],
      bonds: [
        ...carbonyl().bonds,
        { from: "CNc", to: "N", order: 3 },
      ],
      arrows: [
        {
          from: [3.2, -0.4, 0.6],
          to: [0.2, 0, 0.1],
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
      title: "Alcoolate",
      caption:
        "Le carbone carbonylé devient sp³; O⁻ et CN sont sur le même carbone central.",
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
          label: "CN",
        },
        {
          id: "N",
          symbol: "N",
          position: [2.4, -0.8, 0.7] as [number, number, number],
        },
      ],
      bonds: [
        { from: "C", to: "O" },
        { from: "C", to: "R" },
        { from: "C", to: "Rp" },
        { from: "C", to: "CNc" },
        { from: "CNc", to: "N", order: 3 },
      ],
    },

    {
      title: "Protonation",
      caption:
        "O⁻ capte un proton provenant de HCN ou d'une source protonique compatible.",
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
          label: "CN",
        },
        {
          id: "N",
          symbol: "N",
          position: [2.4, -0.8, 0.7] as [number, number, number],
        },
      ],
      bonds: [
        { from: "C", to: "O" },
        { from: "O", to: "H" },
        { from: "C", to: "R" },
        { from: "C", to: "Rp" },
        { from: "C", to: "CNc" },
        { from: "CNc", to: "N", order: 3 },
      ],
      arrows: [
        {
          from: [1.8, 1, 0.1],
          to: [1.35, 0.85, 0.05],
          color: colors.hcn,
        },
      ],
    },
  ];
}

/* =========================================================
   EXPORT GLOBAL
   ========================================================= */

export const MOLECULE_STEPS: Record<ReactionId, MoleculeStep[]> = {
  hydratation: hydratationSteps(),
  amine: amineSteps(),
  alcool: acetalSteps(),
  grignard: grignardSteps(),
  hcn: hcnSteps(),
};
```
