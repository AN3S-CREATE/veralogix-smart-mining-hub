
'use client'

import { useMemo, useState, useEffect } from 'react';
import { useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, query, where, orderBy, limit, Timestamp } from 'firebase/firestore';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ChartConfig } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { Loader2 } from 'lucide-react';
import { differenceInMinutes } from 'date-fns';

const chartConfig = {
  value: { label: 'Cycles' },
} satisfies ChartConfig;

export function CycleQueueIntelligenceCard() {
  const firestore = useFirestore();
  const [passportsQuery, setPassportsQuery] = useState<Query | null>(null);

  useEffect(() => {
    if (firestore) {
      const twelveHoursAgo = new Date(Date.now() - 12 * 60 * 60 * 1000);
      const q = query(
        collection(firestore, 'loadPassports'),
        where('status', '==', 'Completed'),
        where('createdAt', '>=', Timestamp.fromDate(twelveHoursAgo)),
        orderBy('createdAt', 'desc')
      );
      setPassportsQuery(q);
    }
  }, [firestore]);
  

  const { data: passports, loading, error } = useCollection(passportsQuery);

  const { cycleTimeBands, slowestCycles } = useMemo(() => {
    if (!passports) {
      return { cycleTimeBands: [], slowestCycles: [] };
    }

    const cycles = passports.map(p => {
      const startTime = p.createdAt.toDate();
      const endTime = p.lastUpdatedAt.toDate();
      const duration = differenceInMinutes(endTime, startTime);
      return {
        truckId: p.vehicleId,
        duration,
        // Mocking reason for now as it's not in the data model
        reason: ['Queue', 'Road Condition', 'Mechanical'][Math.floor(Math.random() * 3)],
        loadingPoint: p.origin,
      };
    }).filter(c => c.duration > 0);

    const bands = {
      short: cycles.filter(c => c.duration < 30).length,
      normal: cycles.filter(c => c.duration >= 30 && c.duration <= 38).length,
      long: cycles.filter(c => c.duration > 38).length,
    };
    
    const cycleTimeChartData = [
        { name: 'Short (<30m)', value: bands.short, fill: 'var(--color-chart-5)' },
        { name: 'Normal (30-38m)', value: bands.normal, fill: 'var(--color-chart-1)' },
        { name: 'Long (>38m)', value: bands.long, fill: 'var(--color-chart-2)' },
    ];

    const sortedSlowest = [...cycles].sort((a, b) => b.duration - a.duration).slice(0, 5);

    return { cycleTimeBands: cycleTimeChartData, slowestCycles: sortedSlowest };
  }, [passports]);

  return (
    <Card className="card-hover">
      <CardHeader>
        <CardTitle>Cycle & Queue Intelligence</CardTitle>
        <CardDescription>Analysis of haulage cycle performance.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {loading || !passportsQuery ? (
            <div className="flex justify-center items-center h-64"><Loader2 className="size-8 animate-spin text-primary" /></div>
        ) : error ? (
            <p className="text-destructive text-center">Error loading cycle data.</p>
        ) : (
          <>
            <div>
              <h4 className="text-sm font-medium mb-2">Cycle Time Bands</h4>
               <div className="h-40 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={cycleTimeBands} layout="vertical" margin={{ left: 10, right: 10 }}>
                    <XAxis type="number" hide />
                    <YAxis dataKey="name" type="category" width={80} tickLine={false} axisLine={false} tick={{fontSize: 12, fill: 'hsl(var(--muted-foreground))'}} />
                    <Tooltip cursor={{ fill: 'hsl(var(--secondary))' }} contentStyle={{backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))'}}/>
                    <Bar dataKey="value" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
               </div>
            </div>
            <Separator />
             <div>
              <h4 className="text-sm font-medium mb-2">Slowest 5 Cycles this Shift</h4>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Truck</TableHead>
                    <TableHead>Cycle</TableHead>
                    <TableHead>Reason</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {slowestCycles.map((cycle, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-mono text-xs">{cycle.truckId}</TableCell>
                      <TableCell>{cycle.duration.toFixed(1)}m</TableCell>
                      <TableCell>{cycle.reason}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
