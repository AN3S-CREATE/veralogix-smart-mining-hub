'use client';

import { useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, query, where } from 'firebase/firestore';
import { DashboardWidget } from './dashboard-widget';
import { Loader2 } from 'lucide-react';

export function BlastingWidget() {
  const firestore = useFirestore();

  const plannedBlastsQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(
      collection(firestore, 'blastDesigns'),
      where('status', '==', 'Designed')
    );
  }, [firestore]);

  const { data: plannedBlasts, loading, error } = useCollection(plannedBlastsQuery);

  return (
    <DashboardWidget
      title="Blasting"
      description="Planned and executed blasts."
      link="/plant"
    >
      {loading && <Loader2 className="mx-auto my-4 size-6 animate-spin text-primary" />}
      {error && <p className="text-destructive text-sm">Error loading data.</p>}
      {!loading && !error && (
        <div className="space-y-4 text-center">
            <div>
                <p className="text-3xl font-bold font-headline text-primary">{plannedBlasts?.length ?? 0}</p>
                <p className="text-sm text-muted-foreground">Blasts Planned</p>
            </div>
             <div>
                <p className="text-3xl font-bold font-headline">2</p>
                <p className="text-sm text-muted-foreground">Executed Today</p>
            </div>
        </div>
      )}
    </DashboardWidget>
  );
}
