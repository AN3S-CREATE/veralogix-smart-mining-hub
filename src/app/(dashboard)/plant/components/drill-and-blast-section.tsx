
'use client';

import { addDoc, collection } from 'firebase/firestore';
import { useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { DataCaptureForm } from '@/components/shared/data-capture-form';
import { ModuleDataTable } from '@/components/shared/module-data-table';
import { toast } from '@/hooks/use-toast';
import { createAlert } from '@/lib/operational-engine';

export function DrillAndBlastSection() {
  const firestore = useFirestore();

  const drillLogsQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return collection(firestore, 'drillLogs');
  }, [firestore]);

  const { data, loading, error } = useCollection(drillLogsQuery);

  const columns = [
    { accessorKey: 'holeId', header: 'Hole ID' },
    { accessorKey: 'blastId', header: 'Blast ID' },
    { accessorKey: 'depth', header: 'Depth (m)' },
    { accessorKey: 'location', header: 'Location' },
    { accessorKey: 'timestamp', header: 'Timestamp' },
  ];

  const handleAddDrillLog = (formData: Record<string, any>) => {
    if (!firestore) return;
    
    const docData = {
      ...formData,
      depth: parseFloat(formData.depth),
      timestamp: new Date().toISOString(),
    };

    addDoc(collection(firestore, 'drillLogs'), docData)
      .then(() => {
        toast({ title: 'Success', description: 'Drill log added.' });
        if (docData.depth > 20) { // Example threshold for deep drill hole
          createAlert(firestore, {
            moduleKey: 'plant',
            severity: 'Warning',
            description: `Unusually deep drill hole logged: ${docData.depth}m for hole ${docData.holeId}.`,
          }).then(() => {
            toast({ title: 'Alert Created', description: 'Deep drill hole alert triggered.' });
          });
        }
      })
      .catch((e) => {
        console.error(e);
        toast({ title: 'Error', description: 'Could not add drill log.', variant: 'destructive' });
      });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        <div className="lg:col-span-2">
            <ModuleDataTable
                title="Drill Logs"
                description="List of logged drill holes."
                columns={columns}
                data={data ?? []}
                loading={loading}
                error={error}
            />
        </div>
        <DataCaptureForm
            title="Add Drill Log"
            description="Manually capture a new drill log."
            fields={[
                { name: 'holeId', label: 'Hole ID', placeholder: 'e.g., H-123' },
                { name: 'blastId', label: 'Blast ID', placeholder: 'e.g., B-07-N1' },
                { name: 'depth', label: 'Depth (m)', type: 'number', placeholder: 'e.g., 15.5' },
                { name: 'location', label: 'Location', placeholder: 'e.g., GPS Coordinates' },
            ]}
            onSubmit={handleAddDrillLog}
        />
    </div>
  );
}
