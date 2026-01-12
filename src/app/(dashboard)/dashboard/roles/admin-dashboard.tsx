'use client';

import { OpsKpiGrid } from './ops-dashboard';
import { SafetyKpiGrid } from './safety-dashboard';
import { HrKpiGrid } from './hr-dashboard';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

function SystemHealthCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>System Health</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-around">
          <div className="text-center">
            <p className="text-2xl font-bold text-primary">99.9%</p>
            <p className="text-xs text-muted-foreground">API Uptime</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-primary">88%</p>
            <p className="text-xs text-muted-foreground">Data Coverage</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}


export function AdminDashboard() {
  return (
    <div className="space-y-6">
      <section>
        <h2 className="text-lg font-semibold mb-2 text-primary">System Status</h2>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <SystemHealthCard />
        </div>
      </section>
      <section>
        <h2 className="text-lg font-semibold mb-2 text-primary">Operations KPIs</h2>
        <OpsKpiGrid />
      </section>
      <section>
        <h2 className="text-lg font-semibold mb-2 text-primary">Safety KPIs</h2>
        <SafetyKpiGrid />
      </section>
      <section>
        <h2 className="text-lg font-semibold mb-2 text-primary">HR & Compliance KPIs</h2>
        <HrKpiGrid />
      </section>
    </div>
  );
}
