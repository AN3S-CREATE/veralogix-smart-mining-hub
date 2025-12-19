
'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface ModulePageLayoutProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

export function ModulePageLayout({ title, description, children }: ModulePageLayoutProps) {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-headline font-semibold text-primary">{title}</h1>
        <p className="text-muted-foreground">{description}</p>
      </header>

      <div className="flex flex-wrap items-center gap-4">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-[240px] justify-start text-left font-normal",
                !Date.now() && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {format(new Date(), "PPP")}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar mode="single" initialFocus />
          </PopoverContent>
        </Popover>

        <Select defaultValue="all-sites">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Site" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all-sites">All Sites</SelectItem>
            <SelectItem value="pit-a">Pit A</SelectItem>
            <SelectItem value="pit-b">Pit B</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {children}
    </div>
  );
}
