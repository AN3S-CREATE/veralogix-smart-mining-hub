'use client';

import { useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, query, orderBy, limit } from 'firebase/firestore';
import { DashboardWidget } from './dashboard-widget';
import { Loader2 } from 'lucide-react';
import Image from 'next/image';

export function TransportWidget() {
  const firestore = useFirestore();
  
  const loadProofsQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(
      collection(firestore, 'loadProofs'),
      orderBy('timestamp', 'desc'),
      limit(1)
    );
  }, [firestore]);

  const { data: loadProofs, loading, error } = useCollection(loadProofsQuery);
  const latestLoad = loadProofs?.[0];

  return (
    <DashboardWidget
      title="Transport"
      description="Load proofs and incidents."
      link="/fleet"
    >
      {loading && <Loader2 className="mx-auto my-4 size-6 animate-spin text-primary" />}
      {error && <p className="text-destructive text-sm">Error loading data.</p>}
      {!loading && !error && (
        <div className="space-y-2">
            {latestLoad ? (
                 <div className="aspect-video w-full rounded-md bg-secondary overflow-hidden relative">
                    <Image src={latestLoad.imageUrl} alt={`Load proof for ${latestLoad.vehicleId}`} fill style={{ objectFit: 'cover' }} />
                 </div>
            ) : (
                <div className="aspect-video w-full rounded-md bg-secondary flex items-center justify-center">
                    <p className="text-sm text-muted-foreground">No recent loads</p>
                </div>
            )}
             <p className="text-xs text-muted-foreground text-center">
                {latestLoad ? `Latest load from ${latestLoad.vehicleId}` : 'Awaiting new load proofs'}
            </p>
        </div>
      )}
    </DashboardWidget>
  );
}
