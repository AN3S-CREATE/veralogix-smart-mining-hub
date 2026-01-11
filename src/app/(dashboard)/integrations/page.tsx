
'use client';

import { useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, query, orderBy } from 'firebase/firestore';
import { ModulePageLayout } from '@/components/shared/module-page-layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, Link as LinkIcon, Activity, CheckCircle, AlertCircle } from 'lucide-react';
import { format } from 'date-fns';

export default function IntegrationsPage() {
  const firestore = useFirestore();

  // Fetch integration status logs or registry
  // For prototype, we might just query 'ingestionLogs' to show activity
  const logsQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(
      collection(firestore, 'ingestionLogs'),
      orderBy('ts', 'desc'),
    );
  }, [firestore]);

  const { data: logs, loading } = useCollection(logsQuery);

  const activeIntegrations = [
      { id: 'iot-hub', name: 'IoT Sensor Hub', type: 'MQTT', status: 'Active', lastSync: '2 mins ago' },
      { id: 'weather-api', name: 'OpenWeatherMap', type: 'REST API', status: 'Active', lastSync: '15 mins ago' },
      { id: 'erp-sap', name: 'SAP Plant Maintenance', type: 'SOAP', status: 'Paused', lastSync: '4 hours ago' },
      { id: 'fleet-geotab', name: 'Geotab Fleet', type: 'REST API', status: 'Error', lastSync: '10 mins ago' },
  ];

  return (
    <ModulePageLayout
      title="Data & Integrations"
      description="Manage external connections and monitor data ingestion health."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {activeIntegrations.map((integration) => (
            <Card key={integration.id} className="glass-panel hover:border-primary transition-colors cursor-pointer">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">{integration.name}</CardTitle>
                    {integration.status === 'Active' && <CheckCircle className="h-4 w-4 text-green-500" />}
                    {integration.status === 'Paused' && <Activity className="h-4 w-4 text-yellow-500" />}
                    {integration.status === 'Error' && <AlertCircle className="h-4 w-4 text-red-500" />}
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold font-headline">{integration.type}</div>
                    <div className="flex justify-between items-center mt-1">
                         <Badge variant={integration.status === 'Active' ? 'default' : 'outline'}>
                            {integration.status}
                         </Badge>
                         <span className="text-xs text-muted-foreground">{integration.lastSync}</span>
                    </div>
                </CardContent>
            </Card>
        ))}
      </div>

      <Card className="glass-panel">
          <CardHeader>
              <CardTitle>Ingestion Log Stream</CardTitle>
              <CardDescription>Real-time record of all data packets received.</CardDescription>
          </CardHeader>
          <CardContent>
              {loading && <div className="flex justify-center p-4"><Loader2 className="animate-spin" /></div>}
              {!loading && (
                  <div className="space-y-4">
                      {logs && logs.length > 0 ? logs.map((log: any) => (
                          <div key={log.id} className="flex items-center justify-between border-b border-border pb-2 last:border-0 last:pb-0">
                              <div className="flex items-center gap-3">
                                  <div className={`w-2 h-2 rounded-full ${log.success ? 'bg-green-500' : 'bg-red-500'}`} />
                                  <div>
                                      <p className="text-sm font-medium">{log.source} &rarr; {log.eventType}</p>
                                      <p className="text-xs text-muted-foreground">{log.id}</p>
                                  </div>
                              </div>
                              <span className="text-xs text-muted-foreground">
                                  {log.ts?.toDate ? format(log.ts.toDate(), 'HH:mm:ss') : 'Just now'}
                              </span>
                          </div>
                      )) : (
                          <p className="text-sm text-muted-foreground text-center py-4">No recent ingestion logs.</p>
                      )}
                  </div>
              )}
          </CardContent>
      </Card>
    </ModulePageLayout>
  );
}
