
'use client';

import { useMemo } from 'react';
import { useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, query, where } from 'firebase/firestore';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, UserCheck, Stethoscope, Loader2 } from "lucide-react";
import { formatISO, addDays } from 'date-fns';

export function AuditReadinessCard() {
    const firestore = useFirestore();
    const thirtyDaysFromNow = useMemo(() => formatISO(addDays(new Date(), 30)), []);

    const expiringItemsQuery = useMemoFirebase(() => {
        if (!firestore) return null;
        // This query fetches items that are marked as expiring.
        // A more robust solution might use a date range query if rules allow.
        return query(
            collection(firestore, 'complianceItems'),
            where('status', '==', 'Expiring Soon')
        );
    }, [firestore]);

    const { data: expiringItems, loading, error } = useCollection(expiringItemsQuery);

    const auditStats = useMemo(() => {
        if (!expiringItems) {
            return {
                licenses: { count: 0, details: '...' },
                medicals: { count: 0, details: '...' },
                training: { count: 0, details: '...' },
            };
        }

        const licenses = expiringItems.filter(item => item.type === 'License');
        const medicals = expiringItems.filter(item => item.type === 'Medical');
        const training = expiringItems.filter(item => item.type === 'Training');

        return {
            licenses: {
                count: licenses.length,
                details: licenses.length > 0 ? `Focus on ${licenses[0].subject}` : 'All licenses compliant.',
            },
            medicals: {
                count: medicals.length,
                details: medicals.length > 0 ? `Mainly for ${medicals[0].subject}` : 'All medicals compliant.',
            },
            training: {
                count: training.length,
                details: 'New intake requires induction', // This is a mock detail as it's not in the data
            },
        };
    }, [expiringItems]);
    
    const auditItems = [
        {
            title: "Licenses Expiring (next 30d)",
            count: auditStats.licenses.count,
            details: auditStats.licenses.details,
            icon: FileText,
        },
        {
            title: "Medicals Expiring (next 30d)",
            count: auditStats.medicals.count,
            details: auditStats.medicals.details,
            icon: Stethoscope,
        },
        {
            title: "Training Hotspots (Induction)",
            count: 2, // Mock data as it is not in firestore
            details: "New MACMAHON intake requires site induction",
            icon: UserCheck,
        }
    ];


    return (
        <Card className="card-hover">
            <CardHeader className="flex-row items-center justify-between">
                <div>
                    <CardTitle>DMRE Audit Readiness</CardTitle>
                    <CardDescription>Expirations and hotspots requiring attention.</CardDescription>
                </div>
                 <Button disabled>Export Audit Summary</Button>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {loading ? (
                    <div className="md:col-span-3 flex justify-center items-center h-24">
                        <Loader2 className="size-8 animate-spin text-primary" />
                    </div>
                ) : error ? (
                    <p className="text-destructive md:col-span-3">Error loading audit data.</p>
                ) : (
                    auditItems.map((item, index) => (
                        <div key={index} className="p-4 bg-secondary rounded-lg flex gap-4 items-start">
                            <item.icon className="size-8 text-primary mt-1" />
                            <div>
                                <p className="text-2xl font-bold font-headline">{item.count}</p>
                                <p className="font-medium leading-tight">{item.title}</p>
                                <p className="text-xs text-muted-foreground mt-1">{item.details}</p>
                            </div>
                        </div>
                    ))
                )}
            </CardContent>
        </Card>
    );
}
