'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import {
  Home,
  User,
  Users,
  Briefcase,
  Truck,
  Mountain,
  Shield,
  ClipboardCheck,
  Camera,
  Layers,
  FileText,
  Network,
  Factory,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface MenuItem {
  href: string;
  label: string;
  icon: LucideIcon;
}

const adminMenuItems: MenuItem[] = [
  { href: "/hub", label: "Overview", icon: Home },
  { href: "/operator", label: "Operator", icon: User },
  { href: "/supervisor", label: "Supervisor", icon: Users },
  { href: "/executive", label: "Executive", icon: Briefcase },
  { href: "/fleet", label: "Fleet & Haulage", icon: Truck },
  { href: "/earthworks", label: "Earthworks", icon: Mountain },
  { href: "/safety", label: "Safety & CPS", icon: Shield },
  { href: "/compliance", label: "Compliance", icon: ClipboardCheck },
  { href: "/drones", label: "VTOL & Survey", icon: Camera },
  { href: "/plant", label: "Plant & Tailings", icon: Factory },
  { href: "/twin", label: "Digital Twin", icon: Layers },
  { href: "/reports", label: "Reports", icon: FileText },
  { href: "/sensors", label: "Sensor Stack", icon: Network },
];

export function AppSidebar() {
  const pathname = usePathname();
  const menuItems = adminMenuItems; // Reverted to show all items always

  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <Link href="/hub" className="flex justify-center w-48 mx-auto">
          <img src="/veralogix-logo.png" alt="Veralogix Logo" />
        </Link>
      </SidebarHeader>
      <SidebarSeparator />
      <SidebarContent className="pt-4">
        <SidebarMenu>
          {menuItems.map((item) => (
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
    </Sidebar>
  );
}
