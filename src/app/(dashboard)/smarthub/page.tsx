

import { AutomatedActionsCard } from "../hub/components/automated-actions-card";
import { SmartHubQueueCard } from "../hub/components/smart-hub-queue-card";
import { SouthAfricanKpiGrid } from "../hub/components/south-african-kpi-grid";
import { PlantSensorCoverageCard } from "../hub/components/plant-sensor-coverage-card";
import { ProcessRiskCard } from "../hub/components/process-risk-card";

export default function SmartHubPage() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-headline font-semibold text-primary">Smart Hub Details</h1>
        <p className="text-muted-foreground">Detailed operational metrics, queues, and sensor status.</p>
      </header>

      <SouthAfricanKpiGrid />

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-primary/80">Plant & Tailings Sensor Snapshot</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <PlantSensorCoverageCard />
            <ProcessRiskCard />
        </div>
      </section>
      
       <section className="space-y-4">
        <h2 className="text-xl font-semibold text-primary/80">Actions & Queues</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <AutomatedActionsCard />
          <SmartHubQueueCard />
        </div>
      </section>
    </div>
  );
}
