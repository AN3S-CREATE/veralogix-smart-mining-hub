import { ModuleGrid } from "./components/module-grid";
import { AiInsightsStrip } from "./components/ai-insights-strip";

export default function HubPage() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-headline font-semibold text-primary">Smart Mining HUB</h1>
        <p className="text-muted-foreground">Unified operational truth source for safer, smarter, and more efficient mining.</p>
      </header>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-primary/80">AI Insights</h2>
        <AiInsightsStrip />
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-primary/80">Operational Intelligence Modules</h2>
        <ModuleGrid />
      </section>
      
    </div>
  );
}
