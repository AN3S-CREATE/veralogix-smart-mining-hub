
'use client';

import { useFirestore, useDoc, useMemoFirebase } from '@/firebase';
import { useUser } from '@/firebase/auth/use-user';
import { doc, collection } from 'firebase/firestore';
import { Loader2 } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import Link from 'next/link';

function InfoField({ label, value }: { label: string; value?: string }) {
  return (
    <div>
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="font-medium">{value || 'N/A'}</p>
    </div>
  );
}

export default function MyProfilePage() {
  const { user, loading: userLoading, error: userError } = useUser();
  const firestore = useFirestore();

  const profileRef = useMemoFirebase(() => {
    if (!firestore || !user) return null;
    return doc(firestore, 'employeeProfiles', user.uid);
  }, [firestore, user]);

  const { data: profile, loading: profileLoading, error: profileError } = useDoc(profileRef);

  const isLoading = userLoading || profileLoading;
  const error = userError || profileError;

  if (isLoading) {
    return <div className="flex justify-center items-center h-64"><Loader2 className="size-8 animate-spin text-primary" /></div>;
  }

  if (error) {
    return <p className="text-destructive text-center">Error loading profile: {error.message}</p>;
  }

  if (!profile) {
    return <p className="text-muted-foreground text-center">No employee profile found for your account.</p>;
  }

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-headline font-semibold text-primary">My Profile</h1>
        <p className="text-muted-foreground">Your personal and work information.</p>
      </header>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <InfoField label="Name" value={`${profile.firstName} ${profile.lastName}`} />
            <InfoField label="Email" value={profile.contact?.email} />
            <InfoField label="Phone" value={profile.contact?.phone} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Work Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <InfoField label="Employee ID" value={profile.employeeId} />
            <InfoField label="Position" value={profile.position} />
            <InfoField label="Department" value={profile.department} />
            <InfoField label="Site" value={profile.site} />
          </CardContent>
        </Card>
      </div>

       <Card>
          <CardHeader>
            <CardTitle>My Compliance</CardTitle>
            <CardDescription>
                A summary of your compliance status. 
                <Link href="/people/me/compliance" className="text-primary hover:underline ml-2">View details</Link>
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Placeholder for compliance summary */}
            <p className="text-muted-foreground">Detailed compliance information is available on the 'My Compliance' page.</p>
          </CardContent>
        </Card>
    </div>
  );
}
