
'use client';

import { useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, query } from 'firebase/firestore';
import { ModulePageLayout } from '@/components/shared/module-page-layout';
import { ModuleDataTable } from '@/components/shared/module-data-table';
import { StatusPill } from '@/components/shared/status-pill';
import type { StatusPillStatus } from '@/components/shared/status-pill';

export default function AlertsPage() {
  const firestore = useFirestore();

  const alertsQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(collection(firestore, 'alerts'));
  }, [firestore]);

  const { data, loading, error } = useCollection(alertsQuery);

  const columns = [
    { accessorKey: 'createdAt', header: 'Timestamp' },
    { accessorKey: 'moduleKey', header: 'Module' },
    { accessorKey: 'description', header: 'Description' },
    { accessorKey: 'severity', header: 'Severity' },
    { accessorKey: 'status', header: 'Status' },
  ];

  return (
    <ModulePageLayout
      title="System Alerts"
      description="A centralized log of all alerts generated across the Smart Mining Hub."
    >
        <ModuleDataTable
            title="Alert Log"
            description="Browse and filter all system alerts."
            columns={columns}
            data={data ?? []}
            loading={loading}
            error={error}
        />
    </ModulePageLayout>
  );
}
