
'use client';

import { useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, query, orderBy } from 'firebase/firestore';
import { ModulePageLayout } from '@/components/shared/module-page-layout';
import { ModuleDataTable } from '@/components/shared/module-data-table';
import Link from 'next/link';

export default function LoadPassportsPage() {
  const firestore = useFirestore();

  const passportsQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(collection(firestore, 'loadPassports'), orderBy('createdAt', 'desc'));
  }, [firestore]);

  const { data, loading, error } = useCollection(passportsQuery);

  const columns = [
    { 
      accessorKey: 'passportId', 
      header: 'Passport ID',
      cell: ({ row }: { row: { original: { passportId: string } } }) => (
        <Link href={`/load-passports/${row.original.passportId}`} className="text-primary hover:underline font-medium">
            {row.original.passportId}
        </Link>
      )
    },
    { accessorKey: 'vehicleId', header: 'Vehicle ID' },
    { accessorKey: 'materialType', header: 'Material' },
    { accessorKey: 'origin', header: 'Origin' },
    { accessorKey: 'destination', header: 'Destination' },
    { accessorKey: 'status', header: 'Status' },
    { accessorKey: 'lastUpdatedAt', header: 'Last Update' },
  ];

  return (
    <ModulePageLayout
      title="Load Passports"
      description="A complete lifecycle record for every haulage load across the operation."
    >
      <ModuleDataTable
        title="All Load Passports"
        description="Browse and search for specific loads."
        columns={columns}
        data={data ?? []}
        loading={loading}
        error={error}
      />
    </ModulePageLayout>
  );
}
