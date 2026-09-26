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
      ...extraBonds,
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
        {
          from: "H3O",
          to: "H",
        },
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
        "H₂O attaque le carbone électrophile; simultanément la liaison π(C=O) se déplace vers O.",
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
        {
          from: "Ow",
          to: "Hw",
        },
      ],
      arrows: [
        {
          from: [1.1, -0.55, 0.7],
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
        {
          from: "Ow",
          to: "Hw",
        },
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
  const base = (charged = false): Atom3D[] => [
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
        {
          from: "C",
          to: "N",
        },
        {
          from: "N",
          to: "Hn1",
        },
        {
          from: "N",
          to: "Hn2",
        },
        {
          from: "N",
          to: "Rn",
        },
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
          to: "Rn",
        },
        {
          from: "N",
          to: "Hn",
        },
        {
          from: "O",
          to: "Hn",
        },
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
          to: "Rn",
        },
        {
          from: "N",
          to: "Hn",
        },
        {
          from: "O",
          to: "Ho",
        },
      ],
    },

    {
      title: "Élimination de l'eau",
      caption:
        "Le doublet de N forme C=N; la molécule d'eau quitte le carbone.",
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
          order: 2,
        },
        {
          from: "N",
          to: "Rn",
        },
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
          order: 2,
        },
        {
          from: "N",
          to: "Rn",
        },
      ],
    },
  ];
}

/* =========================================================
   ACETAL
   ========================================================= */

function acetalSteps(): MoleculeStep[] {
  const base = (stage: "hemi" | "final") => {
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
      {
        from: "C",
        to: "R",
      },
      {
        from: "C",
        to: "Rp",
      },
    ];

    if (stage === "hemi") {
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
        }
      );

      bonds.push(
        {
          from: "C",
          to: "O1",
        },
        {
          from: "O1",
          to: "R1",
        }
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
        }
      );

      bonds.push(
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
        }
      );
    }

    return {
      atoms,
      bonds,
    };
  };

  return [
    {
      title: "Protonation",
      caption: "H⁺ active l'oxygène du carbonyle.",
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
        "R′OH attaque le carbone du carbonyle; π(C=O) se déplace vers O.",
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
          {
            from: "C",
            to: "ORH",
          },
          {
            from: "ORH",
            to: "R1",
          },
        ]
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
        ...base("hemi").atoms.map((atom) =>
          atom.id === "O1"
            ? {
                ...atom,
                charge: "+",
              }
            : atom
        ),
        {
          id: "H",
          symbol: "H",
          position: [2.0, 0.3, 0.2] as [number, number, number],
        },
      ],
      bonds: [
        ...base("hemi").bonds,
        {
          from: "O1",
          to: "H",
        },
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
        "L'oxygène du groupe OR′ forme une liaison π avec le carbone; l'eau quitte.",
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
      ...base("hemi"),
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
   GRIGNARD
   ========================================================= */

function grignardSteps(): MoleculeStep[] {
  return [
    {
      title: "Réactif de Grignard polarisé",
      caption:
        "La liaison C–Mg est fortement polarisée: le carbone de R″–MgX porte un caractère nucléophile δ−.",
      atoms: [
        ...carbonyl().atoms,
        {
          id: "CGr",
          symbol: "C",
          position: [3.5, -0.4, 0.5] as [number, number, number],
          charge: "δ-",
          label: "R″",
        },
        {
          id: "Mg",
          symbol: "Mg",
          position: [4.7, 0.1, 0.6] as [number, number, number],
          charge: "δ+",
        },
        {
          id: "X",
          symbol: "Br",
          position: [5.7, 0.7, 0.8] as [number, number, number],
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
          from: [3.25, -0.3, 0.5],
          to: [0.25, 0, 0.05],
          color: colors.g,
        },
      ],
    },

    {
      title: "Attaque nucléophile du Grignard",
      caption:
        "Le carbone nucléophile R″ attaque le carbone du carbonyle; simultanément π(C=O) se déplace vers l'oxygène.",
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
          id: "CGr",
          symbol: "C",
          position: [1.25, -0.8, 0.7] as [number, number, number],
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
          position: [3.65, -0.7, 1.75] as [number, number, number],
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
          to: "CGr",
        },
        {
          from: "CGr",
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
          to: [0.15, 0, 0.1],
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
        "Après l'attaque, le carbone central est tétraédrique et l'oxygène porte une charge négative; MgX⁺ est associé à O⁻.",
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
          position: [2.6, 1.2, 0.4] as [number, number, number],
          charge: "+",
        },
        {
          id: "X",
          symbol: "Br",
          position: [3.65, 1.55, 0.8] as [number, number, number],
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
        "Lors du work-up acide, H₃O⁺ fournit un proton à l'oxygène O⁻.",
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
          position: [3.3, 1.0, 0.5] as [number, number, number],
          charge: "+",
          label: "H₃O⁺",
        },
        {
          id: "H",
          symbol: "H",
          position: [2.55, 1.15, 0.4] as [number, number, number],
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
          from: [2.55, 1.05, 0.4],
          to: [1.5, 0.85, 0.1],
          color: colors.g,
        },
      ],
    },

    {
      title: "Alcool final",
      caption:
        "Après protonation: R₂C(OH)R″. Avec une cétone de départ, le produit est un alcool tertiaire.",
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
   HCN / CYANOHYDRINE
   ========================================================= */

function hcnSteps(): MoleculeStep[] {
  return [
    {
      title: "Addition de CN⁻",
      caption:
        "Le carbone nucléophile de CN⁻ attaque le carbone carbonylé; π(C=O) se déplace vers O.",
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
        {
          from: "CNc",
          to: "N",
          order: 3,
        },
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
        "Le carbone carbonylé devient sp³; O⁻ et CN sont maintenant liés au même carbone central.",
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
          from: [1.8, 1, 0.1],
          to: [1.35, 0.85, 0.05],
          color: colors.hcn,
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
