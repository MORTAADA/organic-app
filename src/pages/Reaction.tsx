import { useState } from "react";
import { Link, useParams } from "wouter";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Play,
  Pause,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  Atom,
  Beaker,
  Info,
  FlaskConical,
} from "lucide-react";
import { useEffect } from "react";
import { REACTIONS, type ReactionId, REACTION_LIST } from "@/lib/reactions";
import { MOLECULE_STEPS } from "@/lib/molecules";
import { Molecule3D } from "@/components/Molecule3D";
import { Mechanism2D } from "@/components/Mechanism2D";

export function Reaction() {
  const params = useParams();
  const reactionId = (params.id ?? "hydratation") as ReactionId;
  const reaction = REACTIONS[reactionId];
  const steps = reaction ? MOLECULE_STEPS[reactionId] : undefined;

  const [step, setStep] = useState(0);
  const [autoPlay, setAutoPlay] = useState(false);
  const [view, setView] = useState<"3d" | "2d">("3d");

  useEffect(() => {
    setStep(0);
    setAutoPlay(false);
  }, [reactionId]);

  useEffect(() => {
    if (!autoPlay) return;
    const t = setTimeout(() => {
      setStep((s) => (s + 1) % (steps?.length ?? 1));
    }, 3500);
    return () => clearTimeout(t);
  }, [autoPlay, step, steps?.length]);

  if (!reaction || !steps || steps.length !== reaction.steps.length) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center">
        <p>Réaction introuvable.</p>
        <Link href="/" className="text-sky-400 underline">
          Retour
        </Link>
      </div>
    );
  }

  const currentStep = steps[step] ?? steps[steps.length - 1];
  const reactionStep = reaction.steps[step] ?? reaction.steps[reaction.steps.length - 1];

  const otherReactions = REACTION_LIST.filter((r) => r.id !== reactionId);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <div className="mb-6 flex items-center gap-2 text-sm">
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Accueil
        </Link>
        <span className="text-muted-foreground">/</span>
        <span className="text-foreground font-medium">{reaction.shortTitle}</span>
      </div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-8"
      >
        <div className="flex items-start gap-4">
          <div
            className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl shadow-lg"
            style={{
              background: `linear-gradient(135deg, ${reaction.color}, ${reaction.color}aa)`,
              boxShadow: `0 8px 32px ${reaction.color}44`,
            }}
          >
            <FlaskConical className="h-7 w-7 text-slate-950" />
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              {reaction.title}
            </h1>
            <p
              className="mt-1 text-sm font-medium"
              style={{ color: reaction.color }}
            >
              {reaction.subtitle}
            </p>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-3">
          <div className="rounded-lg border border-border/50 bg-card/50 p-3">
            <div className="text-xs uppercase tracking-wider text-muted-foreground">
              Nucléophile
            </div>
            <div className="mt-1 font-mono text-sm font-semibold text-foreground">
              {reaction.nucleophile}
            </div>
          </div>
          <div className="rounded-lg border border-border/50 bg-card/50 p-3">
            <div className="text-xs uppercase tracking-wider text-muted-foreground">
              Conditions
            </div>
            <div className="mt-1 text-sm font-semibold text-foreground">
              {reaction.conditions}
            </div>
          </div>
          <div className="rounded-lg border border-border/50 bg-card/50 p-3">
            <div className="text-xs uppercase tracking-wider text-muted-foreground">
              Produit
            </div>
            <div className="mt-1 text-sm font-semibold text-foreground">
              {reaction.product}
            </div>
          </div>
        </div>

        <div
          className="mt-4 rounded-lg border p-4"
          style={{
            borderColor: `${reaction.color}55`,
            background: `${reaction.color}11`,
          }}
        >
          <div className="text-xs uppercase tracking-wider text-muted-foreground mb-2">
            Équation
          </div>
          <div className="font-mono text-base text-foreground break-all">
            {reaction.reactionEquation}
          </div>
        </div>
      </motion.div>

      {/* Visualisation */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          {/* View tabs */}
          <div className="mb-3 flex items-center justify-between gap-3 flex-wrap">
            <div className="inline-flex rounded-lg border border-border/50 bg-card/50 p-1">
              <button
                onClick={() => setView("3d")}
                className={`flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                  view === "3d"
                    ? "bg-sky-500 text-slate-950 shadow-md shadow-sky-500/30"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Atom className="h-4 w-4" />
                Vue 3D
              </button>
              <button
                onClick={() => setView("2d")}
                className={`flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                  view === "2d"
                    ? "bg-sky-500 text-slate-950 shadow-md shadow-sky-500/30"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Beaker className="h-4 w-4" />
                Vue 2D
              </button>
            </div>

            <div className="text-xs text-muted-foreground hidden sm:block">
              {view === "3d"
                ? "Cliquez et glissez pour orienter · molette pour zoomer"
                : "Schéma animé étape par étape"}
            </div>
          </div>

          {/* Visualization area */}
          <motion.div
            key={view}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="aspect-[4/3] sm:aspect-[16/10] overflow-hidden rounded-2xl border border-border/50 shadow-2xl"
            style={{ boxShadow: `0 0 40px ${reaction.color}22` }}
          >
            {view === "3d" ? (
              <Molecule3D
                atoms={currentStep.atoms}
                bonds={currentStep.bonds}
                arrows={currentStep.arrows}
              />
            ) : (
              <Mechanism2D reactionId={reactionId} step={step} />
            )}
          </motion.div>

          {/* Step caption */}
          <motion.div
            key={`caption-${step}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-4 rounded-lg border border-border/50 bg-card/40 p-4"
          >
            <div className="text-xs uppercase tracking-wider text-muted-foreground">
              {currentStep.title}
            </div>
            <div className="mt-1 text-sm text-foreground">
              {currentStep.caption}
            </div>
          </motion.div>

          {/* Controls */}
          <div className="mt-4 flex items-center justify-between gap-3 rounded-lg border border-border/50 bg-card/40 p-3">
            <button
              onClick={() => setStep((s) => Math.max(0, s - 1))}
              disabled={step === 0}
              className="inline-flex items-center gap-2 rounded-md border border-border/50 px-3 py-2 text-sm font-medium text-foreground hover-elevate disabled:opacity-40 disabled:hover:bg-transparent"
            >
              <ChevronLeft className="h-4 w-4" />
              Précédent
            </button>

            <div className="flex items-center gap-2">
              {steps.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setStep(i)}
                  className={`h-2 rounded-full transition-all ${
                    i === step
                      ? "w-8 bg-sky-500"
                      : i < step
                        ? "w-2 bg-sky-500/50"
                        : "w-2 bg-border"
                  }`}
                  aria-label={`Étape ${i + 1}`}
                />
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setAutoPlay((p) => !p)}
                className={`inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  autoPlay
                    ? "bg-sky-500 text-slate-950"
                    : "border border-border/50 text-foreground hover-elevate"
                }`}
              >
                {autoPlay ? (
                  <>
                    <Pause className="h-4 w-4" /> Pause
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4" /> Lecture
                  </>
                )}
              </button>
              <button
                onClick={() => {
                  setStep(0);
                  setAutoPlay(false);
                }}
                className="inline-flex items-center justify-center rounded-md border border-border/50 p-2 text-muted-foreground hover:text-foreground hover-elevate"
                aria-label="Recommencer"
              >
                <RotateCcw className="h-4 w-4" />
              </button>
              <button
                onClick={() =>
                  setStep((s) => Math.min(steps.length - 1, s + 1))
                }
                disabled={step === steps.length - 1}
                className="inline-flex items-center gap-2 rounded-md border border-border/50 px-3 py-2 text-sm font-medium text-foreground hover-elevate disabled:opacity-40 disabled:hover:bg-transparent"
              >
                Suivant
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <aside className="space-y-4">
          <div className="rounded-2xl border border-border/50 bg-card/40 p-5">
            <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
              <Info className="h-4 w-4 text-sky-400" />
              Description
            </div>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {reaction.description}
            </p>
          </div>

          <div className="rounded-2xl border border-border/50 bg-card/40 p-5">
            <div className="text-sm font-semibold text-foreground">
              Mécanisme — étapes
            </div>
            <ol className="mt-3 space-y-3">
              {reaction.steps.map((s, i) => (
                <li
                  key={i}
                  className={`group cursor-pointer rounded-lg border p-3 transition-all ${
                    i === step
                      ? "border-sky-500/40"
                      : "border-border/40 hover:border-border"
                  }`}
                  style={
                    i === step
                      ? { background: `${reaction.color}10` }
                      : undefined
                  }
                  onClick={() => setStep(i)}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold transition-colors ${
                        i === step
                          ? "text-slate-950"
                          : "bg-muted text-muted-foreground"
                      }`}
                      style={
                        i === step
                          ? { background: reaction.color }
                          : undefined
                      }
                    >
                      {i + 1}
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm font-semibold text-foreground">
                        {s.title.replace(/^\d+\.\s*/, "")}
                      </div>
                      <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
                        {s.description}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className="rounded-2xl border border-border/50 bg-card/40 p-5">
            <div className="text-sm font-semibold text-foreground">
              Exemple concret
            </div>
            <p className="mt-3 text-sm text-muted-foreground">
              {reaction.example}
            </p>
          </div>

          {view === "3d" && (
            <div className="rounded-2xl border border-border/50 bg-card/40 p-5">
              <div className="text-sm font-semibold text-foreground mb-3">
                Légende des atomes
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {[
                  { color: "#1f2937", label: "C — Carbone" },
                  { color: "#ef4444", label: "O — Oxygène" },
                  { color: "#3b82f6", label: "N — Azote" },
                  { color: "#e5e7eb", label: "H — Hydrogène" },
                  { color: "#84cc16", label: "Mg — Magnésium" },
                  { color: "#a16207", label: "Br — Brome" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-2">
                    <div
                      className="h-3 w-3 rounded-full ring-1 ring-border"
                      style={{ background: item.color }}
                    />
                    <span className="text-muted-foreground">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </aside>
      </div>

      {/* Other reactions */}
      <section className="mt-16">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-widest text-sky-400">
          Autres réactions
        </h2>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
          {otherReactions.map((r) => (
            <Link
              key={r.id}
              href={`/reaction/${r.id}`}
              className="group rounded-xl border border-border/50 bg-card/40 p-4 transition-all hover:border-sky-500/40 hover-elevate"
            >
              <div className="flex items-center gap-3">
                <div
                  className="h-3 w-3 rounded-full"
                  style={{ background: r.color }}
                />
                <div className="text-sm font-semibold text-foreground">
                  {r.shortTitle}
                </div>
              </div>
              <p className="mt-2 text-xs text-muted-foreground line-clamp-2">
                {r.subtitle}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
