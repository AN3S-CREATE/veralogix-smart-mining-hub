
'use client';

import { ModulePageLayout } from "@/components/shared/module-page-layout";
import { ModuleDataTable } from "@/components/shared/module-data-table";
import { useCollection, useFirestore, useMemoFirebase } from "@/firebase";
import { collection, query, where } from "firebase/firestore";

export default function UserManagementPage() {
    const firestore = useFirestore();
    
    // In a real app, you might query a dedicated 'users' collection 
    // that mimics Auth data + custom profile fields.
    const usersQuery = useMemoFirebase(() => {
        if (!firestore) return null;
        return collection(firestore, 'users');
    }, [firestore]);

    const { data: users, loading, error } = useCollection(usersQuery);

    const columns = [
        { accessorKey: 'email', header: 'Email' },
        { accessorKey: 'displayName', header: 'Name' },
        { accessorKey: 'roleIds', header: 'Roles' }, // Array render needs handling in table or here
        { accessorKey: 'siteId', header: 'Site' },
    ];

    return (
        <ModulePageLayout
            title="User Management"
            description="Manage platform users and access rights."
        >
            <ModuleDataTable 
                title="All Users"
                description="List of registered users."
                columns={columns}
                data={users || []}
                loading={loading}
                error={error}
            />
        </ModulePageLayout>
    );
}
