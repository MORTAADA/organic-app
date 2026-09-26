import { Link } from "wouter";
import { motion } from "framer-motion";
import { Atom, FlaskConical, Beaker, Sparkles, ArrowRight, Droplets, FlaskRound, Zap, BookOpen } from "lucide-react";
import { REACTION_LIST } from "@/lib/reactions";

const ICONS = {
  hydratation: Droplets,
  amine: FlaskConical,
  alcool: FlaskRound,
  grignard: Zap,
  hcn: FlaskConical,
};

export function Home() {
  return (
    <div className="relative">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border/50">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(199_89%_53%/0.15),transparent_60%)]" />
          <svg
            className="absolute inset-0 h-full w-full opacity-[0.04]"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <pattern
                id="hex"
                width="60"
                height="52"
                patternUnits="userSpaceOnUse"
              >
                <polygon
                  points="30,2 56,16 56,42 30,56 4,42 4,16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#hex)" />
          </svg>
        </div>

        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-3xl text-center"
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-sky-500/30 bg-sky-500/10 px-4 py-1.5 text-xs font-medium text-sky-300 backdrop-blur-sm">
              <Sparkles className="h-3.5 w-3.5" />
              Chimie organique interactive · 2026
            </div>
            <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Réactions d'<span className="text-sky-400 glow-text">Addition Nucléophile</span> sur le groupement carbonyle
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Explorez en <strong className="text-sky-400">3D interactif</strong> et en <strong className="text-sky-400">2D animé</strong> les cinq grandes réactions d'addition nucléophile sur les aldéhydes et cétones.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/reaction/hydratation"
                className="group inline-flex items-center gap-2 rounded-lg bg-sky-500 px-6 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-sky-500/30 transition-all hover:bg-sky-400 hover:shadow-sky-500/50"
              >
                Commencer la simulation
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/cours"
                className="inline-flex items-center gap-2 rounded-lg border border-border/80 bg-card/50 px-6 py-3 text-sm font-semibold text-foreground backdrop-blur-sm hover-elevate"
              >
                <BookOpen className="h-4 w-4" />
                Voir le cours
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mechanism general */}
      <section className="border-b border-border/50 bg-card/20">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center mb-12">
            <h2 className="text-sm font-semibold uppercase tracking-widest text-sky-400">
              Mécanisme général
            </h2>
            <p className="mt-3 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Principes fondamentaux communs
            </p>
            <p className="mt-3 text-muted-foreground">
              Les additions nucléophiles partagent une logique commune : activation du carbonyle, attaque nucléophile, déplacement électronique et stabilisation de l'intermédiaire.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                num: "01",
                title: "Attaque nucléophile",
                desc: "Le nucléophile (Nu⁻) attaque le carbone électrophile (δ⁺) du carbonyle.",
              },
              {
                num: "02",
                title: "Déplacement électronique",
                desc: "Les électrons π de C=O sont repoussés vers l'oxygène → O⁻.",
              },
              {
                num: "03",
                title: "Intermédiaire tétraédrique",
                desc: "Le carbone passe de sp² (trigonal plan) à sp³ (tétraédrique).",
              },
              {
                num: "04",
                title: "Protonation finale",
                desc: "L'oxygène négatif (O⁻) capte un proton H⁺ → formation d'un alcool.",
              },
            ].map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="glass-card relative rounded-xl p-6 hover:border-sky-500/30 transition-colors"
              >
                <div className="text-4xl font-bold text-sky-500/30 font-mono">
                  {step.num}
                </div>
                <h3 className="mt-2 text-base font-semibold text-foreground">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Reactions */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center mb-12">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-sky-400">
            Cinq réactions
          </h2>
          <p className="mt-3 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Choisissez une simulation
          </p>
          <p className="mt-3 text-muted-foreground">
            Chaque réaction est animée pas à pas en 2D et explorable en 3D interactif.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {REACTION_LIST.map((reaction, i) => {
            const Icon = ICONS[reaction.id];
            return (
              <motion.div
                key={reaction.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Link href={`/reaction/${reaction.id}`}>
                  <div
                    className="group relative h-full overflow-hidden rounded-2xl border border-border/50 bg-card p-6 transition-all hover:border-sky-500/40 hover:shadow-xl hover:shadow-sky-500/10 hover-elevate cursor-pointer"
                  >
                    <div
                      className="absolute -right-12 -top-12 h-40 w-40 rounded-full opacity-20 blur-3xl transition-opacity group-hover:opacity-40"
                      style={{ background: reaction.color }}
                    />
                    <div className="relative flex items-start gap-4">
                      <div
                        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl shadow-lg"
                        style={{
                          background: `linear-gradient(135deg, ${reaction.color}, ${reaction.color}aa)`,
                          boxShadow: `0 8px 24px ${reaction.color}33`,
                        }}
                      >
                        <Icon className="h-6 w-6 text-slate-950" />
                      </div>
                      <div className="flex-1">
                        <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
                          0{i + 1}
                        </div>
                        <h3 className="mt-1 text-xl font-bold text-foreground">
                          {reaction.title}
                        </h3>
                        <p className="mt-1 text-sm font-medium" style={{ color: reaction.color }}>
                          {reaction.subtitle}
                        </p>
                      </div>
                    </div>

                    <p className="mt-4 text-sm leading-relaxed text-muted-foreground line-clamp-3">
                      {reaction.description}
                    </p>

                    <div className="mt-5 rounded-lg border border-border/50 bg-background/50 p-3">
                      <div className="font-mono text-xs text-sky-300 break-all">
                        {reaction.reactionEquation}
                      </div>
                    </div>

                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span className="inline-flex items-center gap-1">
                          <Atom className="h-3.5 w-3.5" /> 3D
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <Beaker className="h-3.5 w-3.5" /> 2D
                        </span>
                      </div>
                      <span className="inline-flex items-center gap-1 text-sm font-medium text-sky-400 group-hover:gap-2 transition-all">
                        Explorer <ArrowRight className="h-4 w-4" />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="text-sm text-muted-foreground">
              Élaboré par <strong className="text-foreground">Mortadha Zayani</strong> · 2026
            </div>
            <div className="text-xs text-muted-foreground">
              Réactions d'addition nucléophile sur le groupement carbonyle
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
