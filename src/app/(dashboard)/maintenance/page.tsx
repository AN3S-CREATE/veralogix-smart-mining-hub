
'use client';

import { useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, query, where, orderBy } from 'firebase/firestore';
import { ModulePageLayout } from '@/components/shared/module-page-layout';
import { ModuleDataTable } from '@/components/shared/module-data-table';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, Wrench, AlertTriangle, Calendar, Activity } from 'lucide-react';
import { format } from 'date-fns';

export default function MaintenancePage() {
  const firestore = useFirestore();

  // 1. Predictive Alerts Query (AI Output)
  const predictiveQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(
      collection(firestore, 'alerts'),
      where('moduleKey', 'in', ['predictive', 'maintenance']),
      where('status', 'in', ['New', 'Open']),
      orderBy('createdAt', 'desc')
    );
  }, [firestore]);

  // 2. Scheduled Work Orders Query
  const workOrdersQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(
        collection(firestore, 'tasks'),
        where('taskType', '==', 'Maintenance'),
        where('status', '!=', 'Completed'),
        orderBy('dueDate', 'asc')
    );
  }, [firestore]);

  const { data: alerts, loading: loadingAlerts } = useCollection(predictiveQuery);
  const { data: workOrders, loading: loadingOrders } = useCollection(workOrdersQuery);

  const alertColumns = [
    { accessorKey: 'createdAt', header: 'Detected At' },
    { accessorKey: 'severity', header: 'Severity' },
    { accessorKey: 'description', header: 'Prediction / Issue' },
    { accessorKey: 'status', header: 'Status' },
  ];

  const orderColumns = [
      { accessorKey: 'dueDate', header: 'Due Date' },
      { accessorKey: 'description', header: 'Task' },
      { accessorKey: 'assignee', header: 'Assigned To' },
      { accessorKey: 'status', header: 'Status' },
  ];

  return (
    <ModulePageLayout
      title="Smart Maintenance"
      description="Predictive insights, asset health, and optimized scheduling."
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card className="glass-panel">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Critical Predictions</CardTitle>
                <AlertTriangle className="h-4 w-4 text-destructive" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold font-headline">
                    {alerts?.filter(a => a.severity === 'Critical' || a.severity === 'High').length ?? 0}
                </div>
                <p className="text-xs text-muted-foreground">Assets at risk (48h)</p>
            </CardContent>
        </Card>
        <Card className="glass-panel">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Open Work Orders</CardTitle>
                <Wrench className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold font-headline">{workOrders?.length ?? 0}</div>
                <p className="text-xs text-muted-foreground">Scheduled tasks</p>
            </CardContent>
        </Card>
        <Card className="glass-panel">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Avg Asset Health</CardTitle>
                <Activity className="h-4 w-4 text-accent-secondary" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold font-headline">94.2%</div>
                <p className="text-xs text-muted-foreground">+1.2% vs last month</p>
            </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
         <ModuleDataTable
            title="AI Predictive Alerts"
            description="Potential failures detected by the AI engine."
            columns={alertColumns}
            data={alerts ?? []}
            loading={loadingAlerts}
         />
         <ModuleDataTable
            title="Maintenance Schedule"
            description="Upcoming preventive and corrective tasks."
            columns={orderColumns}
            data={workOrders ?? []}
            loading={loadingOrders}
         />
      </div>
    </ModulePageLayout>
  );
}
