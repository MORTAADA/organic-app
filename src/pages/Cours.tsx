import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft, BookOpen, Lightbulb, Beaker, Atom, ArrowRight } from "lucide-react";
import { REACTION_LIST } from "@/lib/reactions";

export function Cours() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <Link
        href="/"
        className="mb-6 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Accueil
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-10"
      >
        <div className="inline-flex items-center gap-2 rounded-full border border-sky-500/30 bg-sky-500/10 px-4 py-1.5 text-xs font-medium text-sky-300">
          <BookOpen className="h-3.5 w-3.5" />
          Cours · Chimie organique
        </div>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Réactions d'addition nucléophile sur le groupement carbonyle
        </h1>
        <p className="mt-3 text-lg text-muted-foreground">
          Synthèse théorique des quatre grandes réactions d'addition nucléophile en chimie organique.
        </p>
      </motion.div>

      <article className="prose prose-invert prose-sky max-w-none">
        {/* Section 1 - Introduction */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-sky-500/20 text-sky-400 font-mono font-bold">
              01
            </div>
            <h2 className="m-0 text-2xl font-bold text-foreground">Introduction</h2>
          </div>
          <div className="rounded-xl border border-border/50 bg-card/40 p-6">
            <ul className="space-y-3 text-muted-foreground list-disc pl-6">
              <li>
                Le <strong className="text-foreground">groupement carbonyle (C=O)</strong>, présent dans les aldéhydes et les cétones, est fortement polarisé. Cette polarisation rend le carbone <strong className="text-sky-400">électrophile</strong>, donc sensible à l'attaque des nucléophiles.
              </li>
              <li>
                Les réactions d'addition nucléophile sur le carbonyle sont des transformations <strong className="text-foreground">fondamentales</strong> en chimie organique. Elles permettent de former de nouvelles liaisons et de synthétiser de nombreuses molécules importantes.
              </li>
              <li>
                Dans ce cours, nous allons voir le mécanisme général de ces réactions ainsi que quelques exemples essentiels.
              </li>
            </ul>

            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
              <div className="rounded-lg border border-sky-500/30 bg-sky-500/10 p-3">
                <div className="text-xs uppercase tracking-wider text-sky-400">δ+</div>
                <div className="mt-1 text-sm font-semibold text-foreground">Caractère électrophile</div>
                <div className="text-xs text-muted-foreground">du carbone du C=O</div>
              </div>
              <div className="rounded-lg border border-rose-500/30 bg-rose-500/10 p-3">
                <div className="text-xs uppercase tracking-wider text-rose-400">δ−</div>
                <div className="mt-1 text-sm font-semibold text-foreground">Caractère basique</div>
                <div className="text-xs text-muted-foreground">de l'oxygène du C=O</div>
              </div>
              <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-3">
                <div className="text-xs uppercase tracking-wider text-amber-400">α</div>
                <div className="mt-1 text-sm font-semibold text-foreground">Caractère acide</div>
                <div className="text-xs text-muted-foreground">des H en α du carbonyle</div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2 - Mecanisme */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-rose-500/20 text-rose-400 font-mono font-bold">
              02
            </div>
            <h2 className="m-0 text-2xl font-bold text-foreground">Mécanisme général</h2>
          </div>
          <div className="rounded-xl border border-border/50 bg-card/40 p-6">
            <div className="space-y-4">
              {[
                {
                  num: "1",
                  title: "Attaque nucléophile",
                  desc: "Le nucléophile (Nu⁻) attaque le carbone électrophile (δ⁺) du carbonyle.",
                },
                {
                  num: "2",
                  title: "Déplacement électronique",
                  desc: "Les électrons π de la liaison C=O sont repoussés vers l'oxygène → O⁻.",
                },
                {
                  num: "3",
                  title: "Formation d'un intermédiaire tétraédrique",
                  desc: "Le carbone passe de sp² (trigonal plan) à sp³ (tétraédrique).",
                },
                {
                  num: "4",
                  title: "Protonation finale",
                  desc: "Selon le milieu, l'oxygène négatif (O⁻) capte un proton H⁺ → formation d'un alcool (OH).",
                },
              ].map((step) => (
                <div key={step.num} className="flex gap-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-sky-500 text-sm font-bold text-slate-950">
                    {step.num}
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">{step.title}</div>
                    <p className="m-0 mt-1 text-sm text-muted-foreground">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-lg border border-sky-500/30 bg-sky-500/5 p-4 font-mono text-sm text-foreground">
              <div className="text-xs uppercase tracking-wider text-sky-400 mb-2">
                Schéma général
              </div>
              <div className="leading-relaxed">
                R-CO-R' + Nu⁻ → R-C(O⁻)(Nu)-R' →[H⁺] R-C(OH)(Nu)-R'
              </div>
            </div>
          </div>
        </section>

        {/* Section 3 - Types */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-400 font-mono font-bold">
              03
            </div>
            <h2 className="m-0 text-2xl font-bold text-foreground">Types d'addition nucléophile</h2>
          </div>

          <div className="space-y-4">
            {REACTION_LIST.map((r, i) => (
              <Link
                key={r.id}
                href={`/reaction/${r.id}`}
              >
                <div
                  className="group rounded-xl border border-border/50 bg-card/40 p-5 transition-all hover:border-sky-500/40 hover-elevate cursor-pointer"
                >
                  <div className="flex items-start gap-4">
                    <div
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg font-bold text-slate-950"
                      style={{ background: r.color }}
                    >
                      3.{i + 1}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between gap-3">
                        <h3 className="m-0 text-lg font-bold text-foreground">
                          {r.title}
                        </h3>
                        <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-sky-400 group-hover:translate-x-1 transition-all" />
                      </div>
                      <p className="m-0 mt-1 text-sm" style={{ color: r.color }}>
                        {r.subtitle}
                      </p>
                      <p className="m-0 mt-3 text-sm text-muted-foreground">
                        {r.description}
                      </p>
                      <div className="mt-3 flex flex-wrap gap-2 text-xs">
                        <span className="inline-flex items-center gap-1 rounded-md border border-border/50 bg-background/50 px-2 py-1 text-muted-foreground">
                          <Beaker className="h-3 w-3" />
                          {r.conditions}
                        </span>
                        <span className="inline-flex items-center gap-1 rounded-md border border-border/50 bg-background/50 px-2 py-1 text-muted-foreground">
                          → {r.product}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Conclusion */}
        <section className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-500/20 text-purple-400 font-mono font-bold">
              04
            </div>
            <h2 className="m-0 text-2xl font-bold text-foreground">Conclusion</h2>
          </div>
          <div className="rounded-xl border border-border/50 bg-card/40 p-6">
            <div className="flex items-start gap-3">
              <Lightbulb className="h-5 w-5 shrink-0 text-amber-400 mt-0.5" />
              <div>
                <p className="m-0 text-muted-foreground">
                  L'addition nucléophile sur le groupement carbonyle est l'une des transformations les plus polyvalentes de la chimie organique. Elle permet de transformer des aldéhydes et des cétones en alcools, diols, hémiacétals, acétals, imines et énamines, qui sont autant d'intermédiaires-clés pour la synthèse de molécules complexes.
                </p>
                <p className="mt-3 text-muted-foreground">
                  Le choix du nucléophile (eau, amine, alcool, organomagnésien) détermine la nature du produit final et ses applications, allant de la synthèse de médicaments à la chimie des polymères.
                </p>
              </div>
            </div>
          </div>
        </section>
      </article>

      {/* Try simulation */}
      <div className="mt-12 rounded-2xl border border-sky-500/30 bg-sky-500/5 p-6 text-center">
        <Atom className="mx-auto h-8 w-8 text-sky-400" />
        <h3 className="mt-3 text-xl font-bold text-foreground">
          Prêt pour la simulation ?
        </h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Visualisez chaque réaction en 3D interactif et en 2D animé.
        </p>
        <Link
          href="/reaction/hydratation"
          className="mt-5 inline-flex items-center gap-2 rounded-lg bg-sky-500 px-6 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-sky-500/30 hover:bg-sky-400 transition-colors"
        >
          Lancer la simulation
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
