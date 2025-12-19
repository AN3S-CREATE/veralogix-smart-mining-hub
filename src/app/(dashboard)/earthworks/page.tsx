import { EarthworksKpiGrid } from "./components/earthworks-kpi-grid";
import { RoadBenchMapCard } from "./components/road-bench-map-card";
import { ReworkAnalysisCard } from "./components/rework-analysis-card";
import { RoadProfileCard } from "./components/road-profile-card";
import { AiRoadRiskIndexTile } from "./components/ai-road-risk-index-tile";
import { AiReworkPriorityCard } from "./components/ai-rework-priority-card";

export default function EarthworksPage() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-headline font-semibold text-primary">Smart Geotech</h1>
        <p className="text-muted-foreground">Monitor and manage haul road and bench quality with high-precision data.</p>
      </header>

      <EarthworksKpiGrid />

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-start">
        <div className="lg:col-span-3">
          <RoadBenchMapCard />
        </div>
        <div className="lg:col-span-2">
            <RoadProfileCard />
        </div>
      </div>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-primary/80">AI Road Intelligence</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
            <div className="lg:col-span-1">
                <AiRoadRiskIndexTile />
            </div>
            <div className="lg:col-span-2">
                <AiReworkPriorityCard />
            </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-primary/80">Costing</h2>
        <ReworkAnalysisCard />
      </section>
    </div>
  );
}
