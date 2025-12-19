
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const recommendations = [
  "Install density and flow sensors on tailings pipeline to improve dam monitoring.",
  "Add spillage and blockage sensors on conveyor section feeding the crusher.",
  "Complete tyre-pressure monitoring installation for remaining haul trucks.",
  "Deploy dust monitoring units near sensitive community areas as per EIA.",
  "Retrofit older FELs with automatic braking systems to match fleet standard.",
];

export function AiSensorAdvisorCard() {
  return (
    <Card className="card-hover">
      <CardHeader className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
        <div>
          <CardTitle className="flex items-center gap-2">
            AI Sensor Advisor
            <Badge variant="outline" className="border-accent text-accent text-xs">AI Insight</Badge>
          </CardTitle>
          <CardDescription>
            AI summary of the most important sensor gaps across mobile fleet, roads, plant and tailings.
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3">
          {recommendations.map((rec, index) => (
            <li key={index} className="flex items-start gap-3 text-sm">
              <span className="mt-1.5 size-2 shrink-0 rounded-full bg-primary" />
              <p className="text-muted-foreground">{rec}</p>
            </li>
          ))}
        </ul>
      </CardContent>
      <div className="p-6 pt-0">
          <p className="text-xs text-muted-foreground/50">AI-generated – subject to engineering review.</p>
      </div>
    </Card>
  );
}
