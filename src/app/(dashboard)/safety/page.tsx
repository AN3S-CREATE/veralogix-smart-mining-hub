import { SafetyKpiGrid } from "./components/safety-kpi-grid";
import { RiskHeatmapCard } from "./components/risk-heatmap-card";
import { EventTimelineCard } from "./components/event-timeline-card";
import { HighRiskZonesCard } from "./components/high-risk-zones-card";
import { RecommendedActionsCard } from "./components/recommended-actions-card";

export default function SafetyPage() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-headline font-semibold text-primary">Smart Risk</h1>
        <p className="text-muted-foreground">Monitor proximity detection, operator fatigue, and incident data in real-time.</p>
      </header>

      <SafetyKpiGrid />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        <RiskHeatmapCard />
        <EventTimelineCard />
      </div>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-primary/80">AI Insights</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          <HighRiskZonesCard />
          <RecommendedActionsCard />
        </div>
      </section>
    </div>
  );
}
