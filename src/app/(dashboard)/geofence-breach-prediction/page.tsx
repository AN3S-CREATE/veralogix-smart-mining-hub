import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { MapShell } from "@/components/shared/map-shell";
import { KPITile } from "@/components/shared/kpi-tile";
import { ModuleDataTable } from "@/components/shared/module-data-table";

const breachPredictions = [
    { assetId: 'TRK-109', probability: '85%', timeToBreach: '45s', zone: 'Pit A Boundary', status: 'Alerted' },
    { assetId: 'LDV-04', probability: '60%', timeToBreach: '1m 30s', zone: 'Workshop Keep-out', status: 'Watching' },
    { assetId: 'TRK-211', probability: '92%', timeToBreach: '25s', zone: 'Blast Zone South', status: 'Alerted & Intervened' },
];

const columns = [
    { accessorKey: 'assetId', header: 'Asset ID' },
    { accessorKey: 'probability', header: 'Breach Probability' },
    { accessorKey: 'timeToBreach', header: 'Est. Time to Breach' },
    { accessorKey: 'zone', header: 'Geofence Zone' },
    { accessorKey: 'status', header: 'Status' },
];

export default function GeofenceBreachPage() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-headline font-semibold text-primary">Geofence Breach Prediction</h1>
        <p className="text-muted-foreground">Proactive alerts for potential geofence boundary crossings.</p>
      </header>
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <KPITile title="Active Predictions" value="3" unit="" trend="up" trendValue="+1 in last hour" isAI />
            <KPITile title="Interventions Today" value="2" unit="" trend="down" trendValue="Fewer manual overrides" />
            <KPITile title="Prediction Accuracy" value="97.3" unit="%" trend="up" trendValue="Model v2.1" isAI />
            <KPITile title="High-Risk Zones" value="2" unit="" trend="flat" trendValue="Pit A, Blast Zone" />
       </div>
      <Card>
        <CardHeader>
          <CardTitle>Site Geofence Map</CardTitle>
          <CardDescription>Live map showing vehicle trajectories and predicted breach alerts.</CardDescription>
        </CardHeader>
        <MapShell />
      </Card>
      <ModuleDataTable
        title="Live Breach Predictions"
        description="AI-powered predictions of potential geofence breaches."
        columns={columns}
        data={breachPredictions}
        />
    </div>
  );
}
