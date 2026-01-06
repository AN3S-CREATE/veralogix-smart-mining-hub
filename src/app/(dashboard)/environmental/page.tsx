
'use client';

import { addDoc, collection } from 'firebase/firestore';
import { useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { ModulePageLayout } from '@/components/shared/module-page-layout';
import { ModuleKpiGrid, type Kpi } from '@/components/shared/module-kpi-grid';
import { DataCaptureForm } from '@/components/shared/data-capture-form';
import { ModuleDataTable } from '@/components/shared/module-data-table';
import { toast } from '@/hooks/use-toast';
import { createAlert } from '@/lib/operational-engine';
import { useMemo } from 'react';
import { EvidenceUploader } from '@/components/shared/evidence-uploader';

export default function EnvironmentalPage() {
  const firestore = useFirestore();

  const envDataQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return collection(firestore, 'environmentalData');
  }, [firestore]);

  const { data, loading, error } = useCollection(envDataQuery);

  const kpis: Kpi[] = useMemo(() => [
    { title: "Dust Monitoring", value: "Compliant" },
    { title: "Water Quality", value: "Compliant" },
    { title: "CO₂ Index (MTD)", value: "97.5" },
    { title: "Compliance Breaches (24h)", value: data ? `${data.filter(d => d.complianceStatus === 'Breach').length}` : '...' },
  ], [data]);

  const columns = [
    { accessorKey: 'timestamp', header: 'Timestamp' },
    { accessorKey: 'metricType', header: 'Metric Type' },
    { accessorKey: 'value', header: 'Value' },
    { accessorKey: 'unit', header: 'Unit' },
    { accessorKey: 'complianceStatus', header: 'Status' },
    { 
        accessorKey: 'actions', 
        header: 'Evidence',
        cell: ({ row }: { row: { original: { id: string } } }) => (
            <EvidenceUploader 
                linkedType="environmental" 
                linkedId={row.original.id} 
                variant="icon"
            />
        )
    },
  ];

  const handleAddDataPoint = (formData: Record<string, any>) => {
    if (!firestore) return;

    const docData = {
      ...formData,
      value: parseFloat(formData.value),
      timestamp: new Date().toISOString(),
    };

    addDoc(collection(firestore, 'environmentalData'), docData)
      .then(() => {
        toast({ title: 'Success', description: 'Environmental data point added.' });
        if (docData.complianceStatus === 'Breach') {
            createAlert(firestore, {
              moduleKey: 'environmental',
              severity: 'Critical',
              description: `Compliance breach: ${docData.metricType} at ${docData.value} ${docData.unit}`,
            }).then(() => {
              toast({ title: 'Alert Created', description: 'Compliance breach alert has been triggered.' });
            });
        }
      })
      .catch((e) => {
        console.error(e);
        toast({ title: 'Error', description: 'Could not add data point.', variant: 'destructive' });
      });
  };

  return (
    <ModulePageLayout
      title="Smart Environmental Compliance"
      description="Track emissions, water, and dust compliance."
    >
      <ModuleKpiGrid kpis={kpis} />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        <div className="lg:col-span-2">
          <ModuleDataTable
            title="Recent Environmental Data"
            description="Latest environmental readings and compliance status."
            columns={columns}
            data={data ?? []}
            loading={loading}
            error={error}
          />
        </div>
        <DataCaptureForm
          title="Add Environmental Data"
          description="Manually capture a new environmental data point."
          fields={[
            { name: 'metricType', label: 'Metric Type', placeholder: 'e.g., Dust Level' },
            { name: 'value', label: 'Value', type: 'number', placeholder: 'e.g., 45.5' },
            { name: 'unit', label: 'Unit', placeholder: 'e.g., mg/m³' },
            { name: 'complianceStatus', label: 'Status', placeholder: 'e.g., Compliant' },
          ]}
          onSubmit={handleAddDataPoint}
        />
      </div>
    </ModulePageLayout>
  );
}
