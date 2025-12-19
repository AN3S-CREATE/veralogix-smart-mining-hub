'use client';

import { useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, query, where } from 'firebase/firestore';
import { DashboardWidget } from './dashboard-widget';
import { Loader2 } from 'lucide-react';

export function FleetWidget() {
  const firestore = useFirestore();

  const inspectionsQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(
      collection(firestore, 'fleetInspections'),
      where('status', '==', 'Due')
    );
  }, [firestore]);

  const { data: inspections, loading, error } = useCollection(inspectionsQuery);
  
  const downtimeQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return collection(firestore, 'downtimeFlags');
  }, [firestore]);

  const { data: downtimeFlags, loading: downtimeLoading, error: downtimeError } = useCollection(downtimeQuery);

  const isLoading = loading || downtimeLoading;
  const isError = error || downtimeError;

  return (
    <DashboardWidget
      title="Fleet"
      description="Upcoming maintenance and downtime."
      link="/fleet"
    >
      {isLoading && <Loader2 className="mx-auto my-4 size-6 animate-spin text-primary" />}
      {isError && <p className="text-destructive text-sm">Error loading data.</p>}
      {!isLoading && !isError && (
        <div className="space-y-4 text-center">
            <div>
                <p className="text-3xl font-bold font-headline text-primary">{inspections?.length ?? 0}</p>
                <p className="text-sm text-muted-foreground">Inspections Due</p>
            </div>
             <div>
                <p className="text-3xl font-bold font-headline">{downtimeFlags?.length ?? 0}</p>
                <p className="text-sm text-muted-foreground">Top Downtime Flags</p>
            </div>
        </div>
      )}
    </DashboardWidget>
  );
}
