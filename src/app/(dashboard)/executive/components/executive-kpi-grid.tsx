
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { StatusPill } from "@/components/shared/status-pill";

const kpis = [
    { title: "Cost per Tonne (ZAR)", value: "R385.10", trend: "+2.5% vs target", status: "Warning" },
    { title: "Tonnes Moved (Shift/MTD)", value: "12.4k / 188k", trend: "On track", status: "OK" },
    { title: "Haulage Uplift", value: "+8.1%", trend: "vs baseline", status: "OK" },
    { title: "Safety Status", value: "Watch", trend: "1 new incident", status: "Warning" }
];

export function ExecutiveKpiGrid() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {kpis.map((kpi) => (
                <Card key={kpi.title} className="card-hover">
                    <CardHeader>
                        <CardTitle className="text-base font-medium text-muted-foreground">{kpi.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-baseline justify-between">
                            <p className="text-4xl font-bold font-headline">{kpi.value}</p>
                            <StatusPill status={kpi.status as "OK" | "Warning"} />
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">{kpi.trend}</p>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
