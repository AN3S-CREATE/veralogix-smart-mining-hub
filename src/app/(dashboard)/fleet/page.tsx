
'use client';

import { useMemo } from 'react';
import { useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, query } from 'firebase/firestore';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { AiFuelForecastCard } from './components/ai-fuel-forecast-card';
import { AiPayloadRoutingCard } from './components/ai-payload-routing-card';
import { Loader2 } from 'lucide-react';

const payloadDistributionData = [
  { payload: '80-85%', trucks: 5 },
  { payload: '85-90%', trucks: 12 },
  { payload: '90-95%', trucks: 28 },
  { payload: '95-100%', trucks: 45 },
  { payload: '100-105%', trucks: 22 },
  { payload: '105-110%', trucks: 8 },
  { payload: '>110%', trucks: 3 },
];

export default function FleetPage() {
  const firestore = useFirestore();

  const passportsQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(collection(firestore, 'loadPassports'));
  }, [firestore]);

  const { data: passports, loading, error } = useCollection(passportsQuery);

  const { kpis, fleetData } = useMemo(() => {
    if (!passports) {
      return { kpis: [], fleetData: [] };
    }

    const totalLoads = passports.length;
    const completedLoads = passports.filter(p => p.status === 'Completed').length;
    const inProgressLoads = passports.filter(p => p.status === 'In Progress').length;
    const exceptionLoads = passports.filter(p => p.status === 'Exception').length;
    
    // This is simplified logic. Real calculations would be more complex.
    const fleetData = Array.from(new Set(passports.map(p => p.vehicleId)))
      .map(vehicleId => {
        const vehiclePassports = passports.filter(p => p.vehicleId === vehicleId);
        return {
          id: vehicleId,
          contractor: Math.random() > 0.5 ? 'Veralogix' : 'MACMAHON', // Mock
          util: 80 + Math.floor(Math.random() * 20), // Mock
          cycles: vehiclePassports.length,
          avgPayload: 95 + Math.random() * 10, // Mock
          idle: 5 + Math.floor(Math.random() * 10), // Mock
        };
      });

    const kpisData = [
      { title: 'Total Loads', value: `${totalLoads}` },
      { title: 'Completed Loads', value: `${completedLoads}` },
      { title: 'In Progress', value: `${inProgressLoads}` },
      { title: 'Exceptions', value: `${exceptionLoads}` },
      { title: 'Active Trucks', value: `${fleetData.length}` },
    ];

    return { kpis: kpisData, fleetData };
  }, [passports]);

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-headline font-semibold text-primary">
          Smart Transport
        </h1>
        <p className="text-muted-foreground">
          Vehicle loading, tracking, and quality control.
        </p>
      </header>

      {/* Filter Bar */}
      <Card>
        <CardContent className="pt-6 flex flex-wrap items-center gap-4">
          <Tabs defaultValue="shift">
            <TabsList>
              <TabsTrigger value="shift">Shift</TabsTrigger>
              <TabsTrigger value="day">Day</TabsTrigger>
              <TabsTrigger value="week">Week</TabsTrigger>
            </TabsList>
          </Tabs>
          <Select defaultValue="all-pits">
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Select Pit" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-pits">All Pits</SelectItem>
              <SelectItem value="pit-a">Pit A</SelectItem>
              <SelectItem value="pit-b">Pit B</SelectItem>
            </SelectContent>
          </Select>
          <ToggleGroup type="single" defaultValue="all" variant="outline">
            <ToggleGroupItem value="all">All</ToggleGroupItem>
            <ToggleGroupItem value="own">Own</ToggleGroupItem>
            <ToggleGroupItem value="contractor">Contractor</ToggleGroupItem>
          </ToggleGroup>
        </CardContent>
      </Card>

      {/* Top KPIs */}
       {loading ? (
          <div className="flex justify-center items-center h-24">
            <Loader2 className="size-8 animate-spin text-primary" />
          </div>
       ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {kpis.map((kpi) => (
              <Card key={kpi.title} className="card-hover text-center">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {kpi.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold font-headline">{kpi.value}</p>
                </CardContent>
              </Card>
            ))}
          </div>
       )}


      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-6">
          <Card className="card-hover">
            <CardHeader>
              <CardTitle>Payload Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={payloadDistributionData}>
                    <XAxis dataKey="payload" fontSize={12} tick={{ fill: 'hsl(var(--muted-foreground))' }} />
                    <YAxis tick={{ fill: 'hsl(var(--muted-foreground))' }} />
                    <Tooltip cursor={{ fill: 'hsl(var(--secondary))' }} contentStyle={{backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))'}}/>
                    <Bar dataKey="trucks" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Card className="card-hover">
            <CardHeader>
              <CardTitle>Fleet Performance</CardTitle>
            </CardHeader>
            <CardContent className="px-0">
               {loading ? (
                <div className="flex justify-center items-center h-48">
                  <Loader2 className="size-8 animate-spin text-primary" />
                </div>
               ) : error ? (
                 <p className="text-destructive text-center p-4">Error loading fleet data.</p>
               ) : (
                <div className="overflow-y-auto max-h-[17rem]">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Truck ID</TableHead>
                        <TableHead>Contractor</TableHead>
                        <TableHead>Util %</TableHead>
                        <TableHead>Cycles</TableHead>
                        <TableHead>Avg Payload %</TableHead>
                        <TableHead>Idle %</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {fleetData.map((truck) => (
                        <TableRow key={truck.id} className="hover:bg-secondary/50">
                          <TableCell className="font-mono text-xs">{truck.id}</TableCell>
                          <TableCell>{truck.contractor}</TableCell>
                          <TableCell>{truck.util}%</TableCell>
                          <TableCell>{truck.cycles}</TableCell>
                          <TableCell>{truck.avgPayload.toFixed(1)}%</TableCell>
                          <TableCell>{truck.idle}%</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
               )}
            </CardContent>
          </Card>
        </div>
      </div>
      
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-primary/80">AI Fleet Insights</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            <AiFuelForecastCard />
            <AiPayloadRoutingCard />
        </div>
      </section>
    </div>
  );
}
