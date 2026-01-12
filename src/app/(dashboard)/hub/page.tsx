
'use client';

import { ModuleGrid } from "./components/module-grid";
import { AiInsightsStrip } from "./components/ai-insights-strip";
import { useRole } from "@/contexts/role-provider";
import { RoleSelector } from "@/components/global/role-selector";
import { Badge } from "@/components/ui/badge";

export default function HubPage() {
    const { role } = useRole();
  return (
    <div className="space-y-6">
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-headline font-semibold text-primary">Veralogix Smart Mining HUB</h1>
          <p className="text-muted-foreground">A unified source of truth for safer, smarter mining operations.</p>
        </div>
        <div className="flex items-center gap-4">
            <RoleSelector />
            <Badge variant="outline" className="border-accent text-accent">
                Tenant: Veralogix | Role: {role}
            </Badge>
        </div>
      </header>

      <AiInsightsStrip />
      
      <ModuleGrid />
    </div>
  );
}
