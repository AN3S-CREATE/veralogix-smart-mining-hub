'use client';

import { useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, query, where, Timestamp } from 'firebase/firestore';
import { DashboardWidget } from './dashboard-widget';
import { Loader2 } from 'lucide-react';

export function PeopleComplianceWidget() {
  const firestore = useFirestore();

  const expiriesQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    const thirtyDaysFromNow = new Date();
    thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);
    return query(
      collection(firestore, 'complianceItems'),
      where('expiryDate', '<=', Timestamp.fromDate(thirtyDaysFromNow))
    );
  }, [firestore]);

  const { data: expiries, loading, error } = useCollection(expiriesQuery);

  return (
    <DashboardWidget
      title="People Compliance"
      description="Expiries and onboarding status."
      link="/compliance"
    >
      {loading && <Loader2 className="mx-auto my-4 size-6 animate-spin text-primary" />}
      {error && <p className="text-destructive text-sm">Error loading data.</p>}
      {!loading && !error && (
        <div className="space-y-4 text-center">
            <div>
                <p className="text-3xl font-bold font-headline text-primary">{expiries?.length ?? 0}</p>
                <p className="text-sm text-muted-foreground">Expiries in next 30d</p>
            </div>
             <div>
                <p className="text-3xl font-bold font-headline">5</p>
                <p className="text-sm text-muted-foreground">Onboarding backlog</p>
            </div>
        </div>
      )}
    </DashboardWidget>
  );
}
