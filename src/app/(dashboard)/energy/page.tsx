import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function EnergyPage() {
  return (
    <div className="space-y-4">
      <header>
        <h1 className="text-3xl font-headline font-semibold text-primary">Smart Energy Management</h1>
        <p className="text-muted-foreground">Monitor and optimize energy consumption across the site.</p>
      </header>
      <Card>
        <CardHeader>
          <CardTitle>Energy Consumption Dashboard</CardTitle>
          <CardDescription>Placeholder for energy-related KPIs, charts, and analytics.</CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
}
