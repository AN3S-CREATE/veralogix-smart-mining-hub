'use client';

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

const kpis = [
  { title: 'Tonnes Hauled', value: '42.8k' },
  { title: 'Avg Payload/Rated', value: '98.2%' },
  { title: 'Optimal Load %', value: '89%' },
  { title: 'Avg Cycle Time', value: '33.1 min' },
  { title: 'Total Idle Hours', value: '112 h' },
];

const payloadDistributionData = [
  { payload: '80-85%', trucks: 5 },
  { payload: '85-90%', trucks: 12 },
  { payload: '90-95%', trucks: 28 },
  { payload: '95-100%', trucks: 45 },
  { payload: '100-105%', trucks: 22 },
  { payload: '105-110%', trucks: 8 },
  { payload: '>110%', trucks: 3 },
];

const fleetData = [
  { id: 'TRK-201', contractor: 'MACMAHON', util: 89, cycles: 22, avgPayload: 99.2, underload: 2, overload: 8, idle: 5 },
  { id: 'TRK-203', contractor: 'Veralogix', util: 94, cycles: 24, avgPayload: 101.3, underload: 1, overload: 12, idle: 3 },
  { id: 'TRK-205', contractor: 'Veralogix', util: 75, cycles: 18, avgPayload: 88.9, underload: 15, overload: 2, idle: 18 },
  { id: 'TRK-310', contractor: 'MACMAHON', util: 91, cycles: 23, avgPayload: 97.5, underload: 5, overload: 5, idle: 6 },
  { id: 'TRK-312', contractor: 'Veralogix', util: 82, cycles: 20, avgPayload: 105.1, underload: 0, overload: 25, idle: 11 },
  { id: 'TRK-401', contractor: 'MACMAHON', util: 96, cycles: 25, avgPayload: 100.1, underload: 2, overload: 7, idle: 2 },
];

const queueTimeData = [
    { point: 'Shovel 1', time: 4.2 },
    { point: 'Shovel 2', time: 6.8 },
    { point: 'Shovel 3', time: 3.1 },
    { point: 'ROM Pad', time: 8.5 },
];

const efficientTrucks = ['TRK-401', 'TRK-203', 'TRK-310', 'TRK-201', 'TRK-115'];
const problemTrucks = ['TRK-205', 'TRK-312', 'TRK-128', 'TRK-219', 'TRK-301'];

export default function FleetPage() {
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
                        <TableCell>{truck.avgPayload}%</TableCell>
                        <TableCell>{truck.idle}%</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
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
