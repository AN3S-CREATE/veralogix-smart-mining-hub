
'use client';

import { useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, query } from 'firebase/firestore';
import { ModulePageLayout } from '@/components/shared/module-page-layout';
import { ModuleDataTable } from '@/components/shared/module-data-table';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function PeopleOverviewPage() {
  const firestore = useFirestore();

  const employeeProfilesQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(collection(firestore, 'employeeProfiles'));
  }, [firestore]);

  const { data: employees, loading, error } = useCollection(employeeProfilesQuery);

  const columns = [
    { accessorKey: 'employeeId', header: 'Employee ID' },
    { accessorKey: 'firstName', header: 'First Name' },
    { accessorKey: 'lastName', header: 'Last Name' },
    { accessorKey: 'position', header: 'Position' },
    { accessorKey: 'department', header: 'Department' },
  ];

  return (
    <ModulePageLayout
      title="People Overview"
      description="Central hub for managing employees, compliance, and payroll."
    >
      <div className="flex gap-2 mb-4">
        <Button asChild><Link href="/people/me">My Profile</Link></Button>
        <Button asChild variant="secondary"><Link href="/people/users">User Admin</Link></Button>
      </div>
      <ModuleDataTable
        title="All Employee Profiles"
        description="A directory of all employees in the system."
        columns={columns}
        data={employees ?? []}
        loading={loading}
        error={error}
      />
    </ModulePageLayout>
  );
}
