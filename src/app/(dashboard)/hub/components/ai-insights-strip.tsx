
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AreaChart, Area, ResponsiveContainer } from "recharts";
import { Loader2 } from 'lucide-react';
import { generateSmartHubInsights } from '@/ai/flows/smarthub-insights';
import type { SmartHubInsightsOutput } from '@/ai/flows/smarthub-insights';


const MOCK_OPERATIONAL_DATA = `
- Safety: 3 high-potential near-misses recorded on Ramp 3. 2 new critical CAPA actions opened.
- Compliance: 5 license expirations due in next 7 days.
- Fleet: Average queue time at shovels is up 15% vs shift average. Truck TRK-205 has high vibration alerts.
- Production: Current shift is trending 5% below plan for tonnes moved.
`;

const forecastData = [
  { value: 168800 },
  { value: 170200 },
  { value: 169500 },
  { value: 171000 },
  { value: 172500 },
  { value: 172000 },
];

export function AiInsightsStrip() {
  const [insights, setInsights] = useState<SmartHubInsightsOutput | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInsights = async () => {
      setLoading(true);
      try {
        const result = await generateSmartHubInsights({ operationalData: MOCK_OPERATIONAL_DATA });
        setInsights(result);
      } catch (error) {
        console.error("Failed to fetch AI hub insights:", error);
        // Fallback to mock data on error
        setInsights({
          section54Risk: { score: 68, reasoning: "Based on serious non-compliance events and recent near-misses." },
          dieselSpendForecast: { predictedCost: 172500, reasoning: "Predicted cost based on current operational tempo." },
          topRecommendations: [
            "Reassign 1 truck from Pit A to Pit B to reduce queue time.",
            "Schedule rework on Ramp 3 within 24h due to increased risk score.",
          ]
        });
      } finally {
        setLoading(false);
      }
    };
    fetchInsights();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {/* Risk Score Card */}
      <Card className="card-hover">
        <CardHeader>
          <div className="flex justify-between items-start">
            <CardTitle className="text-base">AI Section 54 Risk Score</CardTitle>
            <Badge variant="outline" className="border-accent text-accent text-xs">AI Risk Score</Badge>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? <Loader2 className="size-8 animate-spin" /> : (
            <>
              <p className="text-5xl font-bold font-headline text-primary">{insights?.section54Risk.score}<span className="text-3xl text-muted-foreground">/100</span></p>
              <p className="text-xs text-muted-foreground mt-2">{insights?.section54Risk.reasoning}</p>
            </>
          )}
        </CardContent>
      </Card>

      {/* Diesel Forecast Card */}
      <Card className="card-hover">
        <CardHeader>
          <div className="flex justify-between items-start">
            <CardTitle className="text-base">AI Diesel Spend Forecast (24h)</CardTitle>
            <Badge variant="outline" className="border-accent text-accent text-xs">AI Prediction</Badge>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? <Loader2 className="size-8 animate-spin" /> : (
            <>
              <div className="flex justify-between items-end">
                  <p className="text-3xl font-bold font-headline">R{insights?.dieselSpendForecast.predictedCost.toLocaleString()}</p>
                  <div className="h-12 w-24">
                      <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={forecastData}>
                              <defs>
                                  <linearGradient id="forecastFill" x1="0" y1="0" x2="0" y2="1">
                                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8}/>
                                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.1}/>
                                  </linearGradient>
                              </defs>
                              <Area type="monotone" dataKey="value" stroke="hsl(var(--primary))" fill="url(#forecastFill)" strokeWidth={2} />
                          </AreaChart>
                      </ResponsiveContainer>
                  </div>
              </div>
              <p className="text-xs text-muted-foreground mt-2">{insights?.dieselSpendForecast.reasoning}</p>
            </>
          )}
        </CardContent>
      </Card>

      {/* Recommendations Card */}
      <Card className="card-hover">
        <CardHeader>
          <div className="flex justify-between items-start">
            <CardTitle className="text-base">AI Top Recommendations</CardTitle>
             <Badge variant="outline" className="border-accent text-accent text-xs">AI Insight</Badge>
          </div>
        </CardHeader>
        <CardContent>
           {loading ? <Loader2 className="size-8 animate-spin" /> : (
            <>
              <ul className="space-y-3">
                {insights?.topRecommendations.slice(0, 2).map((rec, index) => (
                  <li key={index} className="flex items-start gap-3 text-sm">
                    <span className="mt-1.5 size-2 shrink-0 rounded-full bg-primary" />
                    <p className="text-muted-foreground">{rec}</p>
                  </li>
                ))}
              </ul>
              <p className="text-xs text-muted-foreground/50 mt-4">AI-generated – subject to human review.</p>
            </>
           )}
        </CardContent>
      </Card>
    </div>
  );
}
