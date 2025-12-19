
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '../ui/badge';

export interface Kpi {
  title: string;
  value: string;
  isAI?: boolean;
}

interface ModuleKpiGridProps {
  kpis: Kpi[];
}

export function ModuleKpiGrid({ kpis }: ModuleKpiGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {kpis.map((kpi) => (
        <Card key={kpi.title} className="card-hover">
          <CardHeader className="pb-2 flex-row items-start justify-between">
            <CardTitle className="text-base font-medium text-muted-foreground">
              {kpi.title}
            </CardTitle>
            {kpi.isAI && <Badge variant="outline" className="text-xs border-accent text-accent">AI</Badge>}
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold font-headline">{kpi.value}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
