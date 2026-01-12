
'use client';

import { Header } from "@/components/global/header";
import { PageLoader } from "@/components/global/page-loader";
import { Sidebar, SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/global/app-sidebar";
import { FirebaseClientProvider } from "@/firebase/client-provider";
import { useUser } from "@/firebase/auth/use-user";
import { Loader2 } from "lucide-react";
import { usePathname } from "next/navigation";
import { OfflineBanner } from "@/components/shared/offline-banner";
import { RoleProvider } from "@/contexts/role-provider";

function DashboardLayoutContent({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user, loading, error } = useUser();
  const pathname = usePathname();

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader2 className="size-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    // Handle auth errors, maybe redirect to an error page
    return (
      <div className="flex h-screen w-full items-center justify-center text-destructive">
        Error loading user: {error.message}
      </div>
    );
  }

  if (!user && pathname !== '/login') {
    // This logic might need adjustment depending on public/private routes
    // For now, it's a simple check.
    // In a real app, you'd use Next.js middleware or a more robust check.
    if (typeof window !== 'undefined') {
      window.location.href = '/login';
    }
    return null; // Return null while redirecting
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Header />
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
            <OfflineBanner />
            {children}
        </main>
      </SidebarInset>
      <PageLoader />
    </SidebarProvider>
  );
}


export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <FirebaseClientProvider>
      <RoleProvider>
        <DashboardLayoutContent>{children}</DashboardLayoutContent>
      </RoleProvider>
    </FirebaseClientProvider>
  );
}
