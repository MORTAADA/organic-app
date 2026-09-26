import { Link, useLocation } from "wouter";
import { Atom, Beaker, Home } from "lucide-react";

export function Header() {
  const [location] = useLocation();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-sky-500 to-blue-700 shadow-lg shadow-sky-500/30 group-hover:shadow-sky-500/50 transition-shadow">
            <Atom className="h-6 w-6 text-white" />
          </div>
          <div className="hidden sm:block">
            <div className="text-sm font-semibold tracking-tight text-foreground leading-tight">
              Addition Nucléophile
            </div>
            <div className="text-xs text-muted-foreground">
              Simulation 3D & 2D
            </div>
          </div>
        </Link>

        <nav className="flex items-center gap-2">
          <Link
            href="/"
            className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover-elevate ${
              location === "/"
                ? "text-sky-400"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Home className="h-4 w-4" />
            <span className="hidden sm:inline">Accueil</span>
          </Link>
          <Link
            href="/cours"
            className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover-elevate ${
              location === "/cours"
                ? "text-sky-400"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Beaker className="h-4 w-4" />
            <span className="hidden sm:inline">Cours</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
