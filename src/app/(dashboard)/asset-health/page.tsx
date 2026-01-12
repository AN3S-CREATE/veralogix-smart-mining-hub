'use client';

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { KPITile } from "@/components/shared/kpi-tile";
import { ModuleDataTable } from "@/components/shared/module-data-table";

const assetData = [
    { assetId: 'TRK-205', class: 'Haul Truck', health: '82%', status: 'Warning', prediction: 'Bearing failure in 48h' },
    { assetId: 'EXC-03', class: 'Excavator', health: '95%', status: 'OK', prediction: 'Nominal' },
    { assetId: 'DOZ-08', class: 'Dozer', health: '75%', status: 'Alert', prediction: 'Hydraulic pressure drop' },
    { assetId: 'GRD-01', class: 'Grader', health: '99%', status: 'OK', prediction: 'Nominal' },
];

const columns = [
    { accessorKey: 'assetId', header: 'Asset ID' },
    { accessorKey: 'class', header: 'Class' },
    { accessorKey: 'health', header: 'Health Score' },
    { accessorKey: 'status', header: 'Status' },
    { accessorKey: 'prediction', header: 'AI Prediction' },
];

export default function AssetHealthPage() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-headline font-semibold text-primary">Fleet & Haulage Analytics</h1>
        <p className="text-muted-foreground">Monitor and predict the health of your entire fleet.</p>
      </header>
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPITile title="Avg. Fleet Health" value="89.5" unit="%" trend="down" trendValue="-1.2% vs last week" />
        <KPITile title="Critical Alerts" value="2" unit="" trend="up" trendValue="TRK-205, DOZ-08" />
        <KPITile title="Maintenance Backlog" value="4" unit="assets" trend="flat" trendValue="Stable" />
        <KPITile title="Est. Downtime (24h)" value="12" unit="hrs" trend="down" trendValue="Improved from 18h" isAI />
       </div>

      <ModuleDataTable
        title="Asset Health Overview"
        description="Real-time health scores and predictive maintenance alerts for the fleet."
        columns={columns}
        data={assetData}
      />
    </div>
  );
}
