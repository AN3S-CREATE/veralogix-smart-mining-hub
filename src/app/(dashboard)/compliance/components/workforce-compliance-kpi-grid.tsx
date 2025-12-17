'use client';

import { KPITile } from "@/components/shared/kpi-tile";

const kpis = [
  { title: "Gate Entries Compliant", value: "98.7", unit: "%", trend: "up" as const, trendValue: "Today" },
  { title: "Blocked Entries (MTD)", value: "42", unit: "", trend: "flat" as const, trendValue: "On par with last month" },
  { title: "License Compliance", value: "99.2", unit: "%", trend: "up" as const, trendValue: "+0.1% vs last week" },
  { title: "Medical Compliance", value: "98.9", unit: "%", trend: "down" as const, trendValue: "3 expirations" },
  { title: "Training Compliance", value: "97.5", unit: "%", trend: "down" as const, trendValue: "Refresher courses due" },
];

export function WorkforceComplianceKpiGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
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
