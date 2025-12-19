

import { ModuleGrid } from "./components/module-grid";
import { AiInsightsStrip } from "./components/ai-insights-strip";
import { UserRole, serviceCatalog } from "@/lib/service-catalog";
import { ActionCenterWidget } from "./components/widgets/action-center-widget";
import { LoadPassportWidget } from "./components/widgets/load-passport-widget";

// Mock data for demonstration purposes.
// In a real app, this would come from user authentication.
const MOCK_CURRENT_USER_ROLE: UserRole = "Admin"; 

export default function HubPage() {
  const userVisibleServices = serviceCatalog.filter(service => 
    service.enabled && 
    service.widget &&
    service.rolesAllowed.includes(MOCK_CURRENT_USER_ROLE)
  );

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-headline font-semibold text-primary">Smart Mining HUB</h1>
        <p className="text-muted-foreground">Unified operational truth source for safer, smarter, and more efficient mining.</p>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 2xl:grid-cols-6 gap-6">
        <ActionCenterWidget />
        <LoadPassportWidget />
        {userVisibleServices.map((service) => {
          const Widget = service.widget!;
          return <Widget key={service.id} />;
        })}
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-primary/80">AI Insights</h2>
        <AiInsightsStrip />
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-primary/80">Operational Intelligence Modules</h2>
        <ModuleGrid />
      </section>
      
    </div>
  );
}
