
'use client';

import { addDoc, collection } from 'firebase/firestore';
import { useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { DataCaptureForm } from '@/components/shared/data-capture-form';
import { ModuleDataTable } from '@/components/shared/module-data-table';
import { toast } from '@/hooks/use-toast';
import { createAlert } from '@/lib/operational-engine';

export function StockpileManagementSection() {
  const firestore = useFirestore();

  const stockpileQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return collection(firestore, 'stockpileVolumes');
  }, [firestore]);

  const { data, loading, error } = useCollection(stockpileQuery);

  const columns = [
    { accessorKey: 'stockpileName', header: 'Stockpile' },
    { accessorKey: 'measuredVolume', header: 'Volume (m³)' },
    { accessorKey: 'measuredTonnage', header: 'Tonnage (t)' },
    { accessorKey: 'surveyDate', header: 'Survey Date' },
    { accessorKey: 'surveyMethod', header: 'Method' },
  ];

  const handleAddStockpile = (formData: Record<string, any>) => {
    if (!firestore) return;
    
    const docData = {
      ...formData,
      measuredVolume: parseFloat(formData.measuredVolume),
      measuredTonnage: parseFloat(formData.measuredTonnage),
      surveyDate: new Date().toISOString(),
    };

    addDoc(collection(firestore, 'stockpileVolumes'), docData)
      .then(() => {
        toast({ title: 'Success', description: 'Stockpile data added.' });
        if(docData.measuredTonnage > 50000) {
          createAlert(firestore, {
              moduleKey: 'plant',
              severity: 'Info',
              description: `Large stockpile measured: ${docData.stockpileName} at ${docData.measuredTonnage} tonnes.`,
          }).then(() => {
            toast({ title: 'Info', description: 'Large stockpile measurement recorded.' });
          });
        }
      })
      .catch((e) => {
        console.error(e);
        toast({ title: 'Error', description: 'Could not add stockpile data.', variant: 'destructive' });
      });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        <div className="lg:col-span-2">
            <ModuleDataTable
                title="Stockpile Volumes"
                description="List of recent stockpile surveys."
                columns={columns}
                data={data ?? []}
                loading={loading}
                error={error}
            />
        </div>
        <DataCaptureForm
            title="Add Stockpile Survey"
            description="Manually capture a new stockpile measurement."
            fields={[
                { name: 'stockpileName', label: 'Stockpile Name', placeholder: 'e.g., ROM Pad A' },
                { name: 'measuredVolume', label: 'Measured Volume (m³)', type: 'number', placeholder: 'e.g., 12500' },
                { name: 'measuredTonnage', label: 'Measured Tonnage (t)', type: 'number', placeholder: 'e.g., 22500' },
                { name: 'surveyMethod', label: 'Survey Method', placeholder: 'e.g., Drone' },
            ]}
            onSubmit={handleAddStockpile}
        />
    </div>
  );
}
