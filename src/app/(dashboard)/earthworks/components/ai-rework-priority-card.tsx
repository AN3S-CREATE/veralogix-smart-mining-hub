'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2 } from 'lucide-react';
import { generateReworkSuggestions } from '@/ai/flows/rework-suggestions';
import type { ReworkSuggestionsOutput } from '@/ai/flows/rework-suggestions';

const priorityMap: Record<string, string> = {
    High: "text-destructive border-destructive",
    Medium: "text-accent border-accent",
    Low: "text-muted-foreground border-muted-foreground",
};

const MOCK_OPERATIONAL_DATA = `
- Near Miss Data: 5 events on Ramp 3 North in last 24h. 2 events at East Dump intersection.
- Road Conditions: Vibration sensors on TRK-205 and TRK-312 show high readings on Ramp 3. Gradient sensor on Grader G-01 shows out-of-spec readings for Ramp 3.
- Queue Times: High queue time (>10 mins) reported at Shovel 4, impacting traffic on Bench B-07 approach.
- Operator Reports: Operator of TRK-118 reported 'slippery conditions' on Bench B-07.
`;

export function AiReworkPriorityCard() {
    const [reworkItems, setReworkItems] = useState<ReworkSuggestionsOutput['suggestions']>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSuggestions = async () => {
            setLoading(true);
            try {
                const result = await generateReworkSuggestions({ operationalData: MOCK_OPERATIONAL_DATA });
                setReworkItems(result.suggestions);
            } catch (error) {
                console.error("Failed to fetch AI rework suggestions:", error);
                // Fallback to mock data on error
                setReworkItems([
                    { id: "R-14", priority: "High", reason: "Repeated near-misses and out-of-spec gradient." },
                    { id: "Ramp 3 North", priority: "Medium", reason: "Poor surface combined with high queue time." },
                ]);
            } finally {
                setLoading(false);
            }
        };
        fetchSuggestions();
    }, []);


    return (
        <Card className="card-hover">
            <CardHeader>
                <CardTitle>AI rework suggestions</CardTitle>
                <CardDescription>Ranked list of road segments requiring attention.</CardDescription>
            </CardHeader>
            <CardContent>
                {loading ? (
                    <div className="flex items-center justify-center h-24">
                        <Loader2 className="size-8 animate-spin text-primary" />
                    </div>
                ) : (
                    <ul className="space-y-4">
                        {reworkItems.map((item) => (
                            <li key={item.id} className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                               <div className="flex-1">
                                    <p className="font-bold">{item.id}</p>
                                    <p className="text-sm text-muted-foreground">{item.reason}</p>
                               </div>
                               <Badge variant="outline" className={`shrink-0 ${priorityMap[item.priority]}`}>{item.priority} Priority</Badge>
                            </li>
                        ))}
                    </ul>
                )}
                <p className="text-xs text-muted-foreground/50 mt-6">AI-generated ranking – final priority to be confirmed by engineering.</p>
            </CardContent>
        </Card>
    );
}
