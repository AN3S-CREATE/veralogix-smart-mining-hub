'use client';

import { useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, query, where, orderBy } from 'firebase/firestore';
import { Loader2, HardDrive, FileText, Calendar, Tag } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { format } from 'date-fns';

interface EvidenceViewerProps {
  linkedType: string;
  linkedId: string;
}

export function EvidenceViewer({ linkedType, linkedId }: EvidenceViewerProps) {
  const firestore = useFirestore();

  const evidenceQuery = useMemoFirebase(() => {
    if (!firestore || !linkedId) return null;
    return query(
      collection(firestore, 'evidenceFiles'),
      where('linkedType', '==', linkedType),
      where('linkedId', '==', linkedId),
      orderBy('capturedAt', 'desc')
    );
  }, [firestore, linkedType, linkedId]);

  const { data: evidence, loading, error } = useCollection(evidenceQuery);

  return (
    <Card className="bg-secondary mt-4">
        <CardHeader className="pb-2">
            <CardTitle className="text-base">Attached Evidence</CardTitle>
            <CardDescription className="text-xs">
                Files linked to {linkedType}: {linkedId}
            </CardDescription>
        </CardHeader>
        <CardContent>
            {loading && <div className="flex justify-center items-center p-4"><Loader2 className="size-6 animate-spin text-primary" /></div>}
            {error && <p className="text-destructive text-sm text-center p-4">Error loading evidence.</p>}
            {!loading && !error && (
                evidence?.length === 0 ? (
                    <p className="text-sm text-muted-foreground text-center p-4">No evidence attached yet.</p>
                ) : (
                    <ul className="space-y-3">
                        {evidence?.map(item => (
                            <li key={item.id} className="text-sm border-b border-border pb-2 last:border-b-0 last:pb-0">
                                <div className="font-medium flex items-center gap-2">
                                    <FileText className="size-4 text-primary" />
                                    <a href="#" className="hover:underline" title={item.storagePath}>{item.fileName}</a>
                                </div>
                                <div className="text-xs text-muted-foreground grid grid-cols-2 gap-x-4 mt-1">
                                    <div className="flex items-center gap-1.5">
                                        <HardDrive className="size-3" />
                                        <span>{(item.fileSize / 1024).toFixed(2)} KB</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <Calendar className="size-3" />
                                        <span>{item.capturedAt ? format(item.capturedAt.toDate(), 'PPP p') : 'No date'}</span>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                )
            )}
        </CardContent>
    </Card>
  );
}
