'use client';

import { KPITile } from '@/components/shared/kpi-tile';

const hrKpis = [
    { title: "Training Compliance %", value: "97.5", unit: "%", trend: "down" as const, trendValue: "Refresher courses due" },
    { title: "Expiring Certifications", value: "14", unit: "in next 30d", trend: "up" as const, trendValue: "New intake" },
    { title: "Workforce On-Site Today", value: "248", unit: "", trend: "flat" as const, trendValue: "vs yesterday" },
    { title: "Onboarding Status", value: "8/10", unit: "complete", trend: "up" as const, trendValue: "2 in progress" },
];

export function HrKpiGrid() {
    return (
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {hrKpis.map((kpi, index) => (
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

export function HrDashboard() {
  return (
    <div className="space-y-6">
      <HrKpiGrid />
      {/* Add HR-specific charts and tables here */}
      <div className="text-center text-muted-foreground p-8 border-dashed border-2 rounded-lg">
        [HR-Specific Charts and Data Tables for Training Records and Compliance Details Would Go Here]
      </div>
    </div>
  );
}
