'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const viewerKpis = [
    { title: "Overall Site Production", value: "On Track" },
    { title: "Overall Safety Status", value: "Stable" },
    { title: "Overall Compliance", value: "Compliant" },
];

export function ViewerDashboard() {
  return (
    <div className="space-y-6">
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {viewerKpis.map((kpi, index) => (
            <Card key={index}>
                <CardHeader>
                    <CardTitle className="text-base text-muted-foreground">{kpi.title}</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-3xl font-bold font-headline text-primary">{kpi.value}</p>
                </CardContent>
            </Card>
        ))}
       </div>
       <div className="text-center text-muted-foreground p-8 border-dashed border-2 rounded-lg">
            [High-level rollup charts would be displayed here. No detailed drill-down information is available for the Viewer role.]
       </div>
    </div>
  );
}
