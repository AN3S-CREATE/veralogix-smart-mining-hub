'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Lightbulb } from 'lucide-react';

export function MorningBriefCard() {
  const [insights, setInsights] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBrief = async () => {
      setLoading(true);
      try {
        // Mocking AI response for demonstration
        const mockInsights = [
            "High-priority CAPA action for 'Ramp 3' is overdue.",
            "Truck TRK-205 has shown consistent underloading this shift.",
            "AI predicts a 15% increase in road degradation on Haul Road B.",
        ];
        // In a real implementation, you would call your AI flow:
        // const result = await generateSmartHubMorningBrief({ ... });
        // setInsights(result.topInsights);
        await new Promise(resolve => setTimeout(resolve, 1000)); // simulate network delay
        setInsights(mockInsights);
      } catch (error) {
        console.error('Failed to generate morning brief:', error);
        setInsights(['Could not load morning brief.']);
      } finally {
        setLoading(false);
      }
    };

    fetchBrief();
  }, []);

  return (
    <Card className="card-hover">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-headline text-lg font-semibold text-primary">
          <Lightbulb />
          Your Morning Brief
        </CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="size-8 animate-spin text-primary" />
          </div>
        ) : (
          <ul className="space-y-3">
            {insights.map((insight, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="mt-1.5 size-2 shrink-0 rounded-full bg-accent" />
                <p className="text-muted-foreground">{insight}</p>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
