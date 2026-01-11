'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ReportFilters } from "./components/report-filters";
import { ReportPreviewLayout } from "./components/report-preview-layout";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { FileDown, Printer } from "lucide-react";

const reportTypes = [
  "Daily Shift Pack",
  "Weekly Efficiency Review",
  "Monthly Safety & Compliance",
  "Quarterly ROI & ESG",
  "Network & OT SLA",
];

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <header className="flex justify-between items-start">
        <div>
            <h1 className="text-3xl font-headline font-semibold text-primary">Report Packs</h1>
            <p className="text-muted-foreground">Generate and view operational reports.</p>
        </div>
        <div className="flex gap-2">
             <Button variant="outline" size="sm" onClick={() => window.print()}>
                <Printer className="mr-2 h-4 w-4" /> Print
             </Button>
        </div>
      </header>

      <Tabs defaultValue={reportTypes[0]} className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-5 h-auto">
          {reportTypes.map((type) => (
            <TabsTrigger key={type} value={type} className="h-12 text-center sm:h-10">{type}</TabsTrigger>
          ))}
        </TabsList>
        
        <ReportFilters />

        {reportTypes.map((type) => (
          <TabsContent key={type} value={type} className="space-y-6">
            <ReportPreviewLayout title={type} />
            <div className="flex justify-end gap-2">
                <Button variant="outline">
                    <FileDown className="mr-2 h-4 w-4" /> Export CSV
                </Button>
                 <Button>
                    <FileDown className="mr-2 h-4 w-4" /> Export PDF
                </Button>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
