'use client';

import { KPITile } from '@/components/shared/kpi-tile';

const opsKpis = [
    { title: "Production vs Plan", value: "98.5", unit: "%", trend: "up" as const, trendValue: "+1.2% this shift" },
    { title: "Fleet Utilization", value: "88.1", unit: "%", trend: "flat" as const, trendValue: "Stable" },
    { title: "Downtime (Top Cause)", value: "Shovel #2", unit: "3.5h", trend: "down" as const, trendValue: "Unscheduled maintenance" },
    { title: "Haul Cycle Time", value: "33.8", unit: "min", trend: "down" as const, trendValue: "-1.2min vs avg" },
];

export function OpsKpiGrid() {
    return (
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {opsKpis.map((kpi, index) => (
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
    )
}

export function OpsDashboard() {
  return (
    <div className="space-y-6">
        <OpsKpiGrid />
        {/* Add Ops-specific charts and tables here */}
        <div className="text-center text-muted-foreground p-8 border-dashed border-2 rounded-lg">
            [Operations-Specific Charts for Production Trends and Fleet Performance Would Go Here]
        </div>
    </div>
  );
}
