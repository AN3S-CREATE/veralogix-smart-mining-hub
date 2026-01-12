'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, Loader2 } from "lucide-react";
import { detectAnomalies } from '@/ai/flows/anomaly-detection';
import type { AnomalyDetectionOutput } from '@/ai/flows/anomaly-detection';

const MOCK_OPERATIONAL_DATA = `
- Fleet Performance: Truck TRK-107 has an idle time of 25%, while the fleet average is 12%.
- Cycle Times: Shovel SHV-02 cycle time is 8% above its 24-hour baseline. All other shovels are nominal.
- Sensor Data: Vibration sensors on Ramp C have shown a 15% increase in amplitude over the last 3 hours.
- Operator Reports: No new operator reports in the last hour.
`;

export function AiAnomalyWatchCard() {
    const [anomalies, setAnomalies] = useState<AnomalyDetectionOutput['anomalies']>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAnomalies = async () => {
            setLoading(true);
            try {
                const result = await detectAnomalies({ operationalData: MOCK_OPERATIONAL_DATA });
                setAnomalies(result.anomalies);
            } catch (error) {
                console.error("Failed to fetch AI anomalies:", error);
                // Fallback to mock data on error
                setAnomalies([
                    { text: "Truck TRK-107: unusually high idle time vs fleet average.", detailsLink: "#" },
                    { text: "Shovel SHV-02: cycle time trending 8% above normal baseline.", detailsLink: "#" },
                    { text: "Ramp C: Increased vibration data suggests potential road degradation.", detailsLink: "#" },
                ]);
            } finally {
                setLoading(false);
            }
        };
        fetchAnomalies();
    }, []);

    return (
        <Card className="card-hover">
            <CardHeader>
                <div className="flex justify-between items-start">
                    <div>
                        <CardTitle>AI Anomaly Watch</CardTitle>
                        <CardDescription>Key performance deviations detected this shift.</CardDescription>
                    </div>
                    <Badge variant="outline" className="border-accent text-accent text-xs">AI Anomaly Detection</Badge>
                </div>
            </CardHeader>
            <CardContent className="space-y-4">
                {loading ? (
                    <div className="flex justify-center items-center h-24">
                        <Loader2 className="size-8 animate-spin text-primary" />
                    </div>
                ) : (
                    <>
                        <ul className="space-y-3">
                            {anomalies.map((anomaly, index) => (
                                <li key={index} className="flex items-start gap-3 text-sm">
                                    <AlertCircle className="size-4 mt-0.5 text-primary shrink-0" />
                                    <div>
                                        <p className="text-muted-foreground">{anomaly.text}</p>
                                        <a href={anomaly.detailsLink} className="text-xs text-primary hover:underline">View details</a>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <p className="text-xs text-muted-foreground/50 pt-2">AI-generated – subject to human review.</p>
                    </>
                )}
            </CardContent>
        </Card>
    );
}
