
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
import { Home, FileText, Settings, AlertTriangle, CheckSquare, Package, UserCog, Users } from "lucide-react";
import { serviceCatalog, type UserRole } from "@/lib/service-catalog";
import { ShiftHandoverAssistant } from "./shift-handover-assistant";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { useUser } from "@/firebase/auth/use-user";

export function AppSidebar() {
  const pathname = usePathname();
  const { user } = useUser();
  
  // Map the Firebase/Auth role to our UserRole type
  // Default to Operator if no specific role claim is found (fallback)
  const currentUserRole: UserRole = (user?.role as UserRole) || "Operator";

  const userVisibleServices = serviceCatalog.filter(service => 
    service.enabled && service.rolesAllowed.includes(currentUserRole)
  );

  const uniqueMenuLinks = Array.from(new Set(userVisibleServices.map(s => s.href)))
    .map(href => {
      return userVisibleServices.find(s => s.href === href)!;
    });

  const operationalItems = [
    { href: "/alerts", label: "Alerts", icon: AlertTriangle },
    { href: "/tasks", label: "Tasks", icon: CheckSquare },
    { href: "/load-passports", label: "Load Passports", icon: Package },
  ];

  const adminItems = [
      { href: "/people/users", label: "User Management", icon: UserCog },
      { href: "/people/roles", label: "Role Management", icon: UserCog },
      { href: "/people/permissions", label: "Permissions", icon: UserCog },
  ]

  const generalMenuItems = [
    { href: "/reports", label: "Reports", icon: FileText },
    { href: "/sensors", label: "Sensor Stack", icon: Settings },
  ];
  
  const peopleMenuItems = [
    { href: "/people/overview", label: "People Overview", icon: Users },
    { href: "/people/me", label: "My Profile", icon: UserCog },
    { href: "/people/me/payslips", label: "My Payslips", icon: FileText },
  ];

  const sidebarLogo = PlaceHolderImages.find(img => img.id === 'sidebar-logo');

  return (
    <Sidebar>
      <SidebarHeader className="p-4 flex justify-center items-center">
        <Link href="/dashboard">
            {sidebarLogo && (
                <Image 
                    src={sidebarLogo.imageUrl} 
                    alt={sidebarLogo.description} 
                    data-ai-hint={sidebarLogo.imageHint}
                    width={sidebarLogo.width} 
                    height={sidebarLogo.height} 
                    className="w-48"
                />
            )}
        </Link>
      </SidebarHeader>
      <SidebarSeparator />
      <SidebarContent className="pt-4">
        <SidebarMenu>
          <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={pathname === '/dashboard'}>
                <Link href="/dashboard">
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
            item.id !== 'smart-people' && ( // Exclude the generic Smart People link
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton asChild isActive={pathname.startsWith(item.href)}>
                  <Link href={item.href}>
                    <item.icon />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )
          ))}
          
          <SidebarSeparator />
          <SidebarMenuItem>
            <p className="px-4 py-2 text-xs font-semibold text-muted-foreground">People</p>
          </SidebarMenuItem>
          {peopleMenuItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton asChild isActive={pathname === item.href}>
                <Link href={item.href}>
                  <item.icon />
                  <span>{item.label}</span>
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
            
          {currentUserRole === 'Admin' && (
            <>
                <SidebarSeparator />
                <SidebarMenuItem>
                    <p className="px-4 py-2 text-xs font-semibold text-muted-foreground">Admin</p>
                </SidebarMenuItem>
                {adminItems.map((item) => (
                    <SidebarMenuItem key={item.href}>
                        <SidebarMenuButton asChild isActive={pathname.startsWith(item.href)}>
                            <Link href={item.href}>
                            <item.icon />
                            <span>{item.label}</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                ))}
            </>
          )}


        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="p-2">
        <ShiftHandoverAssistant />
      </SidebarFooter>
    </Sidebar>
  );
}
