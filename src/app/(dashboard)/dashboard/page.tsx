'use client';

import { useRole } from '@/contexts/role-provider';

import { AdminDashboard } from './roles/admin-dashboard';
import { OpsDashboard } from './roles/ops-dashboard';
import { SafetyDashboard } from './roles/safety-dashboard';
import { HrDashboard } from './roles/hr-dashboard';
import { ViewerDashboard } from './roles/viewer-dashboard';
import { ModulePageLayout } from '@/components/shared/module-page-layout';

export default function DashboardPage() {
  const { role } = useRole();

  const renderDashboard = () => {
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
        return <p>Invalid role selected.</p>;
    }
  };

  return (
    <ModulePageLayout
      title={`${role} Dashboard`}
      description="Key metrics and insights tailored to your role."
    >
      {renderDashboard()}
    </ModulePageLayout>
  );
}
