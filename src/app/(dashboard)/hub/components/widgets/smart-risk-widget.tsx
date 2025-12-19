'use client';

import { useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, query, where } from 'firebase/firestore';
import { DashboardWidget } from './dashboard-widget';
import { Loader2 } from 'lucide-react';

export function SmartRiskWidget() {
  const firestore = useFirestore();

  const openActionsQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(
      collection(firestore, 'capaActions'),
      where('status', '==', 'Open')
    );
  }, [firestore]);

  const { data: openActions, loading, error } = useCollection(openActionsQuery);

  return (
    <DashboardWidget
      title="Smart Risk"
      description="Open actions and overdue items."
      link="/safety"
    >
      {loading && <Loader2 className="mx-auto my-4 size-6 animate-spin text-primary" />}
      {error && <p className="text-destructive text-sm">Error loading data.</p>}
      {!loading && !error && (
         <div className="space-y-4 text-center">
            <div>
                <p className="text-3xl font-bold font-headline text-primary">{openActions?.length ?? 0}</p>
                <p className="text-sm text-muted-foreground">Open CAPA Actions</p>
            </div>
             <div>
                <p className="text-3xl font-bold font-headline">3</p>
                <p className="text-sm text-muted-foreground">Overdue Inspections</p>
            </div>
        </div>
      )}
    </DashboardWidget>
  );
}
