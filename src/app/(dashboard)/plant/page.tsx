'use client';

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlantKpiGrid } from "./components/plant-kpi-grid";
import { ProcessFlowBand } from "./components/process-flow-band";
import { ProcessUnitDetailsCard } from "./components/process-unit-details-card";
import { TailingsRiskCard } from "./components/tailings-risk-card";
import type { PlantUnit } from "./components/process-flow-band";
import { BlastingSection } from "./components/blasting-section";
import { DrillAndBlastSection } from "./components/drill-blast-section";
import { StockpileManagementSection } from "./components/stockpile-management-section";

export default function PlantPage() {
  const [selectedUnit, setSelectedUnit] = useState<PlantUnit | null>(null);

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-headline font-semibold text-primary">Smart Operations</h1>
        <p className="text-muted-foreground">Live overview of plant processes, blasting, and stockpile management.</p>
      </header>

      <Tabs defaultValue="process-intelligence">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="process-intelligence">Process Intelligence</TabsTrigger>
          <TabsTrigger value="stockpile">Stockpile Management</TabsTrigger>
          <TabsTrigger value="blasting">Blasting Optimization</TabsTrigger>
          <TabsTrigger value="drill-blast">Drill & Blast</TabsTrigger>
        </TabsList>
        <TabsContent value="process-intelligence" className="mt-6 space-y-6">
            <section className="space-y-4">
                <h2 className="text-xl font-semibold text-primary/80">Overall Plant KPIs</h2>
                <PlantKpiGrid />
            </section>
            <section className="space-y-4">
                <h2 className="text-xl font-semibold text-primary/80">Process Flow & Sensor Health</h2>
                <ProcessFlowBand onUnitSelect={setSelectedUnit} selectedUnit={selectedUnit} />
            </section>
            {selectedUnit && (
                <section>
                    <h2 className="text-xl font-semibold text-primary/80">Details for: {selectedUnit.name}</h2>
                    <ProcessUnitDetailsCard unit={selectedUnit} />
                </section>
            )}
            <section className="space-y-4">
                <h2 className="text-xl font-semibold text-primary/80">Tailings Management</h2>
                <TailingsRiskCard />
            </section>
        </TabsContent>
        <TabsContent value="stockpile" className="mt-6">
            <StockpileManagementSection />
        </TabsContent>
        <TabsContent value="blasting" className="mt-6">
            <BlastingSection />
        </TabsContent>
        <TabsContent value="drill-blast" className="mt-6">
            <DrillAndBlastSection />
        </TabsContent>
      </Tabs>
    </div>
  );
}
