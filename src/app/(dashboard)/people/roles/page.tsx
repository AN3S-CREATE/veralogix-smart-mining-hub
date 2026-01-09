
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

export default function RolesPage() {
  const firestore = useFirestore();

  const rolesQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(collection(firestore, 'roles'));
  }, [firestore]);

  const { data: roles, loading, error } = useCollection(rolesQuery);

  const columns = [
    {
      accessorKey: 'name',
      header: 'Role Name',
    },
    {
      accessorKey: 'description',
      header: 'Description',
    },
    {
      accessorKey: 'permissions',
      header: 'Permissions Count',
      cell: ({ row }: { row: { original: { permissions: string[] } } }) => (
        <Badge variant="secondary">{row.original.permissions?.length || 0}</Badge>
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
              <DropdownMenuItem>Manage Permissions</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  return (
    <ModulePageLayout
      title="Role Management"
      description="Define roles and manage their associated permissions."
    >
      <ModuleDataTable
        title="All Roles"
        description="A list of all roles in the system."
        columns={columns}
        data={roles ?? []}
        loading={loading}
        error={error}
      />
    </ModulePageLayout>
  );
}
