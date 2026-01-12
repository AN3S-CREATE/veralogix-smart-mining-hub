'use client';

import { KPITile } from "@/components/shared/kpi-tile";
import { ModuleDataTable } from "@/components/shared/module-data-table";

const fatigueData = [
    { operatorId: 'EMP001', name: 'John Doe', risk: 'Low', hours: '7.8', status: 'Active' },
    { operatorId: 'EMP002', name: 'Jane Smith', risk: 'Medium', hours: '9.2', status: 'Active' },
    { operatorId: 'EMP003', name: 'Mike Johnson', risk: 'High', hours: '11.5', status: 'Alert' },
    { operatorId: 'EMP004', name: 'Sarah Davis', risk: 'Low', hours: '6.5', status: 'Break' },
];

const columns = [
    { accessorKey: 'operatorId', header: 'Operator ID' },
    { accessorKey: 'name', header: 'Name' },
    { accessorKey: 'risk', header: 'Fatigue Risk' },
    { accessorKey: 'hours', header: 'Hours Worked' },
    { accessorKey: 'status', header: 'Status' },
];

export default function FatigueManagementPage() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-headline font-semibold text-primary">Fatigue Management</h1>
        <p className="text-muted-foreground">Proactively identify and mitigate operator fatigue risk.</p>
      </header>
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPITile title="High-Risk Operators" value="1" unit="" trend="up" trendValue="+1 vs yesterday" />
        <KPITile title="Medium-Risk Operators" value="1" unit="" trend="down" trendValue="-2 vs yesterday" />
        <KPITile title="Total Fatigue Alerts" value="8" unit="today" trend="flat" trendValue="Stable" />
        <KPITile title="Avg. Shift Hours" value="8.1" unit="hrs" trend="down" trendValue="-0.3 vs last week" />
       </div>
      <ModuleDataTable
        title="Operator Fatigue Levels"
        description="Live dashboard of operators with fatigue risk indicators."
        columns={columns}
        data={fatigueData}
      />
    </div>
  );
}
