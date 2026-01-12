
'use client';

import { useRole } from '@/contexts/role-provider';
import { AdminDashboard } from './roles/admin-dashboard';
import { OpsDashboard } from './roles/ops-dashboard';
import { SafetyDashboard } from './roles/safety-dashboard';
import { HrDashboard } from './roles/hr-dashboard';
import { ViewerDashboard } from './roles/viewer-dashboard';
import { RoleSelector } from '@/components/global/role-selector';
import { Badge } from '@/components/ui/badge';
import { SiteSelector } from '@/components/global/site-selector';

export default function DashboardPage() {
  const { role } = useRole();

  const renderDashboardByRole = () => {
    switch (role) {
      case 'Admin':
        return <AdminDashboard />;
      case 'Ops':
        return <OpsDashboard />;
      case 'Safety':
        return <SafetyDashboard />;
      case 'HR':
        return <HrDashboard />;
      case 'Viewer':
        return <ViewerDashboard />;
      default:
        return <ViewerDashboard />;
    }
  };

  return (
    <div className="space-y-6">
       <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-headline font-semibold text-primary">Veralogix Smart Mining HUB</h1>
          <p className="text-muted-foreground">A unified source of truth for safer, smarter mining operations.</p>
        </div>
        <div className="flex items-center gap-4">
            {role === 'Admin' && <SiteSelector />}
            <RoleSelector />
            <Badge variant="outline" className="border-accent text-accent">
                Tenant: Veralogix | Role: {role}
            </Badge>
        </div>
      </header>
      
      {renderDashboardByRole()}
    </div>
  );
}
