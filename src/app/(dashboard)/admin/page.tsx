
'use client';

import { ModulePageLayout } from "@/components/shared/module-page-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Settings, Smartphone, Key, Building } from "lucide-react";
import Link from "next/link";

export default function AdminConsolePage() {
  const adminModules = [
    { title: "User Management", description: "Manage users, roles, and site access.", icon: Users, href: "/admin/users" },
    { title: "Device Registry", description: "Configure IoT devices and sensors.", icon: Smartphone, href: "/admin/devices" },
    { title: "Tenants & Sites", description: "Manage organizational structure.", icon: Building, href: "/admin/settings" }, // Placeholder link
    { title: "API Keys", description: "Manage external integration keys.", icon: Key, href: "/admin/settings" },
    { title: "System Settings", description: "Feature flags and global configs.", icon: Settings, href: "/admin/settings" },
  ];

  return (
    <ModulePageLayout 
        title="Admin Console" 
        description="Platform configuration and master data management."
    >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {adminModules.map((mod) => (
                <Link key={mod.title} href={mod.href}>
                    <Card className="card-hover h-full cursor-pointer">
                        <CardHeader>
                            <div className="flex items-center gap-2 mb-2">
                                <mod.icon className="size-5 text-primary" />
                                <CardTitle className="text-lg">{mod.title}</CardTitle>
                            </div>
                            <CardDescription>{mod.description}</CardDescription>
                        </CardHeader>
                    </Card>
                </Link>
            ))}
        </div>
    </ModulePageLayout>
  );
}
