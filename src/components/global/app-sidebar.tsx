
'use client';

import Link from "next/link";
import Image from 'next/image';
import { usePathname } from "next/navigation";
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarSeparator,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Home, FileText, Settings, AlertTriangle, CheckSquare, Package } from "lucide-react";
import { serviceCatalog, type UserRole } from "@/lib/service-catalog";
import { ShiftHandoverAssistant } from "./shift-handover-assistant";
import { PlaceHolderImages } from "@/lib/placeholder-images";

// Mock role for demonstration. In a real app, this would come from an auth hook.
const MOCK_CURRENT_USER_ROLE: UserRole = "Admin";

export function AppSidebar() {
  const pathname = usePathname();

  const userVisibleServices = serviceCatalog.filter(service => 
    service.enabled && service.rolesAllowed.includes(MOCK_CURRENT_USER_ROLE)
  );

  // Use a Set to get unique services, as some might share a link/page
  const uniqueMenuLinks = Array.from(new Set(userVisibleServices.map(s => s.href)))
    .map(href => {
      // Find the first service that matches the href to get its details
      return userVisibleServices.find(s => s.href === href)!;
    });

  const operationalItems = [
    { href: "/alerts", label: "Alerts", icon: AlertTriangle },
    { href: "/tasks", label: "Tasks", icon: CheckSquare },
    { href: "/load-passports", label: "Load Passports", icon: Package },
  ];

  const generalMenuItems = [
    { href: "/reports", label: "Reports", icon: FileText },
    { href: "/sensors", label: "Sensor Stack", icon: Settings },
  ];

  const sidebarLogo = PlaceHolderImages.find(img => img.id === 'sidebar-logo');

  return (
    <Sidebar>
      <SidebarHeader className="p-4 flex justify-center items-center">
        <Link href="/hub">
            {sidebarLogo && (
                <Image 
                    src={sidebarLogo.imageUrl} 
                    alt={sidebarLogo.description} 
                    data-ai-hint={sidebarLogo.imageHint}
                    width={192} 
                    height={40} 
                    className="w-48"
                />
            )}
        </Link>
      </SidebarHeader>
      <SidebarSeparator />
      <SidebarContent className="pt-4">
        <SidebarMenu>
          <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={pathname === '/hub'}>
                <Link href="/hub">
                  <Home />
                  <span>Dashboard</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          
          <SidebarSeparator />

           <SidebarMenuItem>
            <p className="px-4 py-2 text-xs font-semibold text-muted-foreground">Operational Engine</p>
          </SidebarMenuItem>

          {operationalItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton asChild isActive={pathname.startsWith(item.href)}>
                <Link href={item.href}>
                  <item.icon />
                  <span>{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
          
          <SidebarSeparator />

          <SidebarMenuItem>
            <p className="px-4 py-2 text-xs font-semibold text-muted-foreground">Modules</p>
          </SidebarMenuItem>

          {uniqueMenuLinks.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton asChild isActive={pathname.startsWith(item.href)}>
                <Link href={item.href}>
                  <item.icon />
                  {/* Find a representative title if multiple services use the same link */}
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
          
          <SidebarSeparator />

           {generalMenuItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton asChild isActive={pathname.startsWith(item.href)}>
                <Link href={item.href}>
                  <item.icon />
                  <span>{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="p-2">
        <ShiftHandoverAssistant />
      </SidebarFooter>
    </Sidebar>
  );
}
