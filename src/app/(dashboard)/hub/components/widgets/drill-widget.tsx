
'use client';

import { useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection } from 'firebase/firestore';
import { DashboardWidget } from './dashboard-widget';
import { Loader2 } from 'lucide-react';

export function DrillWidget() {
  const firestore = useFirestore();

  const drillLogsQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return collection(firestore, 'drillLogs');
  }, [firestore]);

  const { data: drillLogs, loading, error } = useCollection(drillLogsQuery);

  return (
    <DashboardWidget
      title="Drill & Blast"
      description="Drill holes and logs."
      link="/plant"
    >
      {loading && <Loader2 className="mx-auto my-4 size-6 animate-spin text-primary" />}
      {error && <p className="text-destructive text-sm">Error loading data.</p>}
      {!loading && !error && (
        <div className="space-y-4 text-center">
            <div>
                <p className="text-3xl font-bold font-headline text-primary">{drillLogs?.length ?? 0}</p>
                <p className="text-sm text-muted-foreground">Total Holes Logged</p>
            </div>
             <div>
                <p className="text-3xl font-bold font-headline">1.2km</p>
                <p className="text-sm text-muted-foreground">Total Meters Drilled</p>
            </div>
        </div>
      )}
    </DashboardWidget>
  );
}
