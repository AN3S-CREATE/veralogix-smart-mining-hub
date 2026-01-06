
'use client';

import { addDoc, collection } from 'firebase/firestore';
import { useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { DataCaptureForm } from '@/components/shared/data-capture-form';
import { ModuleDataTable } from '@/components/shared/module-data-table';
import { toast } from '@/hooks/use-toast';
import { createAlert } from '@/lib/operational-engine';

export function BlastingSection() {
  const firestore = useFirestore();

  const blastDesignsQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return collection(firestore, 'blastDesigns');
  }, [firestore]);

  const { data, loading, error } = useCollection(blastDesignsQuery);

  const columns = [
    { accessorKey: 'blastId', header: 'Blast ID' },
    { accessorKey: 'location', header: 'Location' },
    { accessorKey: 'designDate', header: 'Design Date' },
    { accessorKey: 'powderFactor', header: 'Powder Factor' },
    { accessorKey: 'status', header: 'Status' },
  ];

  const handleAddBlastDesign = (formData: Record<string, any>) => {
    if (!firestore) return;
    
    const docData = {
      ...formData,
      powderFactor: parseFloat(formData.powderFactor),
      designDate: new Date().toISOString(),
    };

    addDoc(collection(firestore, 'blastDesigns'), docData)
      .then(() => {
        toast({ title: 'Success', description: 'Blast design added.' });
        if (docData.powderFactor > 0.9) {
          createAlert(firestore, {
            moduleKey: 'plant',
            severity: 'High',
            description: `High powder factor (${docData.powderFactor}) detected for blast ${docData.blastId}.`,
          }).then(() => {
            toast({ title: 'Alert Created', description: 'High powder factor alert triggered.' });
          });
        }
      })
      .catch((e) => {
        console.error(e);
        toast({ title: 'Error', description: 'Could not add blast design.', variant: 'destructive' });
      });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        <div className="lg:col-span-2">
            <ModuleDataTable
                title="Blast Designs"
                description="List of current and past blast designs."
                columns={columns}
                data={data ?? []}
                loading={loading}
                error={error}
            />
        </div>
        <DataCaptureForm
            title="Add Blast Design"
            description="Manually capture a new blast design."
            fields={[
                { name: 'blastId', label: 'Blast ID', placeholder: 'e.g., B-07-N1' },
                { name: 'location', label: 'Location', placeholder: 'e.g., Pit B North Wall' },
                { name: 'powderFactor', label: 'Powder Factor', type: 'number', placeholder: 'e.g., 0.8' },
                { name: 'status', label: 'Status', placeholder: 'e.g., Designed' },
            ]}
            onSubmit={handleAddBlastDesign}
        />
    </div>
  );
}
