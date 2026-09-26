export type ReactionId = "hydratation" | "amine" | "alcool" | "grignard" | "hcn";

export interface ReactionStep { title: string; description: string; }
export interface ReactionData {
  id: ReactionId;
  title: string;
  shortTitle: string;
  subtitle: string;
  nucleophile: string;
  product: string;
  color: string;
  description: string;
  reactionEquation: string;
  steps: ReactionStep[];
  conditions: string;
  example: string;
}

export const REACTIONS: Record<ReactionId, ReactionData> = {
  hydratation: {
    id: "hydratation", title: "Hydratation du carbonyle", shortTitle: "Hydratation",
    subtitle: "Formation d'un hydrate (gem-diol)", nucleophile: "H₂O (catalyse acide)",
    product: "Hydrate de carbonyle (gem-diol)", color: "#38bdf8",
    description: "L'hydratation acido-catalysée d'un aldéhyde ou d'une cétone est réversible. Le carbonyle est d'abord protoné, puis l'eau attaque et le proton est transféré au milieu.",
    reactionEquation: "R₂C=O + H₂O ⇌ R₂C(OH)₂",
    conditions: "H₃O⁺ / H₂O; équilibre réversible",
    example: "Méthanal + H₂O ⇌ méthane-1,1-diol (hydrate de formaldéhyde)",
    steps: [
      { title: "1. Protonation du carbonyle", description: "Un doublet de l'oxygène du carbonyle attaque le proton de H₃O⁺. La liaison O–H de H₃O⁺ se rompt vers l'oxygène de l'eau; le carbonyle devient plus électrophile." },
      { title: "2. Attaque de l'eau", description: "Le doublet de l'oxygène de H₂O attaque le carbone carbonylé tandis que les électrons π(C=O) se déplacent vers l'oxygène du carbonyle." },
      { title: "3. Déprotonation", description: "Une molécule d'eau arrache le proton du groupe OH₂⁺. La liaison O–H du groupe attaquant revient sur son oxygène, régénérant H₃O⁺." },
      { title: "4. Hydrate en équilibre", description: "On obtient R₂C(OH)₂, un gem-diol. L'équilibre dépend de la structure du carbonyle et du milieu." },
    ],
  },
  amine: {
    id: "amine", title: "Addition des amines", shortTitle: "Amines", subtitle: "Formation d'imines",
    nucleophile: "R''-NH₂ (amine primaire)", product: "Imine (base de Schiff)", color: "#a78bfa",
    description: "Une amine primaire réagit réversiblement avec un aldéhyde ou une cétone sous catalyse acide modérée pour former une imine. Les transferts de protons sont indispensables.",
    reactionEquation: "R₂C=O + R''NH₂ ⇌ R₂C=NR'' + H₂O",
    conditions: "Catalyse acide modérée; pH optimal proche de 4–5",
    example: "Propanone + méthylamine ⇌ N-méthylpropan-2-imine + H₂O",
    steps: [
      { title: "1. Addition nucléophile", description: "Le doublet libre de l'azote attaque le carbone du carbonyle et les électrons π(C=O) se déplacent vers l'oxygène. On forme un intermédiaire tétraédrique chargé." },
      { title: "2. Carbinolamine", description: "Des transferts de protons conduisent à la carbinolamine neutre R₂C(OH)-NHR''. Le milieu ne doit pas protoner complètement l'amine, sinon elle devient peu nucléophile." },
      { title: "3. Protonation du OH", description: "L'oxygène de l'OH est protoné. Le groupe OH₂⁺ devient un excellent groupe partant." },
      { title: "4. Élimination de l'eau", description: "Le doublet de l'azote forme la liaison π C=N pendant que la liaison C–OH₂ se rompt vers l'oxygène. On obtient un ion iminium." },
      { title: "5. Déprotonation", description: "Une base du milieu retire le proton de l'azote; les électrons de N–H restent sur l'azote. L'imine neutre et le catalyseur sont régénérés." },
    ],
  },
  alcool: {
    id: "alcool", title: "Addition des alcools", shortTitle: "Acétalisation", subtitle: "Hémiacétal puis acétal",
    nucleophile: "R'OH", product: "Acétal", color: "#34d399",
    description: "En milieu acide, un alcool s'additionne au carbonyle pour donner un hémiacétal. Après protonation du OH, départ d'eau, seconde addition d'alcool et déprotonation, l'acétal est formé.",
    reactionEquation: "R₂C=O + 2 R'OH ⇌ R₂C(OR')₂ + H₂O",
    conditions: "Catalyse acide; élimination de l'eau favorise l'acétalisation",
    example: "Éthanal + 2 méthanol ⇌ 1,1-diméthoxyéthane + H₂O",
    steps: [
      { title: "1. Protonation du carbonyle", description: "Le doublet de l'oxygène carbonylé capte H⁺. Le carbone du carbonyle devient plus électrophile." },
      { title: "2. Addition du premier alcool", description: "Le doublet de l'oxygène de R'OH attaque le carbone carbonylé et π(C=O) se déplace vers l'oxygène. Un hémiacétal protoné est formé." },
      { title: "3. Déprotonation", description: "Une molécule d'eau ou d'alcool enlève le proton de l'oxygène entrant, donnant l'hémiacétal neutre." },
      { title: "4. Protonation du OH", description: "Le OH de l'hémiacétal est protoné pour devenir H₂O, un groupe partant." },
      { title: "5. Départ de l'eau", description: "Le doublet de l'oxygène OR' reforme une liaison π avec le carbone pendant que H₂O part. On obtient un oxonium stabilisé." },
      { title: "6. Addition du second alcool", description: "Un second R'OH attaque le carbone électrophile de l'oxonium; on obtient un acétal protoné." },
      { title: "7. Déprotonation", description: "Une base du milieu enlève le proton restant. L'acétal neutre est formé et H⁺ est régénéré." },
    ],
  },
  grignard: {
    id: "grignard", title: "Addition des organomagnésiens", shortTitle: "Grignard", subtitle: "Formation d'alcools après hydrolyse",
    nucleophile: "R''MgX", product: "Alcool après hydrolyse", color: "#fb923c",
    description: "Le carbone lié au magnésium dans un réactif de Grignard est fortement nucléophile. Il forme une nouvelle liaison C–C avec le carbonyle; l'alcoolate est ensuite protoné lors du work-up.",
    reactionEquation: "R₂C=O + R''MgX → R₂C(O⁻MgX⁺)-R'' → H₃O⁺ → R₂C(OH)-R''",
    conditions: "Éther/THF anhydre; puis H₃O⁺ ou H₂O/H⁺ au work-up",
    example: "Propanone + CH₃MgBr → alcoolate → 2-méthylpropan-2-ol après H₃O⁺",
    steps: [
      { title: "1. Activation / polarisation", description: "Le carbonyle peut se coordonner au Mg; la liaison C–Mg du Grignard est fortement polarisée Cδ⁻–Mgδ⁺. Le carbone du groupe R'' est le nucléophile." },
      { title: "2. Addition C–C", description: "Le carbone nucléophile de R''MgX attaque le carbone carbonylé; les électrons π(C=O) se déplacent vers l'oxygène. Une nouvelle liaison C–C est formée." },
      { title: "3. Alcoolate de magnésium", description: "L'intermédiaire tétraédrique est un alcoolate associé au MgX⁺. Aucun alcool n'est encore présent avant le work-up aqueux." },
      { title: "4. Work-up acide", description: "H₃O⁺ protonne l'oxygène de l'alcoolate pour donner l'alcool final. Le réactif de Grignard doit être protégé de l'eau pendant l'addition." },
    ],
  },
  hcn: {
    id: "hcn", title: "Addition de HCN", shortTitle: "Cyanohydrine", subtitle: "Formation d'une cyanohydrine",
    nucleophile: "CN⁻", product: "Cyanohydrine", color: "#facc15",
    description: "Le cyanure attaque le carbone électrophile du carbonyle. L'alkoxyde formé est ensuite protoné pour donner une cyanohydrine. L'addition est réversible.",
    reactionEquation: "R₂C=O + HCN ⇌ R₂C(OH)-CN",
    conditions: "HCN / source de CN⁻; milieu adapté au couple HCN/CN⁻",
    example: "Propanone + HCN ⇌ 2-hydroxy-2-méthylpropanenitrile",
    steps: [
      { title: "1. Addition de CN⁻", description: "Le carbone de CN⁻, riche en électrons, attaque le carbone du carbonyle et les électrons π(C=O) se déplacent vers l'oxygène." },
      { title: "2. Intermédiaire alcoolate", description: "Le carbone carbonylé devient sp³ et porte maintenant les groupes R, R', CN et O⁻." },
      { title: "3. Protonation", description: "L'alcoolate capte un proton de HCN ou d'une autre source appropriée. La cyanohydrine R₂C(OH)-CN est obtenue et CN⁻ peut être régénéré selon le mécanisme global." },
    ],
  },
};

export const REACTION_LIST: ReactionData[] = Object.values(REACTIONS);

export const ATOM_COLORS: Record<string, string> = {
  C: "#334155", H: "#e2e8f0", O: "#ef4444", N: "#3b82f6", Mg: "#84cc16", Br: "#a16207", R: "#64748b", Nu: "#f59e0b",
};
export const ATOM_RADII: Record<string, number> = { C: .5, H: .3, O: .45, N: .45, Mg: .55, Br: .5, R: .55, Nu: .55 };
