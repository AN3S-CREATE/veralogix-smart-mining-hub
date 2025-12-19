
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

export default function EnergyPage() {
  const firestore = useFirestore();

  const energyMetricsQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return collection(firestore, 'energyMetrics');
  }, [firestore]);

  const { data: metrics, loading, error } = useCollection(energyMetricsQuery);

  const kpis: Kpi[] = useMemo(() => [
    { title: "Total Consumption (24h)", value: metrics ? `${(metrics.reduce((acc, m) => acc + (m.value || 0), 0) / 1000).toFixed(1)} MWh` : '...' },
    { title: "Avg. Cost per kWh", value: "ZAR 2.15" },
    { title: "Active AI Savings", value: "3.2%", isAI: true },
    { title: "Grid Stability", value: "99.8%" },
  ], [metrics]);

  const columns = [
    { accessorKey: 'timestamp', header: 'Timestamp' },
    { accessorKey: 'site', header: 'Site' },
    { accessorKey: 'metricName', header: 'Metric' },
    { accessorKey: 'value', header: 'Value' },
    { accessorKey: 'unit', header: 'Unit' },
  ];

  const handleAddMetric = async (data: Record<string, any>) => {
    if (!firestore) return;
    try {
      const docData = {
        ...data,
        value: parseFloat(data.value),
        timestamp: new Date().toISOString(),
      };
      await addDoc(collection(firestore, 'energyMetrics'), docData);
      toast({ title: 'Success', description: 'Energy metric added.' });
      
      if (parseFloat(data.value) > 1000) { // Example condition for an alert
        await createAlert(firestore, {
          moduleKey: 'energy',
          severity: 'High',
          description: `High energy consumption detected: ${data.value} ${data.unit} at ${data.site}`,
        });
        toast({ title: 'Alert Created', description: 'High energy consumption alert triggered.' });
      }
    } catch (e) {
      console.error(e);
      toast({ title: 'Error', description: 'Could not add metric.', variant: 'destructive' });
    }
  };

  return (
    <ModulePageLayout
      title="Smart Energy Management"
      description="Monitor and optimize energy consumption across the site."
    >
      <ModuleKpiGrid kpis={kpis} />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        <div className="lg:col-span-2">
          <ModuleDataTable
            title="Recent Energy Metrics"
            description="Latest energy consumption data points."
            columns={columns}
            data={metrics ?? []}
            loading={loading}
            error={error}
          />
        </div>
        <DataCaptureForm
          title="Add Energy Metric"
          description="Manually capture a new energy data point."
          fields={[
            { name: 'site', label: 'Site', placeholder: 'e.g., Pit A' },
            { name: 'metricName', label: 'Metric Name', placeholder: 'e.g., Crusher Consumption' },
            { name: 'value', label: 'Value', type: 'number', placeholder: 'e.g., 500' },
            { name: 'unit', label: 'Unit', placeholder: 'e.g., kWh' },
          ]}
          onSubmit={handleAddMetric}
        />
      </div>
    </ModulePageLayout>
  );
}
