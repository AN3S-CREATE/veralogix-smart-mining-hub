
'use client';

import { useMemo } from 'react';
import { useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, query, orderBy, limit } from 'firebase/firestore';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Loader2 } from 'lucide-react';

// Mock cost assumptions
const HOURLY_COST = 400; // ZAR per hour
const FUEL_PER_HOUR = 20; // Liters per hour

export function ReworkAnalysisCard() {
    const firestore = useFirestore();

    const downtimeQuery = useMemoFirebase(() => {
        if (!firestore) return null;
        return query(collection(firestore, 'downtimeFlags'), orderBy('startTime', 'desc'), limit(10));
    }, [firestore]);

    const { data: downtimeFlags, loading, error } = useCollection(downtimeQuery);

    const { reworkData, problemSegments } = useMemo(() => {
        if (!downtimeFlags) {
            return { reworkData: [], problemSegments: [] };
        }

        const data = downtimeFlags.map(flag => {
            // Mocking hours for demo as endTime is not always present
            const hours = Math.random() * 5 + 1; 
            const fuel = hours * FUEL_PER_HOUR;
            const cost = hours * HOURLY_COST;
            return {
                id: flag.id,
                site: flag.reason,
                assetId: flag.assetId,
                hours: hours,
                fuel: fuel,
                cost: cost
            };
        });

        const segmentCounts: { [key: string]: number } = {};
        downtimeFlags.forEach(flag => {
            segmentCounts[flag.reason] = (segmentCounts[flag.reason] || 0) + 1;
        });

        const sortedSegments = Object.entries(segmentCounts)
            .sort(([, a], [, b]) => b - a)
            .slice(0, 3)
            .map(([reason]) => reason);

        return { reworkData: data, problemSegments: sortedSegments };

    }, [downtimeFlags]);

    return (
        <Card className="card-hover">
            <CardHeader>
                <CardTitle>Rework & Cost Analysis</CardTitle>
                <CardDescription>Breakdown of rework effort and associated costs based on recent downtime flags.</CardDescription>
            </CardHeader>
            <CardContent>
                 {loading && <div className="flex justify-center items-center h-48"><Loader2 className="size-8 animate-spin text-primary" /></div>}
                 {error && <p className="text-destructive text-center">Error loading rework data.</p>}
                 {!loading && !error && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="md:col-span-2">
                             <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Asset ID</TableHead>
                                        <TableHead>Reason (Site/Segment)</TableHead>
                                        <TableHead>Rework (hrs)</TableHead>
                                        <TableHead>Fuel (L)</TableHead>
                                        <TableHead>Est. Cost (ZAR)</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {reworkData.slice(0,4).map((row) => (
                                        <TableRow key={row.id}>
                                            <TableCell className="font-mono text-xs">{row.assetId}</TableCell>
                                            <TableCell>{row.site}</TableCell>
                                            <TableCell>{row.hours.toFixed(1)}</TableCell>
                                            <TableCell>{row.fuel.toFixed(0)}</TableCell>
                                            <TableCell>R{row.cost.toLocaleString(undefined, { maximumFractionDigits: 0 })}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                        <div className="md:col-span-1">
                            <h4 className="font-medium mb-2">Top 3 Problem Segments</h4>
                             {problemSegments.length > 0 ? (
                                <ul className="space-y-3 text-sm text-muted-foreground">
                                    {problemSegments.map((segment, index) => (
                                       <li key={index} className="flex items-start gap-2">
                                        <span className="mt-1 size-2 shrink-0 rounded-full bg-accent" />
                                        <span>{segment}</span>
                                       </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-sm text-muted-foreground">No recurring problem segments identified.</p>
                            )}
                        </div>
                    </div>
                 )}
            </CardContent>
        </Card>
    );
}
