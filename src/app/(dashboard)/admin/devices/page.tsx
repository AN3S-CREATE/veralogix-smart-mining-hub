
'use client';

import { ModulePageLayout } from "@/components/shared/module-page-layout";
import { ModuleDataTable } from "@/components/shared/module-data-table";
import { useCollection, useFirestore, useMemoFirebase } from "@/firebase";
import { collection } from "firebase/firestore";

export default function DeviceRegistryPage() {
    const firestore = useFirestore();

    const devicesQuery = useMemoFirebase(() => {
        if (!firestore) return null;
        return collection(firestore, 'devices');
    }, [firestore]);

    const { data: devices, loading, error } = useCollection(devicesQuery);

    const columns = [
        { accessorKey: 'id', header: 'Device ID' },
        { accessorKey: 'type', header: 'Type' },
        { accessorKey: 'status', header: 'Status' },
        { accessorKey: 'lastPing', header: 'Last Seen' },
    ];

    return (
        <ModulePageLayout
            title="Device Registry"
            description="IoT devices, sensors, and environmental monitors."
        >
             <ModuleDataTable 
                title="Registered Devices"
                description="Inventory of all connected hardware."
                columns={columns}
                data={devices || []}
                loading={loading}
                error={error}
            />
        </ModulePageLayout>
    );
}
