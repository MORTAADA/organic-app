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
   Structure générale : composé carbonylé
   R₂C=O
   ========================================================= */

function carbonyl(): {
  atoms: Atom3D[];
  bonds: Bond3D[];
} {
  return {
    atoms: [
      {
        id: "C",
        symbol: "C",
        position: [0, 0, 0],
        charge: "δ+",
      },
      {
        id: "O",
        symbol: "O",
        position: [1.35, 0.9, 0],
        charge: "δ-",
      },
      {
        id: "R",
        symbol: "R",
        position: [-1.3, 0.6, 0.2],
        label: "R",
      },
      {
        id: "Rp",
        symbol: "R",
        position: [-0.3, -1.3, -0.2],
        label: "R′",
      },
    ],
    bonds: [
      {
        from: "C",
        to: "O",
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
    ],
  };
}

/* =========================================================
   1. HYDRATATION DU CARBONE CARBONYLÉ
   ========================================================= */

function hydratationSteps(): MoleculeStep[] {
  return [
    {
      title: "Réactif carbonylé",
      caption:
        "Le carbone du groupe carbonyle est électrophile à cause de la polarisation C=O.",
      ...carbonyl(),
    },

    {
      title: "Attaque nucléophile de H₂O",
      caption:
        "La molécule d’eau attaque le carbone carbonylé.",
      atoms: [
        ...carbonyl().atoms,
        {
          id: "H2O",
          symbol: "O",
          position: [3.0, 1.2, 0],
          label: "H₂O",
        },
      ],
      bonds: [
        ...carbonyl().bonds,
      ],
      arrows: [
        {
          from: [2.7, 1.2, 0],
          to: [0.4, 0.1, 0],
          color: colors.hyd,
        },
      ],
    },

    {
      title: "Formation de l’intermédiaire tétraédrique",
      caption:
        "La liaison π(C=O) est rompue et l’oxygène devient porteur d’une charge négative.",
      atoms: [
        {
          id: "C",
          symbol: "C",
          position: [0, 0, 0],
        },
        {
          id: "O",
          symbol: "O",
          position: [1.35, 0.9, 0],
          charge: "-",
        },
        {
          id: "R",
          symbol: "R",
          position: [-1.3, 0.6, 0.2],
          label: "R",
        },
        {
          id: "Rp",
          symbol: "R",
          position: [-0.3, -1.3, -0.2],
          label: "R′",
        },
        {
          id: "OH2",
          symbol: "O",
          position: [1.0, -0.8, 0],
          label: "OH₂⁺",
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
          to: "OH2",
        },
      ],
    },

    {
      title: "Protonation",
      caption:
        "Un transfert de proton permet de neutraliser les charges de l’intermédiaire.",
      atoms: [
        {
          id: "C",
          symbol: "C",
          position: [0, 0, 0],
        },
        {
          id: "O",
          symbol: "O",
          position: [1.35, 0.9, 0],
          label: "OH",
        },
        {
          id: "R",
          symbol: "R",
          position: [-1.3, 0.6, 0.2],
          label: "R",
        },
        {
          id: "Rp",
          symbol: "R",
          position: [-0.3, -1.3, -0.2],
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
      ],
    },

    {
      title: "Hydrate : Gem-diol",
      caption:
        "Le produit final est un gem-diol : R₂C(OH)₂.",
      atoms: [
        {
          id: "C",
          symbol: "C",
          position: [0, 0, 0],
        },
        {
          id: "O1",
          symbol: "O",
          position: [1.25, 0.9, 0],
          label: "OH",
        },
        {
          id: "O2",
          symbol: "O",
          position: [0.9, -0.9, 0],
          label: "OH",
        },
        {
          id: "R",
          symbol: "R",
          position: [-1.3, 0.6, 0.2],
          label: "R",
        },
        {
          id: "Rp",
          symbol: "R",
          position: [-0.3, -1.5, -0.2],
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
  ];
}

/* =========================================================
   2. FORMATION D’UNE IMINE
   ========================================================= */

function amineSteps(): MoleculeStep[] {
  return [
    {
      title: "Protonation du carbonyle",
      caption:
        "Le groupe carbonyle est activé par protonation de l’oxygène.",
      atoms: [
        {
          id: "C",
          symbol: "C",
          position: [0, 0, 0],
          charge: "δ+",
        },
        {
          id: "O",
          symbol: "O",
          position: [1.35, 0.9, 0],
          label: "OH⁺",
        },
        {
          id: "R",
          symbol: "R",
          position: [-1.3, 0.6, 0.2],
          label: "R",
        },
        {
          id: "Rp",
          symbol: "R",
          position: [-0.3, -1.3, -0.2],
          label: "R′",
        },
      ],
      bonds: [
        {
          from: "C",
          to: "O",
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
      ],
    },

    {
      title: "Attaque nucléophile de l’amine",
      caption:
        "L’amine attaque le carbone carbonylé et forme une nouvelle liaison C–N.",
      atoms: [
        {
          id: "C",
          symbol: "C",
          position: [0, 0, 0],
        },
        {
          id: "O",
          symbol: "O",
          position: [1.35, 0.9, 0],
          label: "OH",
        },
        {
          id: "N",
          symbol: "N",
          position: [2.5, -0.4, 0],
          label: "NH₂R″",
        },
        {
          id: "R",
          symbol: "R",
          position: [-1.3, 0.6, 0.2],
          label: "R",
        },
        {
          id: "Rp",
          symbol: "R",
          position: [-0.3, -1.3, -0.2],
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
      ],
      arrows: [
        {
          from: [2.2, -0.4, 0],
          to: [0.4, -0.1, 0],
          color: colors.amine,
        },
      ],
    },

    {
      title: "Formation de l’hémiaminal",
      caption:
        "L’intermédiaire tétraédrique porte simultanément un groupe OH et un groupe amine.",
      atoms: [
        {
          id: "C",
          symbol: "C",
          position: [0, 0, 0],
        },
        {
          id: "O",
          symbol: "O",
          position: [1.2, 0.9, 0],
          label: "OH",
        },
        {
          id: "N",
          symbol: "N",
          position: [1.4, -1.0, 0],
          label: "NHR″",
        },
        {
          id: "R",
          symbol: "R",
          position: [-1.3, 0.6, 0.2],
          label: "R",
        },
        {
          id: "Rp",
          symbol: "R",
          position: [-0.3, -1.4, -0.2],
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
      ],
    },

    {
      title: "Départ de H₂O",
      caption:
        "Après protonation du groupe OH, une molécule d’eau est éliminée.",
      atoms: [
        {
          id: "C",
          symbol: "C",
          position: [0, 0, 0],
        },
        {
          id: "N",
          symbol: "N",
          position: [1.4, -0.8, 0],
          label: "NHR″",
        },
        {
          id: "H2O",
          symbol: "O",
          position: [2.7, 1.0, 0],
          label: "H₂O",
        },
        {
          id: "R",
          symbol: "R",
          position: [-1.3, 0.6, 0.2],
          label: "R",
        },
        {
          id: "Rp",
          symbol: "R",
          position: [-0.3, -1.4, -0.2],
          label: "R′",
        },
      ],
      bonds: [
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
      ],
      arrows: [
        {
          from: [1.7, 0.5, 0],
          to: [2.5, 0.9, 0],
          color: colors.amine,
        },
      ],
    },

    {
      title: "Formation de l’imine",
      caption:
        "La déprotonation finale conduit à la liaison C=N.",
      atoms: [
        {
          id: "C",
          symbol: "C",
          position: [0, 0, 0],
        },
        {
          id: "N",
          symbol: "N",
          position: [1.35, 0.9, 0],
          label: "NHR″",
        },
        {
          id: "R",
          symbol: "R",
          position: [-1.3, 0.6, 0.2],
          label: "R",
        },
        {
          id: "Rp",
          symbol: "R",
          position: [-0.3, -1.3, -0.2],
          label: "R′",
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
      ],
    },
  ];
}

/* =========================================================
   3. ACÉTALISATION
   ========================================================= */

function acetalSteps(): MoleculeStep[] {
  return [
    {
      title: "Protonation du carbonyle",
      caption:
        "L’oxygène du carbonyle est protoné afin d’activer le carbone électrophile.",
      atoms: [
        {
          id: "C",
          symbol: "C",
          position: [0, 0, 0],
          charge: "δ+",
        },
        {
          id: "O",
          symbol: "O",
          position: [1.35, 0.9, 0],
          label: "OH⁺",
        },
        {
          id: "R",
          symbol: "R",
          position: [-1.3, 0.6, 0.2],
          label: "R",
        },
        {
          id: "Rp",
          symbol: "R",
          position: [-0.3, -1.3, -0.2],
          label: "R′",
        },
      ],
      bonds: [
        {
          from: "C",
          to: "O",
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
      ],
    },

    {
      title: "Addition nucléophile de R′OH",
      caption:
        "Une première molécule d’alcool attaque le carbone carbonylé.",
      atoms: [
        {
          id: "C",
          symbol: "C",
          position: [0, 0, 0],
        },
        {
          id: "O",
          symbol: "O",
          position: [1.2, 0.9, 0],
          label: "OH",
        },
        {
          id: "ROH",
          symbol: "O",
          position: [2.5, -0.6, 0],
          label: "R′OH",
        },
        {
          id: "R",
          symbol: "R",
          position: [-1.3, 0.6, 0.2],
          label: "R",
        },
        {
          id: "Rp",
          symbol: "R",
          position: [-0.3, -1.3, -0.2],
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
      ],
      arrows: [
        {
          from: [2.2, -0.5, 0],
          to: [0.4, -0.1, 0],
          color: colors.alc,
        },
      ],
    },

    {
      title: "Formation de l’hémiacétal",
      caption:
        "Le premier alcool est maintenant lié au carbone central.",
      atoms: [
        {
          id: "C",
          symbol: "C",
          position: [0, 0, 0],
        },
        {
          id: "O",
          symbol: "O",
          position: [1.2, 0.9, 0],
          label: "OH",
        },
        {
          id: "OR",
          symbol: "O",
          position: [1.3, -1.0, 0],
          label: "OR′",
        },
        {
          id: "R",
          symbol: "R",
          position: [-1.3, 0.6, 0.2],
          label: "R",
        },
        {
          id: "Rp",
          symbol: "R",
          position: [-0.3, -1.5, -0.2],
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
          to: "OR",
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
        "Le groupe OH est protoné afin de pouvoir partir sous forme de H₂O.",
      atoms: [
        {
          id: "C",
          symbol: "C",
          position: [0, 0, 0],
        },
        {
          id: "O",
          symbol: "O",
          position: [1.2, 0.9, 0],
          label: "OH₂⁺",
        },
        {
          id: "OR",
          symbol: "O",
          position: [1.3, -1.0, 0],
          label: "OR′",
        },
        {
          id: "R",
          symbol: "R",
          position: [-1.3, 0.6, 0.2],
          label: "R",
        },
        {
          id: "Rp",
          symbol: "R",
          position: [-0.3, -1.5, -0.2],
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
          to: "OR",
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
        "L’eau quitte le carbone central et forme un intermédiaire cationique.",
      atoms: [
        {
          id: "C",
          symbol: "C",
          position: [0, 0, 0],
          charge: "+",
        },
        {
          id: "OR",
          symbol: "O",
          position: [1.2, -0.9, 0],
          label: "OR′",
        },
        {
          id: "H2O",
          symbol: "O",
          position: [2.6, 1.0, 0],
          label: "H₂O",
        },
        {
          id: "R",
          symbol: "R",
          position: [-1.3, 0.6, 0.2],
          label: "R",
        },
        {
          id: "Rp",
          symbol: "R",
          position: [-0.3, -1.4, -0.2],
          label: "R′",
        },
      ],
      bonds: [
        {
          from: "C",
          to: "OR",
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
          from: [1.7, 0.5, 0],
          to: [2.4, 0.9, 0],
          color: colors.alc,
        },
      ],
    },

    {
      title: "Addition du second alcool",
      caption:
        "Une seconde molécule d’alcool attaque le carbone électrophile.",
      atoms: [
        {
          id: "C",
          symbol: "C",
          position: [0, 0, 0],
        },
        {
          id: "OR1",
          symbol: "O",
          position: [1.2, -0.9, 0],
          label: "OR′",
        },
        {
          id: "OR2",
          symbol: "O",
          position: [1.4, 1.0, 0],
          label: "OR′",
        },
        {
          id: "R",
          symbol: "R",
          position: [-1.3, 0.6, 0.2],
          label: "R",
        },
        {
          id: "Rp",
          symbol: "R",
          position: [-0.3, -1.4, -0.2],
          label: "R′",
        },
      ],
      bonds: [
        {
          from: "C",
          to: "OR1",
        },
        {
          from: "C",
          to: "OR2",
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
          from: [2.8, 1.0, 0],
          to: [0.4, 0.1, 0],
          color: colors.alc,
        },
      ],
    },

    {
      title: "Acétal",
      caption:
        "La déprotonation finale donne l’acétal R₂C(OR′)₂.",
      atoms: [
        {
          id: "C",
          symbol: "C",
          position: [0, 0, 0],
        },
        {
          id: "OR1",
          symbol: "O",
          position: [1.25, 0.95, 0],
          label: "OR′",
        },
        {
          id: "OR2",
          symbol: "O",
          position: [1.25, -0.95, 0],
          label: "OR′",
        },
        {
          id: "R",
          symbol: "R",
          position: [-1.3, 0.6, 0.2],
          label: "R",
        },
        {
          id: "Rp",
          symbol: "R",
          position: [-0.3, -1.45, -0.2],
          label: "R′",
        },
      ],
      bonds: [
        {
          from: "C",
          to: "OR1",
        },
        {
          from: "C",
          to: "OR2",
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
   4. RÉACTION DE GRIGNARD
   ========================================================= */

function grignardSteps(): MoleculeStep[] {
  return [
    {
      title: "Polarisation du réactif de Grignard",
      caption:
        "La liaison C–Mg est fortement polarisée : le carbone possède un caractère nucléophile.",
      atoms: [
        {
          id: "CGr",
          symbol: "C",
          position: [2.0, 0, 0],
          label: "R″",
          charge: "δ−",
        },
        {
          id: "Mg",
          symbol: "Mg",
          position: [3.3, 0, 0],
          charge: "δ+",
        },
        {
          id: "X",
          symbol: "X",
          position: [4.2, -0.8, 0],
        },
        {
          id: "C",
          symbol: "C",
          position: [-0.8, 0, 0],
          charge: "δ+",
        },
        {
          id: "O",
          symbol: "O",
          position: [0.6, 0.9, 0],
          charge: "δ-",
        },
        {
          id: "R",
          symbol: "R",
          position: [-2.0, 0.6, 0.2],
          label: "R",
        },
        {
          id: "Rp",
          symbol: "R",
          position: [-1.1, -1.2, -0.2],
          label: "R′",
        },
      ],
      bonds: [
        {
          from: "C",
          to: "O",
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
          from: "CGr",
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
      title: "Attaque nucléophile",
      caption:
        "Le carbone nucléophile du Grignard attaque le carbone du carbonyle.",
      atoms: [
        {
          id: "C",
          symbol: "C",
          position: [0, 0, 0],
        },
        {
          id: "O",
          symbol: "O",
          position: [1.35, 0.9, 0],
          charge: "-",
        },
        {
          id: "CGr",
          symbol: "C",
          position: [2.5, -0.7, 0],
          label: "R″",
        },
        {
          id: "R",
          symbol: "R",
          position: [-1.3, 0.6, 0.2],
          label: "R",
        },
        {
          id: "Rp",
          symbol: "R",
          position: [-0.3, -1.3, -0.2],
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
      ],
      arrows: [
        {
          from: [2.3, -0.6, 0],
          to: [0.4, 0, 0],
          color: colors.g,
        },
      ],
    },

    {
      title: "Formation de l’alcoolate",
      caption:
        "Après l’addition, l’oxygène porte une charge négative : formation de l’alcoolate.",
      atoms: [
        {
          id: "C",
          symbol: "C",
          position: [0, 0, 0],
        },
        {
          id: "O",
          symbol: "O",
          position: [1.25, 0.9, 0],
          charge: "-",
        },
        {
          id: "CGr",
          symbol: "C",
          position: [1.4, -1.0, 0],
          label: "R″",
        },
        {
          id: "Mg",
          symbol: "Mg",
          position: [2.6, 1.2, 0],
          charge: "+",
        },
        {
          id: "R",
          symbol: "R",
          position: [-1.3, 0.6, 0.2],
          label: "R",
        },
        {
          id: "Rp",
          symbol: "R",
          position: [-0.3, -1.4, -0.2],
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
          to: "CGr",
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
          from: "O",
          to: "Mg",
          dashed: true,
        },
      ],
    },

    {
      title: "Protonation de l’alcoolate",
      caption:
        "Lors du traitement aqueux acide, l’alcoolate capte un proton.",
      atoms: [
        {
          id: "C",
          symbol: "C",
          position: [0, 0, 0],
        },
        {
          id: "O",
          symbol: "O",
          position: [1.25, 0.9, 0],
          charge: "-",
        },
        {
          id: "H",
          symbol: "H",
          position: [2.0, 0.9, 0],
        },
        {
          id: "H3O",
          symbol: "O",
          position: [3.0, 1.7, 0],
          label: "H₃O⁺",
        },
        {
          id: "CGr",
          symbol: "C",
          position: [1.4, -1.0, 0],
          label: "R″",
        },
        {
          id: "R",
          symbol: "R",
          position: [-1.3, 0.6, 0.2],
          label: "R",
        },
        {
          id: "Rp",
          symbol: "R",
          position: [-0.3, -1.4, -0.2],
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
          to: "CGr",
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
          from: [2.8, 1.6, 0],
          to: [2.0, 1.0, 0],
          color: colors.g,
        },
      ],
    },

    {
      title: "Alcool tertiaire",
      caption:
        "Après protonation, on obtient un alcool tertiaire pour un composé carbonylé de type cétone.",
      atoms: [
        {
          id: "C",
          symbol: "C",
          position: [0, 0, 0],
        },
        {
          id: "O",
          symbol: "O",
          position: [1.25, 0.9, 0],
          label: "OH",
        },
        {
          id: "CGr",
          symbol: "C",
          position: [1.4, -1.0, 0],
          label: "R″",
        },
        {
          id: "R",
          symbol: "R",
          position: [-1.3, 0.6, 0.2],
          label: "R",
        },
        {
          id: "Rp",
          symbol: "R",
          position: [-0.3, -1.4, -0.2],
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
          to: "CGr",
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
   5. HCN — FORMATION D’UNE CYANOHYDRINE
   ========================================================= */

function hcnSteps(): MoleculeStep[] {
  return [
    {
      title: "Formation de CN⁻",
      caption:
        "HCN peut fournir l’espèce nucléophile CN⁻ en présence d’une base.",
      atoms: [
        {
          id: "H",
          symbol: "H",
          position: [2.0, 0, 0],
        },
        {
          id: "C",
          symbol: "C",
          position: [3.0, 0, 0],
        },
        {
          id: "N",
          symbol: "N",
          position: [4.2, 0, 0],
          charge: "-",
        },
        {
          id: "Ccarbonyl",
          symbol: "C",
          position: [-0.8, 0, 0],
          charge: "δ+",
        },
        {
          id: "O",
          symbol: "O",
          position: [0.5, 0.9, 0],
          charge: "δ-",
        },
        {
          id: "R",
          symbol: "R",
          position: [-2.0, 0.6, 0.2],
          label: "R",
        },
        {
          id: "Rp",
          symbol: "R",
          position: [-1.1, -1.2, -0.2],
          label: "R′",
        },
      ],
      bonds: [
        {
          from: "H",
          to: "C",
        },
        {
          from: "C",
          to: "N",
          order: 3,
        },
        {
          from: "Ccarbonyl",
          to: "O",
          order: 2,
        },
        {
          from: "Ccarbonyl",
          to: "R",
        },
        {
          from: "Ccarbonyl",
          to: "Rp",
        },
      ],
    },

    {
      title: "Attaque nucléophile de CN⁻",
      caption:
        "Le carbone de CN⁻ attaque le carbone électrophile du groupe carbonyle.",
      atoms: [
        {
          id: "Ccarbonyl",
          symbol: "C",
          position: [0, 0, 0],
        },
        {
          id: "O",
          symbol: "O",
          position: [1.35, 0.9, 0],
          charge: "-",
        },
        {
          id: "CN",
          symbol: "C",
          position: [2.3, -0.6, 0],
          label: "CN",
        },
        {
          id: "N",
          symbol: "N",
          position: [3.4, -0.6, 0],
        },
        {
          id: "R",
          symbol: "R",
          position: [-1.3, 0.6, 0.2],
          label: "R",
        },
        {
          id: "Rp",
          symbol: "R",
          position: [-0.3, -1.3, -0.2],
          label: "R′",
        },
      ],
      bonds: [
        {
          from: "Ccarbonyl",
          to: "O",
        },
        {
          from: "Ccarbonyl",
          to: "R",
        },
        {
          from: "Ccarbonyl",
          to: "Rp",
        },
        {
          from: "CN",
          to: "N",
          order: 3,
        },
      ],
      arrows: [
        {
          from: [2.1, -0.5, 0],
          to: [0.4, 0, 0],
          color: colors.hcn,
        },
      ],
    },

    {
      title: "Formation de l’alcoolate",
      caption:
        "La liaison π(C=O) est rompue et l’oxygène devient un alcoolate O⁻.",
      atoms: [
        {
          id: "C",
          symbol: "C",
          position: [0, 0, 0],
        },
        {
          id: "O",
          symbol: "O",
          position: [1.25, 0.9, 0],
          charge: "-",
        },
        {
          id: "CN",
          symbol: "C",
          position: [1.5, -1.0, 0],
          label: "CN",
        },
        {
          id: "N",
          symbol: "N",
          position: [2.7, -1.0, 0],
        },
        {
          id: "R",
          symbol: "R",
          position: [-1.3, 0.6, 0.2],
          label: "R",
        },
        {
          id: "Rp",
          symbol: "R",
          position: [-0.3, -1.4, -0.2],
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
          to: "CN",
        },
        {
          from: "CN",
          to: "N",
          order: 3,
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
      title: "Protonation de l’alcoolate",
      caption:
        "L’oxygène chargé négativement capte un proton provenant du milieu.",
      atoms: [
        {
          id: "C",
          symbol: "C",
          position: [0, 0, 0],
        },
        {
          id: "O",
          symbol: "O",
          position: [1.25, 0.9, 0],
          charge: "-",
        },
        {
          id: "H",
          symbol: "H",
          position: [2.0, 0.9, 0],
        },
        {
          id: "CN",
          symbol: "C",
          position: [1.5, -1.0, 0],
          label: "CN",
        },
        {
          id: "N",
          symbol: "N",
          position: [2.7, -1.0, 0],
        },
        {
          id: "R",
          symbol: "R",
          position: [-1.3, 0.6, 0.2],
          label: "R",
        },
        {
          id: "Rp",
          symbol: "R",
          position: [-0.3, -1.4, -0.2],
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
          to: "CN",
        },
        {
          from: "CN",
          to: "N",
          order: 3,
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
      title: "Cyanohydrine",
      caption:
        "Le produit final possède simultanément un groupe OH et un groupe nitrile CN.",
      atoms: [
        {
          id: "C",
          symbol: "C",
          position: [0, 0, 0],
        },
        {
          id: "O",
          symbol: "O",
          position: [1.25, 0.9, 0],
          label: "OH",
        },
        {
          id: "CN",
          symbol: "C",
          position: [1.5, -1.0, 0],
          label: "CN",
        },
        {
          id: "N",
          symbol: "N",
          position: [2.7, -1.0, 0],
        },
        {
          id: "R",
          symbol: "R",
          position: [-1.3, 0.6, 0.2],
          label: "R",
        },
        {
          id: "Rp",
          symbol: "R",
          position: [-0.3, -1.4, -0.2],
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
          to: "CN",
        },
        {
          from: "CN",
          to: "N",
          order: 3,
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
   EXPORT
   ========================================================= */

export const MOLECULE_STEPS: Record<ReactionId, MoleculeStep[]> = {
  hydratation: hydratationSteps(),
  amine: amineSteps(),
  alcool: acetalSteps(),
  grignard: grignardSteps(),
  hcn: hcnSteps(),
};
