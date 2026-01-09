'use client';

import { useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, query, where } from 'firebase/firestore';
import { DashboardWidget } from './dashboard-widget';
import { Loader2 } from 'lucide-react';

/**
 * FleetWidget Component
 * 
 * Displays key metrics related to fleet management.
 * It fetches real-time data from Firestore to show upcoming fleet inspections
 * and current downtime flags.
 */
export function FleetWidget() {
  // Initialize Firestore instance
  const firestore = useFirestore();

  // Create a memoized query for 'fleetInspections' collection.
  // Filters for inspections where the status is 'Due'.
  const inspectionsQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(
      collection(firestore, 'fleetInspections'),
      where('status', '==', 'Due')
    );
  }, [firestore]);

  // Fetch the fleet inspections data
  const { data: inspections, loading, error } = useCollection(inspectionsQuery);
  
  // Create a memoized query for 'downtimeFlags' collection.
  // Fetches all downtime flags.
  const downtimeQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return collection(firestore, 'downtimeFlags');
  }, [firestore]);

  // Fetch the downtime flags data
  const { data: downtimeFlags, loading: downtimeLoading, error: downtimeError } = useCollection(downtimeQuery);

  // Combine loading and error states from both queries
  const isLoading = loading || downtimeLoading;
  const isError = error || downtimeError;

  return (
    <DashboardWidget
      title="Fleet"
      description="Upcoming maintenance and downtime."
      link="/fleet"
    >
      {/* Show loading spinner while any data is being fetched */}
      {isLoading && <Loader2 className="mx-auto my-4 size-6 animate-spin text-primary" />}
      
      {/* Show error message if any fetching fails */}
      {isError && <p className="text-destructive text-sm">Error loading data.</p>}
      
      {/* Show data statistics when all data is loaded successfully */}
      {!isLoading && !isError && (
        <div className="space-y-4 text-center">
            <div>
                {/* Display the count of due inspections, defaulting to 0 */}
                <p className="text-3xl font-bold font-headline text-primary">{inspections?.length ?? 0}</p>
                <p className="text-sm text-muted-foreground">Inspections Due</p>
            </div>
             <div>
                {/* Display the count of downtime flags, defaulting to 0 */}
                <p className="text-3xl font-bold font-headline">{downtimeFlags?.length ?? 0}</p>
                <p className="text-sm text-muted-foreground">Top Downtime Flags</p>
            </div>
        </div>
      )}
    </DashboardWidget>
  );
}
