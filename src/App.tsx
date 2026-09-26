import { Switch, Route, Router as WouterRouter } from "wouter";
import NotFound from "@/pages/not-found";
import { Header } from "@/components/Header";
import { Home } from "@/pages/Home";
import { Reaction } from "@/pages/Reaction";
import { Cours } from "@/pages/Cours";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/cours" component={Cours} />
      <Route path="/reaction/:id" component={Reaction} />
      <Route component={NotFound} />
    </Switch>
  );
}

export default function App() {
  return (
    <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
      <div className="min-h-screen bg-background text-foreground">
        <Header />
        <main><Router /></main>
      </div>
    </WouterRouter>
  );
}
