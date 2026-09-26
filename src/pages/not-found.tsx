import { Link } from "wouter";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-24 text-center">
      <div className="text-6xl font-black text-sky-400">404</div>
      <h1 className="mt-4 text-2xl font-bold">Page introuvable</h1>
      <p className="mt-2 text-muted-foreground">Cette page n'existe pas dans l'application.</p>
      <Link href="/" className="mt-6 inline-flex rounded-lg bg-sky-500 px-4 py-2 font-semibold text-slate-950">Retour à l'accueil</Link>
    </div>
  );
}
