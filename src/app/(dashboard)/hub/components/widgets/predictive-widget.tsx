'use client';

import { useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, orderBy, query, limit } from 'firebase/firestore';
import { DashboardWidget } from './dashboard-widget';
import { Loader2 } from 'lucide-react';

export function PredictiveWidget() {
  const firestore = useFirestore();

  const predictionsQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(
        collection(firestore, 'predictiveOutputs'),
        orderBy('predictionDate', 'desc'),
        limit(1)
    );
  }, [firestore]);

  const { data: predictions, loading, error } = useCollection(predictionsQuery);
  const latestPrediction = predictions?.[0];

  return (
    <DashboardWidget
      title="Predictive"
      description="Top predicted issues."
      link="/predictive"
    >
      {loading && <Loader2 className="mx-auto my-4 size-6 animate-spin text-primary" />}
      {error && <p className="text-destructive text-sm">Error loading data.</p>}
      {!loading && !error && (
        <div className="space-y-4 text-center">
            <div className="text-center">
                <p className="text-2xl font-bold font-headline text-primary">{latestPrediction?.predictedValue ? `${latestPrediction.predictedValue.toFixed(1)}h` : 'N/A'}</p>
                <p className="text-sm text-muted-foreground truncate">{latestPrediction?.targetMetric || 'No predictions'}</p>
            </div>
            <div>
                <p className="text-2xl font-bold font-headline text-primary">92%</p>
                <p className="text-sm text-muted-foreground">Avg. Model Accuracy</p>
            </div>
        </div>
      )}
    </DashboardWidget>
  );
}
