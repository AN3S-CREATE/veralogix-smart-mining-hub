import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function NetworkPage() {
  return (
    <div className="space-y-4">
      <header>
        <h1 className="text-3xl font-headline font-semibold text-primary">Smart Network Status</h1>
        <p className="text-muted-foreground">Monitor and manage your network infrastructure.</p>
      </header>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Network Health</CardTitle>
            <CardDescription>Live status of all network nodes.</CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Data Throughput</CardTitle>
            <CardDescription>Bandwidth usage and data transfer rates.</CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Connected Devices</CardTitle>
            <CardDescription>List of all devices connected to the network.</CardDescription>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
}
