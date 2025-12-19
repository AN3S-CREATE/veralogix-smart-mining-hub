'use client';

import { addDoc, collection } from 'firebase/firestore';
import { useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { ModulePageLayout } from '@/components/shared/module-page-layout';
import { ModuleKpiGrid, type Kpi } from '@/components/shared/module-kpi-grid';
import { DataCaptureForm } from '@/components/shared/data-capture-form';
import { ModuleDataTable } from '@/components/shared/module-data-table';
import { toast } from '@/hooks/use-toast';

export default function PredictiveAnalyticsPage() {
  const firestore = useFirestore();

  const predictionsQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return collection(firestore, 'predictiveOutputs');
  }, [firestore]);

  const { data, loading, error } = useCollection(predictionsQuery);

  const kpis: Kpi[] = [
    { title: "Failure Prediction Acc.", value: "92%", isAI: true },
    { title: "Production Forecast (24h)", value: "+2.5%", isAI: true },
    { title: "Safety Risk Index", value: "28/100", isAI: true },
    { title: "Models in Production", value: "12" },
  ];

  const columns = [
    { accessorKey: 'predictionDate', header: 'Date' },
    { accessorKey: 'modelName', header: 'Model' },
    { accessorKey: 'targetMetric', header: 'Target' },
    { accessorKey: 'predictedValue', header: 'Prediction' },
    { accessorKey: 'confidence', header: 'Confidence' },
  ];

  const handleAddPrediction = async (formData: Record<string, any>) => {
    if (!firestore) return;
    try {
      const docData = {
        ...formData,
        predictedValue: parseFloat(formData.predictedValue),
        confidence: parseFloat(formData.confidence),
        predictionDate: new Date().toISOString(),
      };
      await addDoc(collection(firestore, 'predictiveOutputs'), docData);
      toast({ title: 'Success', description: 'Predictive model output added.' });
    } catch (e) {
      console.error(e);
      toast({ title: 'Error', description: 'Could not add prediction.', variant: 'destructive' });
    }
  };

  return (
    <ModulePageLayout
      title="Smart Predictive Analytics"
      description="AI-driven forecasts and predictive models."
    >
      <ModuleKpiGrid kpis={kpis} />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        <div className="lg:col-span-2">
          <ModuleDataTable
            title="Recent Model Outputs"
            description="Latest outputs from production predictive models."
            columns={columns}
            data={data ?? []}
            loading={loading}
            error={error}
          />
        </div>
        <DataCaptureForm
          title="Add Model Output"
          description="Manually log a new prediction from a model."
          fields={[
            { name: 'modelName', label: 'Model Name', placeholder: 'e.g., Crusher_Failure_v2' },
            { name: 'targetMetric', label: 'Target Metric', placeholder: 'e.g., Time to Failure' },
            { name: 'predictedValue', label: 'Predicted Value', type: 'number', placeholder: 'e.g., 48' },
            { name: 'confidence', label: 'Confidence', type: 'number', placeholder: 'e.g., 0.92' },
          ]}
          onSubmit={handleAddPrediction}
        />
      </div>
    </ModulePageLayout>
  );
}
