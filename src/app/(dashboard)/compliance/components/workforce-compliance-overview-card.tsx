'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import type { ChartConfig } from "@/components/ui/chart";

const chartData = [
    { type: 'All', compliant: 98.7, expiring: 0.8, nonCompliant: 0.5 },
    { type: 'Veralogix', compliant: 99.1, expiring: 0.7, nonCompliant: 0.2 },
    { type: 'MACMAHON', compliant: 97.2, expiring: 1.5, nonCompliant: 1.3 },
];

const chartConfig = {
  compliant: { label: "Compliant", color: "hsl(var(--chart-1))" },
  expiring: { label: "Expiring Soon", color: "hsl(var(--chart-2))" },
  nonCompliant: { label: "Non-Compliant", color: "hsl(var(--chart-5))" },
} satisfies ChartConfig;

export function WorkforceComplianceOverviewCard() {
    return (
        <Card className="card-hover">
            <CardHeader>
                <CardTitle>Compliance Overview</CardTitle>
                <CardDescription>Breakdown by workforce category.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <ToggleGroup type="single" defaultValue="all" variant="outline" className="w-full">
                    <ToggleGroupItem value="all" className="flex-1">All</ToggleGroupItem>
                    <ToggleGroupItem value="own" className="flex-1">Veralogix</ToggleGroupItem>
                    <ToggleGroupItem value="contractor" className="flex-1">Contractor</ToggleGroupItem>
                </ToggleGroup>
                
                <div className="h-40 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                         <BarChart layout="vertical" data={chartData} stackOffset="expand" margin={{top: 0, right: 0, left: -20, bottom: 0}}>
                            <XAxis type="number" hide domain={[0, 100]} />
                            <YAxis type="category" dataKey="type" hide />
                            <ChartTooltip
                                cursor={false}
                                content={<ChartTooltipContent />}
                            />
                            <Bar dataKey="compliant" fill="var(--color-compliant)" stackId="a" />
                            <Bar dataKey="expiring" fill="var(--color-expiring)" stackId="a" />
                            <Bar dataKey="nonCompliant" fill="var(--color-nonCompliant)" stackId="a" radius={[4,4,4,4]}/>
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                <div className="text-xs text-muted-foreground grid grid-cols-3 gap-2">
                    <div className="flex items-center gap-1.5">
                        <span className="size-2 rounded-full bg-chart-1" />
                        <span>Compliant</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <span className="size-2 rounded-full bg-chart-2" />
                        <span>Expiring Soon</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <span className="size-2 rounded-full bg-chart-5" />
                        <span>Non-Compliant</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
