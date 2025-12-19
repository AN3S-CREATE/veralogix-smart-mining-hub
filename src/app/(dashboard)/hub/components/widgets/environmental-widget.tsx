'use client';

import { useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, query, where } from 'firebase/firestore';
import { DashboardWidget } from './dashboard-widget';
import { Loader2 } from 'lucide-react';

export function EnvironmentalWidget() {
  const firestore = useFirestore();

  const breachesQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(
        collection(firestore, 'environmentalData'),
        where('complianceStatus', '==', 'Breach')
    );
  }, [firestore]);

  const { data: breaches, loading, error } = useCollection(breachesQuery);

  return (
    <DashboardWidget
      title="Environmental"
      description="Water usage and dust exceptions."
      link="/environmental"
    >
      {loading && <Loader2 className="mx-auto my-4 size-6 animate-spin text-primary" />}
      {error && <p className="text-destructive text-sm">Error loading data.</p>}
      {!loading && !error && (
        <div className="space-y-4 text-center">
            <div>
                <p className="text-3xl font-bold font-headline text-primary">4.5ML</p>
                <p className="text-sm text-muted-foreground">Water Usage (24h)</p>
            </div>
             <div>
                <p className="text-3xl font-bold font-headline">{breaches?.length ?? 0}</p>
                <p className="text-sm text-muted-foreground">Dust Breaches</p>
            </div>
        </div>
      )}
    </DashboardWidget>
  );
}
