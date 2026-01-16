'use client';

import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { generateShiftHandoverReport } from '@/ai/flows/shift-handover-report';
import { Loader2, Redo } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';

const MOCK_PREVIOUS_SHIFT_DATA = `
- Alert: High-grade ore detected in Sector 7.
- Anomaly: Truck T-78 shows unusual engine temperature spikes.
- Event: Minor slippage reported on haul road B. Geotech notified.
- Alert: Fuel levels for Excavator E-12 are critically low.
- Maintenance: Dozer D-04 scheduled for track replacement.
`;

export default function ShiftHandoverPage() {
  const [report, setReport] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchReport = async () => {
    setLoading(true);
    try {
      const result = await generateShiftHandoverReport({
        previousShiftData: MOCK_PREVIOUS_SHIFT_DATA,
        currentShift: 'Day Shift',
      });
      setReport(result.report);
    } catch (error) {
      console.error('Failed to generate shift handover report:', error);
      setReport('Could not generate handover report. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReport();
  }, []);

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-headline font-semibold text-primary">Shift Handover Report</h1>
        <p className="text-muted-foreground">Comprehensive summary of previous shift activities and critical issues.</p>
      </header>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Generated Handover Report</CardTitle>
            <CardDescription>AI-generated summary for the incoming shift supervisor.</CardDescription>
          </div>
          <Button variant="outline" size="sm" onClick={fetchReport} disabled={loading}>
            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Redo className="mr-2 h-4 w-4" />}
            Regenerate
          </Button>
        </CardHeader>
        <CardContent>
            {loading ? (
                <div className="flex justify-center items-center h-48">
                    <Loader2 className="size-8 animate-spin text-primary" />
                </div>
            ) : (
                <div className="prose prose-sm dark:prose-invert max-w-none bg-secondary/50 p-4 rounded-md">
                    <pre className="whitespace-pre-wrap font-sans text-sm">{report}</pre>
                </div>
            )}
        </CardContent>
        <Separator />
        <CardFooter className="p-6">
            <div className="w-full space-y-4">
                <h3 className="font-semibold">Supervisor Acknowledgement</h3>
                <Textarea placeholder="Add your comments or acknowledgement here..." />
                <Button>Acknowledge Handover</Button>
            </div>
        </CardFooter>
      </Card>
    </div>
  );
}
