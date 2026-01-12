
'use client';

import { useState, useEffect } from 'react';
import { SiteSelector } from "./site-selector";
import { ShiftSelector } from "./shift-selector";
import { AlertsBell } from "./alerts-bell";
import { UserProfile } from "./user-profile";
import { Separator } from "@/components/ui/separator";
import { QuickFilterChips } from "./quick-filter-chips";
import { NaturalLanguageQuery } from "./natural-language-query";
import { SidebarTrigger } from "../ui/sidebar";
import { RoleSelector } from './role-selector';
import { useRole } from '@/contexts/role-provider';
import { Badge } from '../ui/badge';

export function Header() {
  const [lastUpdated, setLastUpdated] = useState('');
  const { role } = useRole();

  useEffect(() => {
    // This code now runs only on the client, after hydration, to prevent mismatch
    const updateTime = () => {
      setLastUpdated(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    };
    
    updateTime(); // Set initial time
    const intervalId = setInterval(updateTime, 60000); // Update every minute

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, []);

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background/95 px-4 backdrop-blur-sm sm:h-20 sm:px-6">
       <SidebarTrigger className="md:hidden"/>
      <div className="hidden items-center gap-4 md:flex">
        <SiteSelector />
        <ShiftSelector />
      </div>

      <div className="flex-1 flex justify-center px-4">
        <NaturalLanguageQuery />
      </div>
      
       <div className="hidden lg:flex px-4 items-center gap-4">
        <RoleSelector />
        <Badge variant="outline" className="border-accent text-accent">
            Tenant: Veralogix | Role: {role}
        </Badge>
      </div>


      <div className="flex items-center gap-3">
        <div className="hidden sm:block text-sm text-muted-foreground">
          {lastUpdated ? `Last Updated: ${lastUpdated}` : ''}
        </div>
        <Separator orientation="vertical" className="h-8" />
        <AlertsBell />
        <UserProfile />
      </div>
    </header>
  );
}
