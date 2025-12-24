
'use client';

import { useState, useEffect } from 'react';
import { generateShiftHandoverReport } from '@/ai/flows/shift-handover-report';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Redo } from 'lucide-react';
import { Button } from '../ui/button';

const MOCK_PREVIOUS_SHIFT_DATA = `
- Alert: High-grade ore detected in Sector 7.
- Anomaly: Truck T-78 shows unusual engine temperature spikes.
- Event: Minor slippage reported on haul road B. Geotech notified.
- Alert: Fuel levels for Excavator E-12 are critically low.
- Maintenance: Dozer D-04 scheduled for track replacement.
`;

export function ShiftHandoverAssistant() {
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
    <Card className="bg-sidebar-accent border-sidebar-border shadow-none">
      <CardHeader className="flex-row items-center justify-between p-2">
        <CardTitle className="text-base font-semibold text-sidebar-accent-foreground">Shift Handover</CardTitle>
        <Button variant="ghost" size="icon" onClick={fetchReport} disabled={loading} className="size-7 text-sidebar-foreground hover:bg-sidebar-background/50 hover:text-sidebar-accent-foreground">
          {loading ? <Loader2 className="size-4 animate-spin" /> : <Redo className="size-4" />}
          <span className="sr-only">Refresh Report</span>
        </Button>
      </CardHeader>
      <CardContent className="p-2 text-sm text-sidebar-foreground">
        {loading ? (
          <div className="space-y-2">
            <div className="h-4 w-full animate-pulse rounded bg-sidebar-background/50" />
            <div className="h-4 w-5/6 animate-pulse rounded bg-sidebar-background/50" />
            <div className="h-4 w-full animate-pulse rounded bg-sidebar-background/50" />
          </div>
        ) : (
          <p className="whitespace-pre-wrap text-xs">{report}</p>
        )}
      </CardContent>
    </Card>
  );
}
