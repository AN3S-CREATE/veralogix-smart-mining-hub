
'use client';

import { Header } from "@/components/global/header";
import { PageLoader } from "@/components/global/page-loader";
import { Sidebar, SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/global/app-sidebar";
import { OfflineBanner } from "@/components/shared/offline-banner";
import { useRole } from "@/contexts/role-provider";
import { useRouter } from "next/navigation";
import { useEffect } from "react";


function DashboardLayoutContent({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { role } = useRole();
  const router = useRouter();

  useEffect(() => {
    // This logic must run in useEffect to avoid hydration errors.
    // It depends on the 'role', which is determined from localStorage.
    if (role === 'Operator') {
      router.push('/operator');
    }
  }, [role, router]);
  
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
      <DashboardLayoutContent>{children}</DashboardLayoutContent>
  );
}
