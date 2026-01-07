
'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lightbulb } from "lucide-react";

const recommendations = [
  "Increase target payload by 3% on TRK-210 and TRK-214 (consistently under target).",
  "Reduce trucks on Route B from 6 to 5; reassign 1 truck to Route A to balance queues.",
  "Focus coaching on loader at Shovel 1 – frequent underloads in last 24h.",
];

export function AiPayloadRoutingCard() {
  return (
    <Card className="card-hover">
      <CardHeader>
        <CardTitle>AI suggests…</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <ul className="space-y-3">
          {recommendations.map((item, index) => (
            <li key={index} className="flex items-start gap-3 text-sm">
              <Lightbulb className="size-4 mt-1 text-accent shrink-0" />
              <p className="text-muted-foreground">{item}</p>
            </li>
          ))}
        </ul>
        <p className="text-xs text-muted-foreground/50 pt-2">AI-generated coaching suggestions – supervisor approval required.</p>
      </CardContent>
    </Card>
  );
}
