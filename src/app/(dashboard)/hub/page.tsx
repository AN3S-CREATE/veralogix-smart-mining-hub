import { ModuleGrid } from "./components/module-grid";
import { AiInsightsStrip } from "./components/ai-insights-strip";
import { PeopleComplianceWidget } from "./components/widgets/people-compliance-widget";
import { SmartRiskWidget } from "./components/widgets/smart-risk-widget";
import { FleetWidget } from "./components/widgets/fleet-widget";
import { TransportWidget } from "./components/widgets/transport-widget";
import { SmartManagementWidget } from "./components/widgets/smart-management-widget";
import { UserRole } from "@/lib/service-catalog";

// Mock data for demonstration purposes.
// In a real app, this would come from user authentication.
const MOCK_CURRENT_USER_ROLE: UserRole = "Admin"; 

const roleWidgets: Record<UserRole, React.ComponentType[]> = {
  "Admin": [PeopleComplianceWidget, SmartRiskWidget, FleetWidget, TransportWidget, SmartManagementWidget],
  "Supervisor": [PeopleComplianceWidget, SmartRiskWidget, FleetWidget, TransportWidget],
  "Executive": [SmartManagementWidget, SmartRiskWidget],
  "Operator": [FleetWidget],
};

export default function HubPage() {
  const widgets = roleWidgets[MOCK_CURRENT_USER_ROLE] || [];

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-headline font-semibold text-primary">Smart Mining HUB</h1>
        <p className="text-muted-foreground">Unified operational truth source for safer, smarter, and more efficient mining.</p>
      </header>

      {widgets.length > 0 && (
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
          {widgets.map((Widget, index) => (
            <Widget key={index} />
          ))}
        </section>
      )}

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
