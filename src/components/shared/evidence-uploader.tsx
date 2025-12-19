'use client';

import { useState } from 'react';
import { useFirestore } from '@/firebase';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { Button, type ButtonProps } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { UploadCloud, Loader2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '../ui/label';

interface EvidenceUploaderProps {
  linkedType: string;
  linkedId: string;
  variant?: 'button' | 'link' | 'icon';
}

// In a real app, tenantId would come from the user's session or a global state.
const MOCK_TENANT_ID = "veralogix-pilbara";

export function EvidenceUploader({ linkedType, linkedId, variant = 'button' }: EvidenceUploaderProps) {
  const firestore = useFirestore();
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file || !firestore) {
      toast({
        variant: 'destructive',
        title: 'Upload Failed',
        description: 'Please select a file to upload.',
      });
      return;
    }

    setIsUploading(true);

    try {
      // Step 1: In a real app, upload the file to Firebase Storage here.
      // const storageRef = ref(storage, `evidence/${linkedType}/${linkedId}/${file.name}`);
      // await uploadBytes(storageRef, file);
      // const downloadURL = await getDownloadURL(storageRef);
      
      // MOCK: Simulate upload and get a placeholder path
      await new Promise(resolve => setTimeout(resolve, 1500));
      const mockStoragePath = `evidence/${linkedType}/${linkedId}/${file.name}`;

      // Step 2: Create a document in Firestore linking to the stored file.
      await addDoc(collection(firestore, 'evidenceFiles'), {
        tenantId: MOCK_TENANT_ID,
        linkedType,
        linkedId,
        storagePath: mockStoragePath,
        fileName: file.name,
        fileType: file.type,
        fileSize: file.size,
        capturedAt: serverTimestamp(),
        tags: [linkedType],
      });

      toast({
        title: 'Upload Successful',
        description: `Evidence "${file.name}" has been attached.`,
      });
      setIsDialogOpen(false);
      setFile(null);
    } catch (error) {
      console.error('Evidence upload failed:', error);
      toast({
        variant: 'destructive',
        title: 'Upload Failed',
        description: 'An error occurred while uploading the evidence.',
      });
    } finally {
      setIsUploading(false);
    }
  };

  const triggerContent = {
    button: { text: 'Upload Evidence', props: {} },
    link: { text: 'Attach File', props: { variant: 'link', className: 'text-xs p-0 h-auto' } },
    icon: { text: <UploadCloud />, props: { variant: 'ghost', size: 'icon' } },
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button {...triggerContent[variant].props as ButtonProps}>
          {triggerContent[variant].text}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Attach Evidence</DialogTitle>
          <DialogDescription>
            Upload a file (e.g., photo, document) to link it to this item.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
            <div className="space-y-2">
                <Label htmlFor="file-upload">File</Label>
                <Input id="file-upload" type="file" onChange={handleFileChange} />
            </div>
            {file && (
                <div className="text-sm text-muted-foreground">
                    Selected: <strong>{file.name}</strong> ({(file.size / 1024).toFixed(2)} KB)
                </div>
            )}
        </div>
        <DialogFooter>
          <Button type="button" onClick={handleUpload} disabled={isUploading || !file}>
            {isUploading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Uploading...
              </>
            ) : (
              'Upload and Attach'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
