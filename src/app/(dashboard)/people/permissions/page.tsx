
'use client';

import { useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, query } from 'firebase/firestore';
import { ModulePageLayout } from '@/components/shared/module-page-layout';
import { ModuleDataTable } from '@/components/shared/module-data-table';

export default function PermissionsPage() {
  const firestore = useFirestore();

  const permissionsQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(collection(firestore, 'permissions'));
  }, [firestore]);

  const { data: permissions, loading, error } = useCollection(permissionsQuery);

  const columns = [
    {
      accessorKey: 'id',
      header: 'Permission Key',
    },
    {
      accessorKey: 'description',
      header: 'Description',
    },
    {
      accessorKey: 'category',
      header: 'Category',
    },
  ];

  return (
    <ModulePageLayout
      title="System Permissions"
      description="A read-only list of all available permissions in the system."
    >
      <ModuleDataTable
        title="All Permissions"
        description="These are the atomic permissions that can be assigned to roles."
        columns={columns}
        data={permissions ?? []}
        loading={loading}
        error={error}
      />
    </ModulePageLayout>
  );
}
