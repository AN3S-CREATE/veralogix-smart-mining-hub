'use client';

import { useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection } from 'firebase/firestore';
import { DashboardWidget } from './dashboard-widget';
import { Loader2 } from 'lucide-react';

/**
 * DrillWidget Component
 * 
 * Displays a summary of drilling and blasting activities.
 * It fetches real-time drill log data from Firestore and displays statistics
 * such as the total number of holes logged and meters drilled.
 */
export function DrillWidget() {
  // Initialize Firestore instance
  const firestore = useFirestore();

  // Create a memoized query for the 'drillLogs' collection.
  // This ensures the query reference is stable across renders unless firestore changes.
  const drillLogsQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return collection(firestore, 'drillLogs');
  }, [firestore]);

  // Fetch the drill logs collection data using the useCollection hook.
  // This handles loading and error states automatically.
  const { data: drillLogs, loading, error } = useCollection(drillLogsQuery);

  return (
    <DashboardWidget
      title="Drill & Blast"
      description="Drill holes and logs."
      link="/plant"
    >
      {/* Show loading spinner while data is being fetched */}
      {loading && <Loader2 className="mx-auto my-4 size-6 animate-spin text-primary" />}
      
      {/* Show error message if fetching fails */}
      {error && <p className="text-destructive text-sm">Error loading data.</p>}
      
      {/* Show data statistics when loaded successfully */}
      {!loading && !error && (
        <div className="space-y-4 text-center">
            <div>
                {/* Display the count of drill logs, defaulting to 0 if undefined */}
                <p className="text-3xl font-bold font-headline text-primary">{drillLogs?.length ?? 0}</p>
                <p className="text-sm text-muted-foreground">Total Holes Logged</p>
            </div>
             <div>
                {/* Hardcoded value for Total Meters Drilled - likely to be dynamic in future */}
                <p className="text-3xl font-bold font-headline">1.2km</p>
                <p className="text-sm text-muted-foreground">Total Meters Drilled</p>
            </div>
        </div>
      )}
    </DashboardWidget>
  );
}
