
'use client';

import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { RoleProvider } from '@/contexts/role-provider';
import { FirebaseClientProvider } from '@/firebase';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet" />
        <title>Veralogix Smart Mining – Pilbara Mine</title>
        <meta name="description" content="VeraLogix Smart Mining - Smart Hub" />
      </head>
      <body className="font-body antialiased" suppressHydrationWarning>
        <FirebaseClientProvider>
          <RoleProvider>
            {children}
          </RoleProvider>
        </FirebaseClientProvider>
        <Toaster />
      </body>
    </html>
  );
}
