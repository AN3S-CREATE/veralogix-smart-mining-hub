import { DroneKpiGrid } from "./components/drone-kpi-grid";
import { MissionsMapCard } from "./components/missions-map-card";
import { MissionsListCard } from "./components/missions-list-card";
import { StockpileIntelligenceCard } from "./components/stockpile-intelligence-card";
import { PerimeterAlertsCard } from "./components/perimeter-alerts-card";

export default function DronesPage() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-headline font-semibold text-primary">Smart Survey</h1>
        <p className="text-muted-foreground">Manage drone flights and survey data.</p>
      </header>
      
      <DroneKpiGrid />

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-start">
        <div className="lg:col-span-3">
          <MissionsMapCard />
        </div>
        <div className="lg:col-span-2">
          <MissionsListCard />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        <StockpileIntelligenceCard />
        <PerimeterAlertsCard />
      </div>
    </div>
  );
}
