'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { PlantUnit } from "./process-flow-band";
import { CheckCircle2, XCircle } from "lucide-react";

interface ProcessUnitDetailsCardProps {
    unit: PlantUnit;
}

const mockSensorData = {
    Feedrate: { installed: ['Weight', 'Flow'], missing: ['Density'] },
    Quality: { installed: ['Weight'], missing: ['Density', 'Sampling', 'Sizing'] },
    Conditions: { installed: ['Bearing temps', 'Vibration', 'On/off'], missing: ['Blockages', 'Spillage'] },
};

const mockAiInsight = {
    explanation: "AI flags risk of undetected blockages on this conveyor because spillage and blockage sensors are missing and vibration is trending higher.",
    recommendations: [
        "Add blockage sensors on return conveyor section.",
        "Tighten vibration alarm thresholds for this unit.",
    ]
}

const SensorList = ({ title, installed, missing }: { title: string, installed: string[], missing: string[] }) => (
    <div>
        <h4 className="font-medium mb-2">{title}</h4>
        <ul className="space-y-2 text-sm">
            {installed.map(sensor => (
                <li key={sensor} className="flex items-center gap-2">
                    <CheckCircle2 className="size-4 text-primary" />
                    <span className="text-foreground">{sensor}</span>
                </li>
            ))}
            {missing.map(sensor => (
                <li key={sensor} className="flex items-center gap-2">
                    <XCircle className="size-4 text-destructive" />
                    <span className="text-muted-foreground">{sensor} (Missing)</span>
                </li>
            ))}
        </ul>
    </div>
);


export function ProcessUnitDetailsCard({ unit }: ProcessUnitDetailsCardProps) {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            <Card className="card-hover">
                <CardHeader>
                    <CardTitle>Measurement Stack: {unit.name}</CardTitle>
                    <CardDescription>Sensor status for the selected process unit.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <SensorList title="Feedrate" {...mockSensorData.Feedrate} />
                    <SensorList title="Quality" {...mockSensorData.Quality} />
                    <SensorList title="Conditions" {...mockSensorData.Conditions} />
                </CardContent>
            </Card>

            <Card className="card-hover">
                 <CardHeader>
                    <div className="flex justify-between items-start">
                        <div>
                            <CardTitle>AI Process Insight</CardTitle>
                            <CardDescription>AI-driven analysis for {unit.name}.</CardDescription>
                        </div>
                        <Badge variant="outline" className="border-accent text-accent text-xs">AI Insight</Badge>
                    </div>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p className="text-muted-foreground">{mockAiInsight.explanation}</p>
                    <div>
                        <h4 className="font-medium mb-2">Recommendations:</h4>
                         <ul className="space-y-3">
                            {mockAiInsight.recommendations.map((rec, index) => (
                                <li key={index} className="flex items-start gap-3 text-sm">
                                    <span className="mt-1.5 size-2 shrink-0 rounded-full bg-primary" />
                                    <p className="text-muted-foreground">{rec}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <p className="text-xs text-muted-foreground/50 pt-2">AI-generated – subject to engineering review.</p>
                </CardContent>
            </Card>
        </div>
    );
}
