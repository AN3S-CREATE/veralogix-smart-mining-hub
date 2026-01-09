
'use client';

import { useFirestore, useCollection, useDoc, useMemoFirebase } from '@/firebase';
import { useUser } from '@/firebase/auth/use-user';
import { collection, query, where, doc, setDoc } from 'firebase/firestore';
import { Loader2, Download } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from '@/components/ui/card';
import { ModuleDataTable } from '@/components/shared/module-data-table';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';

export default function MyPayslipsPage() {
  const { user, loading: userLoading } = useUser();
  const firestore = useFirestore();

  // Fetch payslips for the current user
  const payslipsQuery = useMemoFirebase(() => {
    if (!firestore || !user) return null;
    return query(collection(firestore, 'payslips'), where('uid', '==', user.uid));
  }, [firestore, user]);

  const { data: payslips, loading: payslipsLoading, error: payslipsError } = useCollection(payslipsQuery);
  
  // Fetch paperless consent for the current user
  const consentRef = useMemoFirebase(() => {
    if (!firestore || !user) return null;
    return doc(firestore, 'paperlessConsents', user.uid);
  }, [firestore, user]);
  
  const { data: consent, loading: consentLoading, error: consentError } = useDoc(consentRef);

  const isLoading = userLoading || payslipsLoading || consentLoading;
  const error = payslipsError || consentError;

  const handleConsentChange = async (consentGiven: boolean) => {
    if (!consentRef) return;
    try {
      await setDoc(consentRef, {
        uid: user?.uid,
        tenantId: 'veralogix-pilbara', // Mock tenantId
        consentGiven,
        consentAt: new Date().toISOString()
      }, { merge: true });
      toast({
        title: 'Preference Updated',
        description: `You have ${consentGiven ? 'opted-in to' : 'opted-out of'} paperless documents.`,
      });
    } catch (e) {
      console.error("Failed to update consent:", e);
      toast({
        title: 'Update Failed',
        description: 'Could not save your preference. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const columns = [
    { accessorKey: 'payPeriod', header: 'Pay Period' },
    { accessorKey: 'issuedAt', header: 'Date Issued' },
    { accessorKey: 'status', header: 'Status' },
    { 
      id: 'actions',
      header: 'Actions',
      cell: ({ row }: { row: { original: any } }) => (
        <Button variant="ghost" size="icon" disabled>
          <Download className="h-4 w-4" />
          <span className="sr-only">Download</span>
        </Button>
      ),
    },
  ];

  return (
    <div className="space-y-6">
       <header>
        <h1 className="text-3xl font-headline font-semibold text-primary">My Payslips</h1>
        <p className="text-muted-foreground">Access your pay history and manage your delivery preferences.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        <div className="lg:col-span-2">
            <ModuleDataTable
                title="Payslip History"
                description="Your recent payslips."
                columns={columns}
                data={payslips ?? []}
                loading={isLoading}
                error={error}
            />
        </div>
        <Card className="card-hover">
            <CardHeader>
                <CardTitle>Paperless Consent</CardTitle>
                <CardDescription>Opt-in to receive payslips and other documents electronically.</CardDescription>
            </CardHeader>
            <CardContent>
                 {consentLoading ? (
                    <div className="flex justify-center items-center h-10">
                        <Loader2 className="size-6 animate-spin text-primary" />
                    </div>
                 ) : (
                    <div className="flex items-center space-x-2">
                        <Switch
                            id="paperless-mode"
                            checked={consent?.consentGiven || false}
                            onCheckedChange={handleConsentChange}
                        />
                        <Label htmlFor="paperless-mode">I agree to receive documents electronically</Label>
                    </div>
                 )}
            </CardContent>
            <CardFooter>
                <p className="text-xs text-muted-foreground">You can change this setting at any time.</p>
            </CardFooter>
        </Card>
      </div>

    </div>
  );
}
