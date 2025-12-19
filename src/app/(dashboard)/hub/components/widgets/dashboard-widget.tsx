'use client';

import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { Button } from '@/components/ui/button';
import React from 'react';

interface DashboardWidgetProps {
  title: string;
  description: string;
  link: string;
  children: React.ReactNode;
}

export function DashboardWidget({ title, description, link, children }: DashboardWidgetProps) {
  return (
    <Card className="card-hover flex flex-col">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium text-muted-foreground">{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col justify-between">
        {children}
      </CardContent>
       <div className="p-4 pt-0">
        <Button asChild variant="link" className="p-0 h-auto text-xs text-primary">
          <Link href={link}>
            Go to {title}
            <ArrowRight className="ml-1 size-3" />
          </Link>
        </Button>
      </div>
    </Card>
  );
}
