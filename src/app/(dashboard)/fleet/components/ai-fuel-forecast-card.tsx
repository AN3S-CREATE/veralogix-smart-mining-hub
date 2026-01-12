'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AreaChart, Area, ResponsiveContainer } from "recharts";
import { Loader2 } from 'lucide-react';
import { generateFuelOverspendForecast } from '@/ai/flows/fuel-overspend-forecast';
import type { FuelOverspendForecastOutput } from '@/ai/flows/fuel-overspend-forecast';

const MOCK_OPERATIONAL_DATA = `
- Fleet Activity: 28 trucks active, 4 in queue.
- Idle Time: High idle time recorded at Shovel 2 (18%) and East Dump (12%).
- Haul Distance: Average haul distance increased by 5% due to new operational area.
- Weather: No significant weather impact.
`;

export function AiFuelForecastCard() {
  const [forecast, setForecast] = useState<FuelOverspendForecastOutput | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchForecast = async () => {
      setLoading(true);
      try {
        const result = await generateFuelOverspendForecast({ operationalData: MOCK_OPERATIONAL_DATA });
        setForecast(result);
      } catch (error) {
        console.error("Failed to fetch AI fuel forecast:", error);
        // Fallback to mock data on error
        setForecast({
          predictedOverspend: 88400,
          keyDrivers: [
            "High idle time at Shovel 2 and East Dump.",
            "More road haul than planned due to rail constraints.",
          ],
          forecastData: [168800, 170200, 169500, 171000, 172500, 173000, 174500].map(v => v / 2), // Adjust mock
        });
      } finally {
        setLoading(false);
      }
    };
    fetchForecast();
  }, []);

  const chartData = forecast?.forecastData.map(value => ({ value })) || [];

  return (
    <Card className="card-hover">
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle>AI Fuel Overspend Forecast</CardTitle>
          <Badge variant="outline" className="border-accent text-accent text-xs">AI Prediction</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {loading ? (
          <div className="flex justify-center items-center h-48">
            <Loader2 className="size-8 animate-spin text-primary" />
          </div>
        ) : forecast ? (
          <>
            <div>
              <p className="text-sm text-muted-foreground">Predicted fuel overspend this week:</p>
              <p className="text-3xl font-bold font-headline">
                R{forecast.predictedOverspend.toLocaleString()}
              </p>
            </div>
            <div className="h-20 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="fuelFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.1} />
                    </linearGradient>
                  </defs>
                  <Area type="monotone" dataKey="value" stroke="hsl(var(--primary))" fill="url(#fuelFill)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div>
              <h4 className="text-sm font-medium mb-2">Key Drivers:</h4>
              <ul className="space-y-2">
                {forecast.keyDrivers.map((driver, index) => (
                  <li key={index} className="flex items-start gap-3 text-sm">
                    <span className="mt-1.5 size-2 shrink-0 rounded-full bg-primary" />
                    <p className="text-muted-foreground">{driver}</p>
                  </li>
                ))}
              </ul>
            </div>
          </>
        ) : (
          <p className="text-destructive text-center">Could not load forecast.</p>
        )}
      </CardContent>
    </Card>
  );
}
