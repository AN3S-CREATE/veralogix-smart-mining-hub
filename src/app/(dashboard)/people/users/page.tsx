
'use client';

import { useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, query } from 'firebase/firestore';
import { ModulePageLayout } from '@/components/shared/module-page-layout';
import { ModuleDataTable } from '@/components/shared/module-data-table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MoreHorizontal } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default function UsersPage() {
  const firestore = useFirestore();

  const usersQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(collection(firestore, 'users'));
  }, [firestore]);

  const { data: users, loading, error } = useCollection(usersQuery);

  const columns = [
    {
      accessorKey: 'displayName',
      header: 'Name',
    },
    {
      accessorKey: 'email',
      header: 'Email',
    },
    {
      accessorKey: 'roleIds',
      header: 'Roles',
      cell: ({ row }: { row: { original: { roleIds: string[] } } }) => (
        <div className="flex flex-wrap gap-1">
          {row.original.roleIds?.map((roleId) => (
            <Badge key={roleId} variant="secondary">{roleId}</Badge>
          ))}
        </div>
      ),
    },
    {
      id: 'actions',
      cell: ({ row }: { row: { original: any } }) => {
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button aria-haspopup="true" size="icon" variant="ghost">
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem>Edit</DropdownMenuItem>
              <DropdownMenuItem>Assign Role</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  return (
    <ModulePageLayout
      title="User Management"
      description="View and manage all users in the system."
    >
      <ModuleDataTable
        title="All Users"
        description="A list of all users and their assigned roles."
        columns={columns}
        data={users ?? []}
        loading={loading}
        error={error}
      />
    </ModulePageLayout>
  );
}
