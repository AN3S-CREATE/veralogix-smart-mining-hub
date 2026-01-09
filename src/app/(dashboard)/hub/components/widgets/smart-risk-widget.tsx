'use client';

import { useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, query, where } from 'firebase/firestore';
import { DashboardWidget } from './dashboard-widget';
import { Loader2 } from 'lucide-react';

/**
 * SmartRiskWidget Component
 * 
 * Displays a summary of safety and risk-related metrics.
 * It fetches real-time data from Firestore to show open CAPA (Corrective and Preventive Action)
 * actions and tracks overdue inspections.
 */
export function SmartRiskWidget() {
  // Initialize Firestore instance
  const firestore = useFirestore();

  // Create a memoized query for the 'capaActions' collection.
  // Filters for actions where the status is 'Open'.
  const openActionsQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(
      collection(firestore, 'capaActions'),
      where('status', '==', 'Open')
    );
  }, [firestore]);

  // Fetch the open CAPA actions data using the useCollection hook.
  const { data: openActions, loading, error } = useCollection(openActionsQuery);

  return (
    <DashboardWidget
      title="Smart Risk"
      description="Open actions and overdue items."
      link="/safety"
    >
      {/* Show loading spinner while data is being fetched */}
      {loading && <Loader2 className="mx-auto my-4 size-6 animate-spin text-primary" />}
      
      {/* Show error message if fetching fails */}
      {error && <p className="text-destructive text-sm">Error loading data.</p>}
      
      {/* Show data statistics when loaded successfully */}
      {!loading && !error && (
         <div className="space-y-4 text-center">
            <div>
                {/* Display the count of open CAPA actions, defaulting to 0 */}
                <p className="text-3xl font-bold font-headline text-primary">{openActions?.length ?? 0}</p>
                <p className="text-sm text-muted-foreground">Open CAPA Actions</p>
            </div>
             <div>
                {/* Hardcoded value for Overdue Inspections - placeholder for future dynamic data */}
                <p className="text-3xl font-bold font-headline">3</p>
                <p className="text-sm text-muted-foreground">Overdue Inspections</p>
            </div>
        </div>
      )}
    </DashboardWidget>
  );
}
