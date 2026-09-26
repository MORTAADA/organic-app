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

const colors = {
  hyd: "#38bdf8",
  amine: "#a78bfa",
  alc: "#34d399",
  g: "#fb923c",
  hcn: "#facc15",
};

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

/* ============================================================
   HYDRATATION DU CARBONE CARBONYLÉ
   ============================================================ */

function hydratationSteps(): MoleculeStep[] {
  return [
    {
      title: "Protonation du carbonyle",
      caption:
        "H₃O⁺ protonne l'oxygène du carbonyle; le carbone devient plus électrophile.",
      atoms: [
        ...carbonyl().atoms,
        {
          id: "H3O",
          symbol: "O",
          position: [3.5, -0.3, 0.5] as [number, number, number],
          charge: "+",
        },
        {
          id: "H",
          symbol: "H",
          position: [4.2, 0.2, 0.5] as [number, number, number],
        },
      ],
      bonds: [
        ...carbonyl().bonds,
        { from: "H3O", to: "H" },
      ],
      arrows: [
        {
          from: [1.1, 0.7, 0.05],
          to: [3.2, -0.15, 0.4],
          color: colors.hyd,
        },
      ],
    },

    {
      title: "Attaque de l'eau",
      caption:
        "H₂O attaque C; simultanément π(C=O) se déplace vers O.",
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
          position: [1.3, -0.8, 0.7] as [number, number, number],
          charge: "+",
        },
        {
          id: "Hw",
          symbol: "H",
          position: [2.2, -0.5, 0.9] as [number, number, number],
        },
      ],
      bonds: [
        { from: "C", to: "O" },
        { from: "C", to: "R" },
        { from: "C", to: "Rp" },
        { from: "C", to: "Ow" },
        { from: "Ow", to: "Hw" },
      ],
      arrows: [
        {
          from: [1.05, -0.55, 0.7],
          to: [0.2, 0, 0.1],
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
        "Une base du milieu retire le proton du groupe OH₂⁺; H₃O⁺ est régénéré.",
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
          position: [1.3, -0.8, 0.7] as [number, number, number],
          charge: "+",
        },
        {
          id: "Hw",
          symbol: "H",
          position: [2.2, -0.5, 0.9] as [number, number, number],
        },
        {
          id: "Base",
          symbol: "O",
          position: [4, -0.4, 0.5] as [number, number, number],
          label: "H₂O",
        },
      ],
      bonds: [
        { from: "C", to: "O" },
        { from: "C", to: "R" },
        { from: "C", to: "Rp" },
        { from: "C", to: "Ow" },
        { from: "Ow", to: "Hw" },
      ],
      arrows: [
        {
          from: [3.7, -0.25, 0.5],
          to: [2.25, -0.45, 0.8],
          color: colors.hyd,
        },
        {
          from: [2.05, -0.55, 0.85],
          to: [1.5, -0.7, 0.7],
          color: colors.hyd,
        },
      ],
    },

    {
      title: "Gem-diol",
      caption:
        "Produit final: R₂C(OH)₂; l'hydratation reste un équilibre réversible.",
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

/* ============================================================
   ADDITION D'UNE AMINE — FORMATION D'UNE IMINE
   ============================================================ */

function amineSteps(): MoleculeStep[] {
  return [
    /* ---------------------------------------------------------
       1 — Carbonyle + amine
       --------------------------------------------------------- */
    {
      title: "1. Carbonyle + amine",
      caption:
        "Le carbone du carbonyle est électrophile. Le doublet libre de l'amine peut l'attaquer.",
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

        {
          id: "N",
          symbol: "N",
          position: [3.0, 0, 0] as [number, number, number],
        },
        {
          id: "N-H1",
          symbol: "H",
          position: [3.5, 0.75, 0] as [number, number, number],
        },
        {
          id: "N-H2",
          symbol: "H",
          position: [3.5, -0.75, 0] as [number, number, number],
        },
        {
          id: "N-R",
          symbol: "R",
          position: [4.2, 0, 0] as [number, number, number],
          label: "R″",
        },
      ],
      bonds: [
        { from: "C", to: "O", order: 2 },
        { from: "C", to: "R" },
        { from: "C", to: "Rp" },

        { from: "N", to: "N-H1" },
        { from: "N", to: "N-H2" },
        { from: "N", to: "N-R" },
      ],
      arrows: [
        {
          from: [2.6, 0, 0],
          to: [0.45, 0, 0],
          color: colors.amine,
        },
        {
          from: [0.9, 0.45, 0],
          to: [1.35, 0.9, 0],
          color: colors.amine,
        },
      ],
    },

    /* ---------------------------------------------------------
       2 — Addition nucléophile
       --------------------------------------------------------- */
    {
      title: "2. Attaque nucléophile",
      caption:
        "L'amine forme une liaison C–N tandis que le doublet π du carbonyle se déplace vers l'oxygène.",
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

        {
          id: "N",
          symbol: "N",
          position: [1.35, -0.85, 0] as [number, number, number],
          charge: "+",
        },
        {
          id: "N-H1",
          symbol: "H",
          position: [2.1, -1.45, 0] as [number, number, number],
        },
        {
          id: "N-H2",
          symbol: "H",
          position: [2.2, -0.25, 0] as [number, number, number],
        },
        {
          id: "N-R",
          symbol: "R",
          position: [2.75, -0.9, 0] as [number, number, number],
          label: "R″",
        },
      ],
      bonds: [
        { from: "C", to: "O" },
        { from: "C", to: "R" },
        { from: "C", to: "Rp" },
        { from: "C", to: "N" },

        { from: "N", to: "N-H1" },
        { from: "N", to: "N-H2" },
        { from: "N", to: "N-R" },
      ],
      arrows: [
        {
          from: [2.1, -0.65, 0],
          to: [0.35, -0.1, 0],
          color: colors.amine,
        },
      ],
    },

    /* ---------------------------------------------------------
       3 — Carbinolamine
       --------------------------------------------------------- */
    {
      title: "3. Carbinolamine",
      caption:
        "Après transfert de proton, on obtient une carbinolamine R₂C(OH)–NHR″.",
      atoms: [
        {
          id: "C",
          symbol: "C",
          position: [0, 0, 0] as [number, number, number],
        },
        {
          id: "O",
          symbol: "O",
          position: [1.25, 0.9, 0] as [number, number, number],
        },
        {
          id: "O-H",
          symbol: "H",
          position: [2.05, 1.2, 0.1] as [number, number, number],
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
          position: [1.4, -0.9, 0] as [number, number, number],
        },
        {
          id: "N-H",
          symbol: "H",
          position: [2.15, -1.45, 0] as [number, number, number],
        },
        {
          id: "N-R",
          symbol: "R",
          position: [2.8, -0.8, 0] as [number, number, number],
          label: "R″",
        },
      ],
      bonds: [
        { from: "C", to: "O" },
        { from: "O", to: "O-H" },

        { from: "C", to: "N" },
        { from: "N", to: "N-H" },
        { from: "N", to: "N-R" },

        { from: "C", to: "R" },
        { from: "C", to: "Rp" },
      ],
      arrows: [
        {
          from: [2.0, -0.75, 0],
          to: [1.2, 0, 0],
          color: colors.amine,
        },
      ],
    },

    /* ---------------------------------------------------------
       4 — Protonation du OH
       --------------------------------------------------------- */
    {
      title: "4. Protonation du OH",
      caption:
        "Le groupe OH est protoné afin de devenir un bon groupe partant sous forme d'eau.",
      atoms: [
        {
          id: "C",
          symbol: "C",
          position: [0, 0, 0] as [number, number, number],
        },
        {
          id: "O",
          symbol: "O",
          position: [1.25, 0.9, 0] as [number, number, number],
          charge: "+",
        },
        {
          id: "OH-H1",
          symbol: "H",
          position: [2.0, 1.3, 0.1] as [number, number, number],
        },
        {
          id: "OH-H2",
          symbol: "H",
          position: [0.75, 1.65, 0] as [number, number, number],
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
          position: [1.4, -0.9, 0] as [number, number, number],
        },
        {
          id: "N-H",
          symbol: "H",
          position: [2.15, -1.45, 0] as [number, number, number],
        },
        {
          id: "N-R",
          symbol: "R",
          position: [2.8, -0.8, 0] as [number, number, number],
          label: "R″",
        },
      ],
      bonds: [
        { from: "C", to: "O" },
        { from: "O", to: "OH-H1" },
        { from: "O", to: "OH-H2" },

        { from: "C", to: "N" },
        { from: "N", to: "N-H" },
        { from: "N", to: "N-R" },

        { from: "C", to: "R" },
        { from: "C", to: "Rp" },
      ],
      arrows: [
        {
          from: [0.8, 1.8, 0],
          to: [1.25, 1.05, 0],
          color: colors.amine,
        },
      ],
    },

    /* ---------------------------------------------------------
       5 — Départ de l'eau / ion iminium
       --------------------------------------------------------- */
    {
      title: "5. Élimination de H₂O",
      caption:
        "L'eau quitte le carbone et le doublet de l'azote forme la liaison π C=N. On obtient un ion iminium.",
      atoms: [
        {
          id: "C",
          symbol: "C",
          position: [0, 0, 0] as [number, number, number],
        },
        {
          id: "N",
          symbol: "N",
          position: [1.4, 0, 0] as [number, number, number],
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
          id: "N-R",
          symbol: "R",
          position: [2.3, -0.75, 0] as [number, number, number],
          label: "R″",
        },
        {
          id: "N-H",
          symbol: "H",
          position: [2.1, 0.8, 0] as [number, number, number],
        },

        {
          id: "H2O",
          symbol: "O",
          position: [3.0, 1.8, 0] as [number, number, number],
          label: "H₂O",
        },
      ],
      bonds: [
        { from: "C", to: "N", order: 2 },
        { from: "C", to: "R" },
        { from: "C", to: "Rp" },

        { from: "N", to: "N-R" },
        { from: "N", to: "N-H" },
      ],
      arrows: [
        {
          from: [1.15, 0.05, 0],
          to: [0.4, 0.05, 0],
          color: colors.amine,
        },
        {
          from: [1.0, 0.6, 0],
          to: [2.55, 1.45, 0],
          color: colors.amine,
        },
      ],
    },

    /* ---------------------------------------------------------
       6 — Imine finale
       --------------------------------------------------------- */
    {
      title: "6. Formation de l'imine",
      caption:
        "Après déprotonation de l'ion iminium, on obtient l'imine finale R₂C=NR″.",
      atoms: [
        {
          id: "C",
          symbol: "C",
          position: [0, 0, 0] as [number, number, number],
        },
        {
          id: "N",
          symbol: "N",
          position: [1.4, 0, 0] as [number, number, number],
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
          id: "N-R",
          symbol: "R",
          position: [2.35, -0.75, 0] as [number, number, number],
          label: "R″",
        },
      ],
      bonds: [
        { from: "C", to: "N", order: 2 },
        { from: "C", to: "R" },
        { from: "C", to: "Rp" },
        { from: "N", to: "N-R" },
      ],
    },
  ];
}

/* ============================================================
   ACÉTALISATION
   ============================================================ */

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
      caption:
        "Déprotonation donne l'hémiacétal neutre.",
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
      caption:
        "Déprotonation finale: R₂C(OR′)₂.",
      ...base("final"),
    },
  ];
}

/* ============================================================
   GRIGNARD
   ============================================================ */

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
        "H₃O⁺ protonne l'alcoolate pour donner l'alcool.",
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

/* ============================================================
   HCN / CYANOHYDRINE
   ============================================================ */

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

/* ============================================================
   EXPORT
   ============================================================ */

export const MOLECULE_STEPS: Record<ReactionId, MoleculeStep[]> = {
  hydratation: hydratationSteps(),
  amine: amineSteps(),
  alcool: acetalSteps(),
  grignard: grignardSteps(),
  hcn: hcnSteps(),
};
