
'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AreaChart, Area, ResponsiveContainer } from "recharts";

const forecastData = [
  { value: 168800 },
  { value: 170200 },
  { value: 169500 },
  { value: 171000 },
  { value: 172500 },
  { value: 173000 },
  { value: 174500 },
];

const forecastDrivers = [
    "High idle time at Shovel 2 and East Dump.",
    "More road haul than planned due to rail constraints.",
];

export function AiFuelForecastCard() {
  return (
    <Card className="card-hover">
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle>AI Fuel Overspend Forecast</CardTitle>
          <Badge variant="outline" className="border-accent text-accent text-xs">AI Prediction</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="text-sm text-muted-foreground">Predicted fuel overspend this week:</p>
          <p className="text-3xl font-bold font-headline">R88,400</p>
        </div>
        <div className="h-20 w-full">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={forecastData}>
                    <defs>
                        <linearGradient id="fuelFill" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.1}/>
                        </linearGradient>
                    </defs>
                    <Area type="monotone" dataKey="value" stroke="hsl(var(--primary))" fill="url(#fuelFill)" strokeWidth={2} />
                </AreaChart>
            </ResponsiveContainer>
        </div>
        <div>
            <h4 className="text-sm font-medium mb-2">Key Drivers:</h4>
            <ul className="space-y-2">
                {forecastDrivers.map((driver, index) => (
                    <li key={index} className="flex items-start gap-3 text-sm">
                        <span className="mt-1.5 size-2 shrink-0 rounded-full bg-primary" />
                        <p className="text-muted-foreground">{driver}</p>
                    </li>
                ))}
            </ul>
        </div>
      </CardContent>
    </Card>
  );
}
