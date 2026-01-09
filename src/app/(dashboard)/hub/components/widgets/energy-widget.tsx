'use client';

import { useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, query, where } from 'firebase/firestore';
import { DashboardWidget } from './dashboard-widget';
import { Loader2 } from 'lucide-react';
import { useMemo } from 'react';

export function EnergyWidget() {
  const firestore = useFirestore();

  const metricsQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return collection(firestore, 'energyMetrics');
  }, [firestore]);

  const { data: metrics, loading, error } = useCollection(metricsQuery);

  const totalConsumption = useMemo(() => {
    if (!metrics) return 0;
    return metrics.reduce((acc, m) => acc + (m.value || 0), 0);
  }, [metrics]);

  return (
    <DashboardWidget
      title="Energy"
      description="Consumption and grid status."
      link="/energy"
    >
      {loading && <Loader2 className="mx-auto my-4 size-6 animate-spin text-primary" />}
      {error && <p className="text-destructive text-sm">Error loading data.</p>}
      {!loading && !error && (
        <div className="space-y-4 text-center">
            <div>
                <p className="text-3xl font-bold font-headline text-primary">{(totalConsumption / 1000).toFixed(1)}</p>
                <p className="text-sm text-muted-foreground">MWh (24h)</p>
            </div>
             <div>
                <p className="text-3xl font-bold font-headline">99.8%</p>
                <p className="text-sm text-muted-foreground">Grid Stability</p>
            </div>
        </div>
      )}
    </DashboardWidget>
  );
}
