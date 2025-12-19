'use client';

import { useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, query, where } from 'firebase/firestore';
import { DashboardWidget } from './dashboard-widget';
import { Loader2 } from 'lucide-react';

export function SupplyChainWidget() {
  const firestore = useFirestore();

  const lowStockQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    // This is a placeholder for a real query that would compare quantity and reorderPoint.
    // Firestore can't do this directly, so this would be done in a Cloud Function or client-side.
    return query(
        collection(firestore, 'inventoryItems'),
        where('isCritical', '==', true)
    );
  }, [firestore]);

  const { data: lowStockItems, loading, error } = useCollection(lowStockQuery);

  return (
    <DashboardWidget
      title="Supply Chain"
      description="Low stock and purchase requests."
      link="/supply-chain"
    >
      {loading && <Loader2 className="mx-auto my-4 size-6 animate-spin text-primary" />}
      {error && <p className="text-destructive text-sm">Error loading data.</p>}
      {!loading && !error && (
        <div className="space-y-4 text-center">
            <div>
                <p className="text-3xl font-bold font-headline text-primary">{lowStockItems?.length ?? 0}</p>
                <p className="text-sm text-muted-foreground">Critical Low Stock</p>
            </div>
             <div>
                <p className="text-3xl font-bold font-headline">4</p>
                <p className="text-sm text-muted-foreground">Purchase Requests</p>
            </div>
        </div>
      )}
    </DashboardWidget>
  );
}
