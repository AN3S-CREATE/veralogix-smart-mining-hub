
'use client';

import { useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, query, where, orderBy, limit } from 'firebase/firestore';
import { DashboardWidget } from './dashboard-widget';
import { Loader2, AlertCircle } from 'lucide-react';
import Link from 'next/link';

export function LoadPassportWidget() {
  const firestore = useFirestore();

  const exceptionsQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(
      collection(firestore, 'loadPassports'),
      where('status', '==', 'Exception'),
      orderBy('lastUpdatedAt', 'desc'),
      limit(3)
    );
  }, [firestore]);

  const { data: exceptions, loading, error } = useCollection(exceptionsQuery);

  return (
    <DashboardWidget
      title="Load Exceptions"
      description="Latest unresolved load issues."
      link="/load-passports"
    >
      {loading && <Loader2 className="mx-auto my-4 size-6 animate-spin text-primary" />}
      {error && <p className="text-destructive text-sm">Error loading data.</p>}
      {!loading && !error && (
        exceptions && exceptions.length > 0 ? (
            <ul className="space-y-3 text-sm">
                {exceptions.map(ex => (
                    <li key={ex.id} className="flex items-start gap-2">
                        <AlertCircle className="size-4 mt-0.5 text-primary shrink-0" />
                        <div>
                            <p className="font-medium text-foreground">
                                <Link href={`/load-passports/${ex.passportId}`} className="hover:underline">
                                    {ex.passportId}
                                </Link>
                            </p>
                            <p className="text-muted-foreground">Vehicle {ex.vehicleId} has an exception.</p>
                        </div>
                    </li>
                ))}
            </ul>
        ) : (
            <p className="text-sm text-muted-foreground text-center my-4">No active load exceptions.</p>
        )
      )}
    </DashboardWidget>
  );
}
