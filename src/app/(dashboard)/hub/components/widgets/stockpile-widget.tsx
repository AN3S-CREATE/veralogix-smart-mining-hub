
'use client';

import { useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection } from 'firebase/firestore';
import { DashboardWidget } from './dashboard-widget';
import { Loader2 } from 'lucide-react';
import { useMemo } from 'react';

export function StockpileWidget() {
  const firestore = useFirestore();

  const stockpileQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return collection(firestore, 'stockpileVolumes');
  }, [firestore]);

  const { data: stockpiles, loading, error } = useCollection(stockpileQuery);
  
  const totalTonnage = useMemo(() => {
    if (!stockpiles) return 0;
    return stockpiles.reduce((acc, s) => acc + (s.measuredTonnage || 0), 0);
  }, [stockpiles]);

  return (
    <DashboardWidget
      title="Stockpiles"
      description="Measured stockpile volumes."
      link="/plant"
    >
      {loading && <Loader2 className="mx-auto my-4 size-6 animate-spin text-primary" />}
      {error && <p className="text-destructive text-sm">Error loading data.</p>}
      {!loading && !error && (
        <div className="space-y-4 text-center">
            <div>
                <p className="text-3xl font-bold font-headline text-primary">{(totalTonnage / 1000).toFixed(1)}k</p>
                <p className="text-sm text-muted-foreground">Total Tonnes Measured</p>
            </div>
             <div>
                <p className="text-3xl font-bold font-headline">{stockpiles?.length ?? 0}</p>
                <p className="text-sm text-muted-foreground">Stockpiles Surveyed</p>
            </div>
        </div>
      )}
    </DashboardWidget>
  );
}
