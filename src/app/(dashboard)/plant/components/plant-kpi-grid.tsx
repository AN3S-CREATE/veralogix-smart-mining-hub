
'use client';

import { KPITile } from "@/components/shared/kpi-tile";

const kpis = [
  { title: "Plant Throughput", value: "850", unit: "t/h", trend: "up" as const, trendValue: "+2% vs target" },
  { title: "Recovery / Yield", value: "91.3", unit: "%", trend: "flat" as const, trendValue: "Stable" },
  { title: "Plant Sensor Coverage", value: "79", unit: "%", trend: "down" as const, trendValue: "3 sensors offline" },
  { title: "NeuroLogix™ Plant Risk", value: "58", unit: "/100", trend: "up" as const, trendValue: "Increased risk detected" },
];

export function PlantKpiGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {kpis.map((kpi, index) => (
        <KPITile
          key={index}
          title={kpi.title}
          value={kpi.value}
          unit={kpi.unit}
          trend={kpi.trend}
          trendValue={kpi.trendValue}
        />
      ))}
    </div>
  );
}
