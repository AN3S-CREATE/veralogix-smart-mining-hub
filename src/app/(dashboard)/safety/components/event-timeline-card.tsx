
'use client';

import { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend } from "recharts";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { ChartConfig } from "@/components/ui/chart"
import { useFirestore, useCollection, useMemoFirebase } from "@/firebase";
import { collection, query, where, Timestamp } from "firebase/firestore";
import { subDays, format, startOfDay, endOfDay } from 'date-fns';
import { Loader2 } from "lucide-react";

const chartConfig = {
  Low: {
    label: "Low",
    color: "hsl(var(--chart-1))",
  },
  Medium: {
    label: "Medium",
    color: "hsl(var(--chart-2))",
  },
  High: {
    label: "High",
    color: "hsl(var(--chart-4))",
  },
  Critical: {
    label: "Critical",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig

export function EventTimelineCard() {
  const firestore = useFirestore();
  
  const sevenDaysAgo = useMemo(() => subDays(new Date(), 7), []);

  const alertsQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(
      collection(firestore, 'alerts'),
      where('createdAt', '>=', Timestamp.fromDate(sevenDaysAgo))
    );
  }, [firestore, sevenDaysAgo]);

  const { data: alerts, loading, error } = useCollection(alertsQuery);

  const chartData = useMemo(() => {
    if (!alerts) return [];

    const dailyData: { [key: string]: { date: string; Low: number; Medium: number; High: number; Critical: number } } = {};
    
    // Initialize data for the last 7 days
    for (let i = 0; i < 7; i++) {
        const date = subDays(new Date(), i);
        const formattedDate = format(date, 'E'); // "Mon", "Tue", etc.
        dailyData[formattedDate] = { date: formattedDate, Low: 0, Medium: 0, High: 0, Critical: 0 };
    }

    alerts.forEach(alert => {
        // Firebase timestamps can be null if data is not yet synced from server.
        if (!alert.createdAt) return;

        const alertDate = alert.createdAt.toDate();
        const formattedDate = format(alertDate, 'E');

        if (dailyData[formattedDate] && alert.severity) {
            const severity = alert.severity as keyof typeof chartConfig;
            if (dailyData[formattedDate][severity] !== undefined) {
                dailyData[formattedDate][severity]++;
            }
        }
    });

    return Object.values(dailyData).reverse(); // a week ago to today
  }, [alerts]);


  return (
    <Card className="card-hover">
      <CardHeader>
         <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div>
                <CardTitle>Event Timeline (Last 7 Days)</CardTitle>
                <CardDescription>Daily breakdown of safety events by severity.</CardDescription>
            </div>
            <div className="flex gap-2">
                <Select defaultValue="all-sites">
                    <SelectTrigger className="w-[130px]"><SelectValue placeholder="Select Site" /></SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all-sites">All Sites</SelectItem>
                        <SelectItem value="site-a">Site A</SelectItem>
                    </SelectContent>
                </Select>
                 <Select defaultValue="all-classes">
                    <SelectTrigger className="w-[150px]"><SelectValue placeholder="Machine Class" /></SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all-classes">All Classes</SelectItem>
                        <SelectItem value="haul-truck">Haul Truck</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-64 w-full">
          {loading && <div className="flex items-center justify-center h-full"><Loader2 className="size-8 animate-spin text-primary" /></div>}
          {error && <p className="text-destructive text-center">Error loading timeline data.</p>}
          {!loading && !error && (
            <ChartContainer config={chartConfig}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border) / 0.5)" />
                  <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                  <ChartTooltip
                    cursor={{ fill: 'hsl(var(--secondary))' }}
                    content={<ChartTooltipContent />}
                  />
                  <Legend iconSize={10} wrapperStyle={{fontSize: "12px"}}/>
                  <Bar dataKey="Low" stackId="a" fill="var(--color-Low)" name="Low" radius={[0, 0, 0, 0]} />
                  <Bar dataKey="Medium" stackId="a" fill="var(--color-Medium)" name="Medium" radius={[0, 0, 0, 0]} />
                  <Bar dataKey="High" stackId="a" fill="var(--color-High)" name="High" radius={[0, 0, 0, 0]} />
                  <Bar dataKey="Critical" stackId="a" fill="var(--color-Critical)" name="Critical" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
