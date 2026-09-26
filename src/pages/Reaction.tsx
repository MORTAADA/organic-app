import { useEffect, useState } from "react";
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

import {
  REACTIONS,
  type ReactionId,
  REACTION_LIST,
} from "@/lib/reactions";

import { MOLECULE_STEPS } from "@/lib/molecules";

import { Molecule3D } from "@/components/Molecule3D";
import { Mechanism2D } from "@/components/Mechanism2D";

export function Reaction() {
  const params = useParams();

  /*
   * L'identifiant vient de l'URL :
   * /reaction/hydratation
   * /reaction/amine
   * /reaction/alcool
   * /reaction/grignard
   * /reaction/hcn
   */
  const rawReactionId = params.id;

  const reactionId = (
    rawReactionId ?? "hydratation"
  ) as ReactionId;

  const reaction = REACTIONS[reactionId];

  /*
   * On récupère les étapes 3D indépendamment
   * des étapes descriptives de reactions.ts.
   */
  const steps = MOLECULE_STEPS[reactionId];

  const [step, setStep] = useState(0);
  const [autoPlay, setAutoPlay] = useState(false);
  const [view, setView] = useState<"3d" | "2d">("3d");

  /*
   * Lorsqu'on change de réaction,
   * on revient automatiquement à la première étape.
   */
  useEffect(() => {
    setStep(0);
    setAutoPlay(false);
  }, [reactionId]);

  /*
   * Lecture automatique du mécanisme.
   */
  useEffect(() => {
    if (!autoPlay || !steps || steps.length === 0) {
      return;
    }

    const timer = window.setTimeout(() => {
      setStep((current) => {
        if (current >= steps.length - 1) {
          setAutoPlay(false);
          return current;
        }

        return current + 1;
      });
    }, 3500);

    return () => {
      window.clearTimeout(timer);
    };
  }, [autoPlay, step, steps]);

  /*
   * Vérification uniquement de l'existence de la réaction
   * et de ses étapes 3D.
   *
   * IMPORTANT :
   * On ne compare plus le nombre d'étapes de reactions.ts
   * avec celui de molecules.ts.
   *
   * Les deux fichiers peuvent avoir des descriptions différentes
   * tout en représentant la même réaction.
   */
  if (!reaction) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center">
        <div className="rounded-2xl border border-red-500/30 bg-red-500/5 p-8">
          <div className="mb-3 text-lg font-bold text-foreground">
            Réaction introuvable
          </div>

          <p className="mb-6 text-sm text-muted-foreground">
            La réaction « {rawReactionId ?? "inconnue"} » n'existe pas
            dans la liste des réactions.
          </p>

          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-lg bg-sky-500 px-4 py-2 text-sm font-semibold text-slate-950"
          >
            <ArrowLeft className="h-4 w-4" />
            Retour à l'accueil
          </Link>
        </div>
      </div>
    );
  }

  if (!steps || steps.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center">
        <div className="rounded-2xl border border-amber-500/30 bg-amber-500/5 p-8">
          <div className="mb-3 text-lg font-bold text-foreground">
            Mécanisme 3D indisponible
          </div>

          <p className="mb-6 text-sm text-muted-foreground">
            La réaction « {reaction.shortTitle} » existe,
            mais aucune étape 3D n'est encore définie dans
            <code className="mx-1 rounded bg-muted px-1.5 py-0.5">
              molecules.ts
            </code>
            .
          </p>

          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-lg bg-sky-500 px-4 py-2 text-sm font-semibold text-slate-950"
          >
            <ArrowLeft className="h-4 w-4" />
            Retour à l'accueil
          </Link>
        </div>
      </div>
    );
  }

  /*
   * Protection contre un index invalide.
   */
  const safeStep = Math.min(
    Math.max(step, 0),
    steps.length - 1
  );

  const currentStep = steps[safeStep];

  /*
   * Les descriptions de reactions.ts peuvent avoir
   * un nombre d'étapes différent des étapes 3D.
   *
   * On utilise l'étape correspondante lorsqu'elle existe.
   * Sinon on génère une description simple.
   */
  const reactionStep = reaction.steps[safeStep];

  const otherReactions = REACTION_LIST.filter(
    (r) => r.id !== reactionId
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

      {/* =====================================================
          BREADCRUMB
          ===================================================== */}

      <div className="mb-6 flex items-center gap-2 text-sm">
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Accueil
        </Link>

        <span className="text-muted-foreground">
          /
        </span>

        <span className="font-medium text-foreground">
          {reaction.shortTitle}
        </span>
      </div>

      {/* =====================================================
          HEADER
          ===================================================== */}

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
              style={{
                color: reaction.color,
              }}
            >
              {reaction.subtitle}
            </p>

          </div>
        </div>

        {/* Informations principales */}

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

        {/* Equation */}

        <div
          className="mt-4 rounded-lg border p-4"
          style={{
            borderColor: `${reaction.color}55`,
            background: `${reaction.color}11`,
          }}
        >
          <div className="mb-2 text-xs uppercase tracking-wider text-muted-foreground">
            Équation
          </div>

          <div className="break-all font-mono text-base text-foreground">
            {reaction.reactionEquation}
          </div>
        </div>
      </motion.div>

      {/* =====================================================
          VISUALISATION
          ===================================================== */}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">

        <div className="lg:col-span-2">

          {/* View tabs */}

          <div className="mb-3 flex flex-wrap items-center justify-between gap-3">

            <div className="inline-flex rounded-lg border border-border/50 bg-card/50 p-1">

              <button
                type="button"
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
                type="button"
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

            <div className="hidden text-xs text-muted-foreground sm:block">
              {view === "3d"
                ? "Cliquez et glissez pour orienter · molette pour zoomer"
                : "Schéma animé étape par étape"}
            </div>

          </div>

          {/* =================================================
              3D / 2D
              ================================================= */}

          <motion.div
            key={view}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="aspect-[4/3] overflow-hidden rounded-2xl border border-border/50 shadow-2xl sm:aspect-[16/10]"
            style={{
              boxShadow: `0 0 40px ${reaction.color}22`,
            }}
          >

            {view === "3d" ? (
              <Molecule3D
                atoms={currentStep.atoms}
                bonds={currentStep.bonds}
                arrows={currentStep.arrows}
              />
            ) : (
              <Mechanism2D
                reactionId={reactionId}
                step={safeStep}
              />
            )}

          </motion.div>

          {/* =================================================
              STEP CAPTION
              ================================================= */}

          <motion.div
            key={`caption-${safeStep}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-4 rounded-lg border border-border/50 bg-card/40 p-4"
          >

            <div className="text-xs uppercase tracking-wider text-muted-foreground">
              Étape {safeStep + 1} — {currentStep.title}
            </div>

            <div className="mt-1 text-sm text-foreground">
              {currentStep.caption}
            </div>

            {reactionStep?.description && (
              <div className="mt-2 text-xs leading-relaxed text-muted-foreground">
                {reactionStep.description}
              </div>
            )}

          </motion.div>

          {/* =================================================
              CONTROLS
              ================================================= */}

          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-lg border border-border/50 bg-card/40 p-3">

            <button
              type="button"
              onClick={() => {
                setStep((current) =>
                  Math.max(0, current - 1)
                );
              }}
              disabled={safeStep === 0}
              className="inline-flex items-center gap-2 rounded-md border border-border/50 px-3 py-2 text-sm font-medium text-foreground hover-elevate disabled:opacity-40 disabled:hover:bg-transparent"
            >
              <ChevronLeft className="h-4 w-4" />
              Précédent
            </button>

            {/* Step indicators */}

            <div className="flex items-center gap-2">

              {steps.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setStep(index)}
                  className={`h-2 rounded-full transition-all ${
                    index === safeStep
                      ? "w-8 bg-sky-500"
                      : index < safeStep
                        ? "w-2 bg-sky-500/50"
                        : "w-2 bg-border"
                  }`}
                  aria-label={`Étape ${index + 1}`}
                />
              ))}

            </div>

            {/* Playback */}

            <div className="flex items-center gap-2">

              <button
                type="button"
                onClick={() =>
                  setAutoPlay((previous) => !previous)
                }
                className={`inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  autoPlay
                    ? "bg-sky-500 text-slate-950"
                    : "border border-border/50 text-foreground hover-elevate"
                }`}
              >
                {autoPlay ? (
                  <>
                    <Pause className="h-4 w-4" />
                    Pause
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4" />
                    Lecture
                  </>
                )}
              </button>

              <button
                type="button"
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
                type="button"
                onClick={() => {
                  setStep((current) =>
                    Math.min(
                      steps.length - 1,
                      current + 1
                    )
                  );
                }}
                disabled={safeStep === steps.length - 1}
                className="inline-flex items-center gap-2 rounded-md border border-border/50 px-3 py-2 text-sm font-medium text-foreground hover-elevate disabled:opacity-40 disabled:hover:bg-transparent"
              >
                Suivant
                <ChevronRight className="h-4 w-4" />
              </button>

            </div>
          </div>
        </div>

        {/* ===================================================
            SIDEBAR
            =================================================== */}

        <aside className="space-y-4">

          {/* Description */}

          <div className="rounded-2xl border border-border/50 bg-card/40 p-5">

            <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
              <Info className="h-4 w-4 text-sky-400" />
              Description
            </div>

            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {reaction.description}
            </p>

          </div>

          {/* Mécanisme */}

          <div className="rounded-2xl border border-border/50 bg-card/40 p-5">

            <div className="text-sm font-semibold text-foreground">
              Mécanisme — étapes
            </div>

            <ol className="mt-3 space-y-3">

              {steps.map((moleculeStep, index) => {

                const description =
                  reaction.steps[index]?.description ??
                  moleculeStep.caption;

                return (
                  <li
                    key={`${reactionId}-${index}`}
                    className={`group cursor-pointer rounded-lg border p-3 transition-all ${
                      index === safeStep
                        ? "border-sky-500/40"
                        : "border-border/40 hover:border-border"
                    }`}
                    style={
                      index === safeStep
                        ? {
                            background: `${reaction.color}10`,
                          }
                        : undefined
                    }
                    onClick={() => setStep(index)}
                  >

                    <div className="flex items-start gap-3">

                      <div
                        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold transition-colors ${
                          index === safeStep
                            ? "text-slate-950"
                            : "bg-muted text-muted-foreground"
                        }`}
                        style={
                          index === safeStep
                            ? {
                                background: reaction.color,
                              }
                            : undefined
                        }
                      >
                        {index + 1}
                      </div>

                      <div className="min-w-0">

                        <div className="text-sm font-semibold text-foreground">
                          {moleculeStep.title}
                        </div>

                        <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
                          {description}
                        </p>

                      </div>

                    </div>
                  </li>
                );
              })}

            </ol>
          </div>

          {/* Exemple */}

          <div className="rounded-2xl border border-border/50 bg-card/40 p-5">

            <div className="text-sm font-semibold text-foreground">
              Exemple concret
            </div>

            <p className="mt-3 text-sm text-muted-foreground">
              {reaction.example}
            </p>

          </div>

          {/* Légende */}

          {view === "3d" && (
            <div className="rounded-2xl border border-border/50 bg-card/40 p-5">

              <div className="mb-3 text-sm font-semibold text-foreground">
                Légende des atomes
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">

                {[
                  {
                    color: "#1f2937",
                    label: "C — Carbone",
                  },
                  {
                    color: "#ef4444",
                    label: "O — Oxygène",
                  },
                  {
                    color: "#3b82f6",
                    label: "N — Azote",
                  },
                  {
                    color: "#e5e7eb",
                    label: "H — Hydrogène",
                  },
                  {
                    color: "#84cc16",
                    label: "Mg — Magnésium",
                  },
                  {
                    color: "#a16207",
                    label: "Br — Brome",
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center gap-2"
                  >

                    <div
                      className="h-3 w-3 rounded-full ring-1 ring-border"
                      style={{
                        background: item.color,
                      }}
                    />

                    <span className="text-muted-foreground">
                      {item.label}
                    </span>

                  </div>
                ))}

              </div>
            </div>
          )}

        </aside>
      </div>

      {/* =====================================================
          AUTRES RÉACTIONS
          ===================================================== */}

      <section className="mt-16">

        <h2 className="mb-4 text-sm font-semibold uppercase tracking-widest text-sky-400">
          Autres réactions
        </h2>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">

          {otherReactions.map((otherReaction) => (
            <Link
              key={otherReaction.id}
              href={`/reaction/${otherReaction.id}`}
              className="group rounded-xl border border-border/50 bg-card/40 p-4 transition-all hover:border-sky-500/40 hover-elevate"
            >

              <div className="flex items-center gap-3">

                <div
                  className="h-3 w-3 rounded-full"
                  style={{
                    background: otherReaction.color,
                  }}
                />

                <div className="text-sm font-semibold text-foreground">
                  {otherReaction.shortTitle}
                </div>

              </div>

              <p className="mt-2 line-clamp-2 text-xs text-muted-foreground">
                {otherReaction.subtitle}
              </p>

            </Link>
          ))}

        </div>
      </section>

    </div>
  );
}
