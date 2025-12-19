import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { StatusPill, StatusPillStatus } from "@/components/shared/status-pill";

type LoadStatus = "Under" | "Optimal" | "Over";

interface Load {
    time: string;
    payload: string;
    status: LoadStatus;
}

const recentLoads: Load[] = [
    { time: "14:08", payload: "64.8t / 38.1m³", status: "Optimal" },
    { time: "13:42", payload: "67.2t / 39.5m³", status: "Over" },
    { time: "13:15", payload: "61.3t / 36.1m³", status: "Under" },
    { time: "12:49", payload: "65.1t / 38.3m³", status: "Optimal" },
    { time: "12:21", payload: "64.5t / 37.9m³", status: "Optimal" },
];

const statusMap: Record<LoadStatus, StatusPillStatus> = {
    Under: "Warning",
    Optimal: "OK",
    Over: "Critical",
};


export function RecentLoadsCard() {
    return (
        <Card className="card-hover">
            <CardHeader>
                <CardTitle>Recent Loads</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Time</TableHead>
                            <TableHead>Payload (Tonnes / Volume)</TableHead>
                            <TableHead>Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {recentLoads.map((load, index) => (
                            <TableRow key={index}>
                                <TableCell className="font-mono">{load.time}</TableCell>
                                <TableCell>{load.payload}</TableCell>
                                <TableCell>
                                    <StatusPill status={statusMap[load.status]} />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}
