
'use client';

import { ModuleTile } from "./module-tile";
import { serviceCatalog, type UserRole } from "@/lib/service-catalog";

// Mock data for demonstration purposes.
// In a real app, this would come from user authentication and tenant configuration.
const MOCK_CURRENT_USER_ROLE: UserRole = "Admin"; 
const MOCK_TENANT_CONFIG = {
  enabledServices: serviceCatalog.filter(s => s.enabled).map(s => s.id),
};

export function ModuleGrid() {
  const availableServices = serviceCatalog.filter(service => 
    MOCK_TENANT_CONFIG.enabledServices.includes(service.id) &&
    service.rolesAllowed.includes(MOCK_CURRENT_USER_ROLE)
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {availableServices.map((service) => (
        <ModuleTile
          key={service.id}
          title={service.title}
          description={service.description}
          status={service.status}
          kpis={service.kpis}
          link={service.href}
          icon={service.icon}
        />
      ))}
    </div>
  );
}
