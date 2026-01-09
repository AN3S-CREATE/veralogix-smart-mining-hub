
'use client';

import { useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { useUser } from '@/firebase/auth/use-user';
import { collection, query, where } from 'firebase/firestore';
import { ModuleDataTable } from '@/components/shared/module-data-table';
import { ModulePageLayout } from '@/components/shared/module-page-layout';
import { StatusPill } from '@/components/shared/status-pill';
import type { StatusPillStatus } from '@/components/shared/status-pill';

const getPillStatus = (status: string): StatusPillStatus => {
  switch (status) {
    case 'Compliant': return 'OK';
    case 'Expiring Soon': return 'Warning';
    case 'Expired': return 'Critical';
    default: return 'Info';
  }
};

export default function MyCompliancePage() {
  const { user, loading: userLoading } = useUser();
  const firestore = useFirestore();

  const trainingRecordsQuery = useMemoFirebase(() => {
    if (!firestore || !user) return null;
    return query(collection(firestore, 'trainingRecords'), where('uid', '==', user.uid));
  }, [firestore, user]);

  const { data, loading: recordsLoading, error } = useCollection(trainingRecordsQuery);

  const isLoading = userLoading || recordsLoading;

  const columns = [
    { accessorKey: 'courseName', header: 'Course/Certification' },
    { accessorKey: 'expiryDate', header: 'Expiry Date' },
    { 
        accessorKey: 'status', 
        header: 'Status',
        cell: ({ row }: { row: { original: { status: string } } }) => (
            <StatusPill status={getPillStatus(row.original.status)} />
        )
    },
  ];

  return (
    <ModulePageLayout
      title="My Compliance"
      description="Your training records, licenses, and compliance status."
    >
      <ModuleDataTable
        title="My Training Records"
        description="A list of your current and expired certifications."
        columns={columns}
        data={data ?? []}
        loading={isLoading}
        error={error}
      />
    </ModulePageLayout>
  );
}
