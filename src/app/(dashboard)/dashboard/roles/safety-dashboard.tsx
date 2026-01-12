'use client';

import { KPITile } from '@/components/shared/kpi-tile';

const safetyKpis = [
    { title: "Open Incidents", value: "3", unit: "", trend: "up" as const, trendValue: "1 new today" },
    { title: "TRIFR (mock)", value: "1.82", unit: "", trend: "flat" as const, trendValue: "Stable" },
    { title: "Geofence Breaches (24h)", value: "1", unit: "", trend: "down" as const, trendValue: "-2 vs yesterday" },
    { title: "High-Risk Alerts", value: "8", unit: "today", trend: "up" as const, trendValue: "Ramp 3 congestion" },
];

export function SafetyKpiGrid() {
    return (
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {safetyKpis.map((kpi, index) => (
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

export function SafetyDashboard() {
  return (
    <div className="space-y-6">
      <SafetyKpiGrid />
       {/* Add Safety-specific charts and tables here */}
      <div className="text-center text-muted-foreground p-8 border-dashed border-2 rounded-lg">
        [Safety-Specific Charts for Incident Timelines and Risk Heatmaps Would Go Here]
      </div>
    </div>
  );
}
