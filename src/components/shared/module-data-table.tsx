'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Loader2 } from 'lucide-react';
import { format } from 'date-fns';

interface ModuleDataTableProps {
  title: string;
  description: string;
  columns: { accessorKey: string; header: string }[];
  data: any[];
  loading?: boolean;
  error?: Error | null;
}

function formatValue(key: string, value: any): string {
    if (key === 'timestamp' || key === 'predictionDate') {
      try {
        return format(new Date(value), 'PPP p');
      } catch {
        return String(value);
      }
    }
    if (typeof value === 'number') {
        return value.toLocaleString();
    }
    return String(value);
}

export function ModuleDataTable({ title, description, columns, data, loading, error }: ModuleDataTableProps) {
  return (
    <Card className="card-hover">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        {loading && (
          <div className="flex justify-center items-center h-40">
            <Loader2 className="size-8 animate-spin text-primary" />
          </div>
        )}
        {error && <p className="text-destructive text-center">Error: {error.message}</p>}
        {!loading && !error && data.length === 0 && (
          <div className="text-center text-muted-foreground h-40 flex items-center justify-center">
            <p>No data available yet.</p>
          </div>
        )}
        {!loading && !error && data.length > 0 && (
          <Table>
            <TableHeader>
              <TableRow>
                {columns.map((col) => <TableHead key={col.accessorKey}>{col.header}</TableHead>)}
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((row) => (
                <TableRow key={row.id}>
                  {columns.map((col) => (
                    <TableCell key={col.accessorKey}>
                      {formatValue(col.accessorKey, row[col.accessorKey])}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
