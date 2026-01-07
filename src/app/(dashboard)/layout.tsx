
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/global/app-sidebar";
import { Header } from "@/components/global/header";
import { OfflineBanner } from "@/components/shared/offline-banner";
import { PageLoader } from "@/components/global/page-loader";
import { Suspense } from "react";
import { FirebaseClientProvider } from "@/firebase";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <FirebaseClientProvider>
      <SidebarProvider>
        <PageLoader />
        <AppSidebar />
        <SidebarInset>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1 p-4 sm:p-6 overflow-auto">
              <OfflineBanner />
              {children}
            </main>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </FirebaseClientProvider>
  );
}
