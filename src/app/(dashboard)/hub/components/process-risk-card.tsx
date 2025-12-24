'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const riskItems = [
    "No density sensors on tailings line to dam.",
    "Blockage and spillage sensors missing on conveyor section B.",
    "No PH monitoring at thickener overflow.",
];

export function ProcessRiskCard() {
    return (
        <Card className="card-hover">
            <CardHeader>
                <div className="flex justify-between items-start">
                    <div>
                        <CardTitle>AI Process Risk</CardTitle>
                        <CardDescription>Identified gaps in sensor coverage.</CardDescription>
                    </div>
                    <Badge variant="outline" className="border-accent text-accent text-xs">AI Risk Score</Badge>
                </div>
            </CardHeader>
            <CardContent className="space-y-4">
                <p className="text-5xl font-bold font-headline text-primary">45<span className="text-3xl text-muted-foreground">/100</span></p>

                <ul className="space-y-3">
                    {riskItems.map((item, index) => (
                        <li key={index} className="flex items-start gap-3 text-sm">
                            <span className="mt-1.5 size-2 shrink-0 rounded-full bg-primary" />
                            <p className="text-muted-foreground">{item}</p>
                        </li>
                    ))}
                </ul>

                <p className="text-xs text-muted-foreground/50 pt-2">AI-generated – subject to engineering review.</p>
            </CardContent>
        </Card>
    );
}
