'use client';

import { useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, query, where, orderBy, limit } from 'firebase/firestore';
import { DashboardWidget } from './dashboard-widget';
import { Loader2, ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';

const TrendIcon = ({ trend }: { trend?: string }) => {
  if (trend === 'up') return <ArrowUpRight className="size-4 text-primary" />;
  if (trend === 'down') return <ArrowDownRight className="size-4 text-destructive" />;
  return <Minus className="size-4 text-muted-foreground" />;
};

export function SmartManagementWidget() {
  const firestore = useFirestore();
  
  const kpisQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(
      collection(firestore, 'managementKpis'),
      where('period', '==', 'Weekly'),
      limit(2)
    );
  }, [firestore]);

  const { data: kpis, loading, error } = useCollection(kpisQuery);

  return (
    <DashboardWidget
      title="Smart Management"
      description="Weekly KPI snapshot."
      link="/executive"
    >
      {loading && <Loader2 className="mx-auto my-4 size-6 animate-spin text-primary" />}
      {error && <p className="text-destructive text-sm">Error loading data.</p>}
      {!loading && !error && (
        <div className="space-y-4">
            {kpis && kpis.length > 0 ? (
                kpis.map(kpi => (
                    <div key={kpi.id} className='text-center'>
                        <p className="text-2xl font-bold font-headline text-primary">{kpi.value}</p>
                        <div className="text-sm text-muted-foreground flex items-center justify-center gap-1">
                           <TrendIcon trend={kpi.trend} />
                           <span>{kpi.title}</span>
                        </div>
                    </div>
                ))
            ) : (
                <p className="text-sm text-muted-foreground text-center">No KPIs to display.</p>
            )}
        </div>
      )}
    </DashboardWidget>
  );
}
