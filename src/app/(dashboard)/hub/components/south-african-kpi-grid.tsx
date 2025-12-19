
'use client';

import { BarChart3, Fuel, Tractor, AlertOctagon } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusPill } from "@/components/shared/status-pill";
import { ChartContainer } from "@/components/ui/chart";
import { Bar, BarChart, Cell, XAxis, YAxis } from "recharts";
import type { ChartConfig } from "@/components/ui/chart";

const chartData = [
  { type: "Rail", cost: 350000, fill: "var(--color-rail)" },
  { type: "Truck", cost: 1400000, fill: "var(--color-truck)" },
];

const chartConfig = {
  cost: {
    label: "Cost (ZAR)",
  },
  rail: {
    label: "Rail",
    color: "hsl(var(--chart-1))",
  },
  truck: {
    label: "Truck",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export function SouthAfricanKpiGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      {/* Section 54 Exposure */}
      <Card className="card-hover">
        <CardHeader>
          <CardTitle className="text-base font-medium text-muted-foreground flex justify-between items-center">
            Section 54 Exposure
            <AlertOctagon className="size-5 text-primary" />
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-bold font-headline">3</span>
            <StatusPill status="High" />
          </div>
          <p className="text-xs text-muted-foreground pt-2">Potential stoppages this month. Stoppages cost SA mines billions.</p>
        </CardContent>
      </Card>

      {/* Diesel Burn & Cost */}
      <Card className="card-hover">
        <CardHeader>
          <CardTitle className="text-base font-medium text-muted-foreground flex justify-between items-center">
            Diesel Burn & Cost (ZAR)
            <Fuel className="size-5 text-primary" />
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-bold font-headline">8,240</span>
            <span className="text-muted-foreground">Litres</span>
          </div>
          <p className="text-lg font-semibold">~R168,800</p>
          <div className="text-xs text-muted-foreground pt-2">
            <p>Est. wasted from idle/queue:</p>
            <p className="font-bold text-foreground">R12,300</p>
          </div>
        </CardContent>
      </Card>

      {/* Haulage Cost: Rail vs Truck */}
      <Card className="card-hover">
        <CardHeader>
          <CardTitle className="text-base font-medium text-muted-foreground flex justify-between items-center">
            Haulage Cost: Rail vs Truck
            <Tractor className="size-5 text-primary" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg font-semibold">R1.05M <span className="text-sm text-muted-foreground">extra daily cost</span></p>
          <div className="h-24 mt-2">
            <ChartContainer config={chartConfig} className="w-full h-full">
              <BarChart accessibilityLayer data={chartData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                <XAxis dataKey="type" hide />
                <YAxis hide domain={[0, 1500000]}/>
                <Bar dataKey="cost" radius={4}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>

      {/* Illegal Mining Risk */}
      <Card className="card-hover">
        <CardHeader>
          <CardTitle className="text-base font-medium text-muted-foreground flex justify-between items-center">
            Illegal Mining & Perimeter Risk
            <BarChart3 className="size-5 text-primary" />
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-bold font-headline">12</span>
            <span className="text-muted-foreground">incidents (7d)</span>
          </div>
           <div className="flex items-center gap-2">
            <span className="text-sm">Risk Level:</span>
            <StatusPill status="Medium" />
           </div>
        </CardContent>
      </Card>
    </div>
  );
}
