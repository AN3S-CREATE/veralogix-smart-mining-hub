
'use client';

import { useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, query, where, limit } from 'firebase/firestore';
import { DashboardWidget } from './dashboard-widget';
import { Loader2, AlertTriangle, CheckSquare } from 'lucide-react';

export function ActionCenterWidget() {
  const firestore = useFirestore();

  const highPriorityAlertsQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(
      collection(firestore, 'alerts'),
      where('severity', 'in', ['High', 'Critical']),
      where('status', '==', 'New'),
      limit(5)
    );
  }, [firestore]);

  const openTasksQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(
      collection(firestore, 'tasks'),
      where('status', '==', 'Todo'),
      limit(5)
    );
  }, [firestore]);

  const { data: alerts, loading: alertsLoading, error: alertsError } = useCollection(highPriorityAlertsQuery);
  const { data: tasks, loading: tasksLoading, error: tasksError } = useCollection(openTasksQuery);

  const isLoading = alertsLoading || tasksLoading;
  const isError = alertsError || tasksError;

  return (
    <DashboardWidget
      title="Action Center"
      description="High-priority alerts and tasks."
      link="/alerts"
    >
      {isLoading && <Loader2 className="mx-auto my-4 size-6 animate-spin text-primary" />}
      {isError && <p className="text-destructive text-sm">Error loading data.</p>}
      {!isLoading && !isError && (
        <div className="space-y-4 text-center">
            <div className='flex items-center justify-center gap-2'>
                <AlertTriangle className='size-6 text-primary'/>
                <div>
                    <p className="text-3xl font-bold font-headline text-primary">{alerts?.length ?? 0}</p>
                    <p className="text-sm text-muted-foreground">New Alerts</p>
                </div>
            </div>
             <div className='flex items-center justify-center gap-2'>
                <CheckSquare className='size-6 text-primary'/>
                <div>
                    <p className="text-3xl font-bold font-headline">{tasks?.length ?? 0}</p>
                    <p className="text-sm text-muted-foreground">Open Tasks</p>
                </div>
            </div>
        </div>
      )}
    </DashboardWidget>
  );
}
