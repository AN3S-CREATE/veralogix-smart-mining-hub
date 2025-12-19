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
  BarChart3,
  GitCommit,
  Wind,
  Cog,
  ShieldAlert,
  ScanLine,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface MenuItem {
  href: string;
  label: string;
  icon: LucideIcon;
}

const adminMenuItems: MenuItem[] = [
  { href: "/hub", label: "Dashboard", icon: Home },
  { href: "/smarthub", label: "Smart Hub", icon: ShieldCheck },
  { href: "/executive", label: "Smart Management", icon: BarChart3 },
  { href: "/supervisor", label: "Smart Control", icon: Cog },
  { href: "/operator", label: "Smart People", icon: Users },
  { href: "/safety", label: "Smart Risk", icon: ShieldAlert },
  { href: "/fleet", label: "Smart Transport", icon: Truck },
  { href: "/plant", label: "Smart Operations", icon: Factory },
  { href: "/earthworks", label: "Smart Geotech", icon: GitCommit },
  { href: "/drones", label: "Smart Survey", icon: Wind },
  { href: "/network", label: "Smart Network", icon: Network },
  { href: "/twin", label: "Smart Scenarios", icon: Layers },
  { href: "/sensors", label: "Sensor Stack", icon: Network },
  { href: "/reports", label: "Reports", icon: FileText },
];

export function AppSidebar() {
  const pathname = usePathname();
  const menuItems = adminMenuItems; 

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
