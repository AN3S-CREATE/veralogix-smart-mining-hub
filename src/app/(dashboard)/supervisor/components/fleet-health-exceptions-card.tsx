
'use client'

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { AlertTriangle, Tractor, Wind } from "lucide-react";

const loadData = [
  { status: 'Under', value: 10, color: 'bg-chart-2' },
  { status: 'Optimal', value: 82, color: 'bg-chart-1' },
  { status: 'Over', value: 8, color: 'bg-chart-4' },
];

const exceptions = [
    { text: 'TRK-205: Repeated underloading (3x)', icon: Tractor },
    { text: 'TRK-112: Out of service (Workshop)', icon: Tractor },
    { text: 'Haul Road C: Closed for maintenance', icon: Wind },
    { text: 'SHOVEL-2: High queue time (>15m)', icon: AlertTriangle },
];

export function FleetHealthExceptionsCard() {
  return (
    <Card className="card-hover">
      <CardHeader>
        <CardTitle>Fleet Health & Exceptions</CardTitle>
        <CardDescription>Load distribution and active operational issues.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h4 className="text-sm font-medium mb-2">Load Distribution Snapshot</h4>
          <div className="flex w-full h-3 rounded-full overflow-hidden bg-secondary">
            {loadData.map((d, i) => (
              <div key={i} style={{ width: `${d.value}%` }} className={d.color} />
            ))}
          </div>
          <div className="mt-2 flex justify-between text-xs text-muted-foreground">
            {loadData.map((d, i) => (
              <span key={i} className="flex items-center gap-1.5">
                <span className={`size-2 rounded-full ${d.color}`} />
                {d.status} ({d.value}%)
              </span>
            ))}
          </div>
        </div>

        <Separator />

        <div>
            <h4 className="text-sm font-medium">Carryback Estimate</h4>
            <p className="text-2xl font-bold font-headline">1.8 <span className="text-base text-muted-foreground font-sans">tonnes</span></p>
            <p className="text-xs text-muted-foreground">Based on empty-load data.</p>
        </div>

        <Separator />

        <div>
          <h4 className="text-sm font-medium mb-2">Active Exceptions</h4>
          <ul className="space-y-3">
            {exceptions.map((ex, i) => (
                <li key={i} className="flex items-start gap-3 text-sm">
                    <ex.icon className="size-4 mt-0.5 text-primary" />
                    <span>{ex.text}</span>
                </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
