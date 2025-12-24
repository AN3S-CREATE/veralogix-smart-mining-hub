'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

const kpis = [
  { label: "Tailings dam sensor coverage", value: 65 },
  { label: "pH monitoring coverage", value: 50 },
  { label: "Spillage/Blockage sensors on lines to dam", value: 40 },
];

const recommendations = [
    "Add density and flow measurement on tailings discharge lines to improve stability monitoring.",
    "Install level sensors in all catchment sumps to prevent unmanaged overflow events.",
    "Schedule inspection of return water pump seals based on increased vibration data.",
];

export function TailingsRiskCard() {
  const riskScore = 68;

  return (
    <Card className="card-hover">
      <CardHeader>
        <CardTitle>Tailings & Return Water Risk</CardTitle>
        <CardDescription>Consolidated view of sensor gaps and AI-identified risks.</CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <div className="space-y-6">
          {kpis.map((kpi) => (
            <div key={kpi.label}>
              <div className="flex justify-between items-baseline mb-1">
                <p className="text-sm font-medium">{kpi.label}</p>
                <p className="text-sm text-muted-foreground font-bold">{kpi.value}%</p>
              </div>
              <Progress value={kpi.value} className="h-2" />
            </div>
          ))}
        </div>
        
        <div className="space-y-4">
            <div className="flex justify-between items-start">
                <h4 className="font-medium">AI Risk Score</h4>
                <Badge variant="outline" className="border-accent text-accent text-xs">AI Insight</Badge>
            </div>
            <div className="relative">
                <Progress value={riskScore} className="h-6" />
                <div className="absolute inset-0 flex items-center justify-center">
                     <p className="font-bold text-lg text-white">{riskScore}/100</p>
                </div>
            </div>
             <ul className="space-y-3 pt-2">
                {recommendations.map((rec, index) => (
                    <li key={index} className="flex items-start gap-3 text-sm">
                        <span className="mt-1.5 size-2 shrink-0 rounded-full bg-primary" />
                        <p className="text-muted-foreground">{rec}</p>
                    </li>
                ))}
            </ul>
        </div>
      </CardContent>
    </Card>
  );
}
