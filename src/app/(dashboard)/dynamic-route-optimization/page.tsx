import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { MapShell } from "@/components/shared/map-shell";
import { KPITile } from "@/components/shared/kpi-tile";
import { ModuleDataTable } from "@/components/shared/module-data-table";

const routeSuggestions = [
    { truckId: 'TRK-205', currentRoute: 'Haul Rd A', suggestedRoute: 'Ramp 3 Bypass', reason: 'Congestion detected', etaSaving: '2.5 min' },
    { truckId: 'TRK-118', currentRoute: 'Haul Rd C', suggestedRoute: 'Haul Rd C', reason: 'Optimal route', etaSaving: '0 min' },
    { truckId: 'TRK-301', currentRoute: 'Service Rd 1', suggestedRoute: 'Service Rd 2', reason: 'Degraded road surface', etaSaving: '1.2 min' },
];

const columns = [
    { accessorKey: 'truckId', header: 'Truck ID' },
    { accessorKey: 'currentRoute', header: 'Current Route' },
    { accessorKey: 'suggestedRoute', header: 'Suggested Route' },
    { accessorKey: 'reason', header: 'Reason' },
    { accessorKey: 'etaSaving', header: 'Est. Time Saved' },
];

export default function DynamicRouteOptimizationPage() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-headline font-semibold text-primary">Dynamic Route Optimization</h1>
        <p className="text-muted-foreground">AI-powered haul truck path suggestions for real-time efficiency gains.</p>
      </header>
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <KPITile title="Avg. Cycle Time" value="33.8" unit="min" trend="down" trendValue="-1.2 min vs avg" />
            <KPITile title="Total Time Saved" value="18.4" unit="min" trend="up" trendValue="This shift" isAI />
            <KPITile title="Active Suggestions" value="3" unit="" trend="flat" trendValue="2 Applied" isAI />
            <KPITile title="Route Compliance" value="96.7" unit="%" trend="up" trendValue="+2% vs last shift" />
       </div>
      <Card>
        <CardHeader>
          <CardTitle>Haulage Map</CardTitle>
          <CardDescription>Live view of all haul trucks with AI-suggested optimal routing.</CardDescription>
        </CardHeader>
        <MapShell />
      </Card>
      <ModuleDataTable 
        title="AI Route Suggestions"
        description="Real-time recommendations for route optimization."
        columns={columns}
        data={routeSuggestions}
      />
    </div>
  );
}
