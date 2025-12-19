
'use client';

import { useParams } from 'next/navigation';
import { useFirestore, useDoc, useCollection, useMemoFirebase } from '@/firebase';
import { doc, collection, query, orderBy } from 'firebase/firestore';
import { Loader2, AlertCircle, CheckCircle, Truck, MapPin, Package, FileText, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { StatusPill, type StatusPillStatus } from '@/components/shared/status-pill';
import { EvidenceUploader } from '@/components/shared/evidence-uploader';
import { EvidenceViewer } from '@/components/shared/evidence-viewer';
import { format } from 'date-fns';

const eventIcons = {
    dispatch: Truck,
    loadscan: Package,
    weighbridge: Package,
    route_update: MapPin,
    exception: AlertCircle,
    delivery: CheckCircle,
};

export default function LoadPassportDetailPage() {
  const { passportId } = useParams();
  const firestore = useFirestore();

  const passportRef = useMemoFirebase(() => {
    if (!firestore || !passportId) return null;
    return doc(firestore, 'loadPassports', passportId as string);
  }, [firestore, passportId]);

  const { data: passport, loading: passportLoading, error: passportError } = useDoc(passportRef);

  const eventsQuery = useMemoFirebase(() => {
    if (!passportRef) return null;
    return query(collection(passportRef, 'loadEvents'), orderBy('timestamp', 'asc'));
  }, [passportRef]);

  const { data: events, loading: eventsLoading, error: eventsError } = useCollection(eventsQuery);

  const isLoading = passportLoading || eventsLoading;
  const error = passportError || eventsError;

  if (isLoading) {
    return <div className="flex justify-center items-center h-64"><Loader2 className="size-8 animate-spin text-primary" /></div>;
  }

  if (error) {
    return <p className="text-destructive text-center">Error loading load passport: {error.message}</p>;
  }

  if (!passport) {
    return <p className="text-muted-foreground text-center">Load passport not found.</p>;
  }

  const getStatusPill = (status: string): StatusPillStatus => {
      switch (status) {
          case 'Completed': return 'OK';
          case 'Exception': return 'Critical';
          default: return 'Info';
      }
  }

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-headline font-semibold text-primary">Load Passport: {passport.passportId}</h1>
        <p className="text-muted-foreground">Detailed event timeline for vehicle <span className="font-bold">{passport.vehicleId}</span>.</p>
      </header>

      <Card>
        <CardHeader>
            <CardTitle>Summary</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
                <p className="text-muted-foreground">Status</p>
                <StatusPill status={getStatusPill(passport.status)} />
            </div>
            <div>
                <p className="text-muted-foreground">Vehicle ID</p>
                <p className="font-medium">{passport.vehicleId}</p>
            </div>
             <div>
                <p className="text-muted-foreground">Material</p>
                <p className="font-medium">{passport.materialType}</p>
            </div>
             <div>
                <p className="text-muted-foreground">Route</p>
                <p className="font-medium">{passport.origin} to {passport.destination}</p>
            </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        <div className="lg:col-span-2">
            <Card>
                <CardHeader>
                    <CardTitle>Event Timeline</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="relative pl-6">
                        <div className="absolute left-[1.6rem] top-0 h-full w-0.5 bg-border -translate-x-1/2" />
                        <ul className="space-y-8">
                            {events?.map(event => {
                                const Icon = eventIcons[event.eventType as keyof typeof eventIcons] || FileText;
                                return (
                                <li key={event.id} className="flex items-start gap-4">
                                    <div className="absolute left-[1.6rem] top-1 z-10 flex size-8 -translate-x-1/2 items-center justify-center rounded-full bg-primary text-primary-foreground">
                                        <Icon className="size-4" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-semibold">{event.summary}</p>
                                        <p className="text-xs text-muted-foreground">
                                            {format(event.timestamp.toDate(), 'PPP p')} &bull; {event.location}
                                        </p>
                                        {event.eventType === 'exception' && (
                                            <p className="text-sm text-destructive mt-1">
                                                Details: Expected {event.details.expected}t, Actual {event.details.actual}t
                                            </p>
                                        )}
                                    </div>
                                </li>
                                )
                            })}
                        </ul>
                    </div>
                </CardContent>
            </Card>
        </div>
        <div className="space-y-6">
            <Card>
                <CardHeader className="flex-row items-center justify-between">
                    <CardTitle>Evidence</CardTitle>
                    <EvidenceUploader linkedType="load-passport" linkedId={passportId as string} variant="button" />
                </CardHeader>
                <CardContent>
                    <EvidenceViewer linkedType="load-passport" linkedId={passportId as string} />
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
