
'use client';

import { useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, query } from 'firebase/firestore';
import { ModulePageLayout } from '@/components/shared/module-page-layout';
import { ModuleDataTable } from '@/components/shared/module-data-table';

export default function TasksPage() {
  const firestore = useFirestore();

  const tasksQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(collection(firestore, 'tasks'));
  }, [firestore]);

  const { data, loading, error } = useCollection(tasksQuery);

  const columns = [
    { accessorKey: 'dueDate', header: 'Due Date' },
    { accessorKey: 'moduleKey', header: 'Module' },
    { accessorKey: 'description', header: 'Description' },
    { accessorKey: 'taskType', header: 'Type' },
    { accessorKey: 'assignee', header: 'Assignee' },
    { accessorKey: 'status', header: 'Status' },
  ];

  return (
    <ModulePageLayout
      title="Actionable Tasks"
      description="A centralized log of all tasks generated across the Smart Mining Hub."
    >
        <ModuleDataTable
            title="Task List"
            description="Browse and filter all system tasks."
            columns={columns}
            data={data ?? []}
            loading={loading}
            error={error}
        />
    </ModulePageLayout>
  );
}
