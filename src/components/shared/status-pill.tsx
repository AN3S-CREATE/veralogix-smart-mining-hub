
'use client';

import { cn } from "@/lib/utils";
import { CheckCircle2, AlertTriangle, XCircle, Info, ShieldAlert, ShieldCheck, ShieldX } from "lucide-react";

const statusIconMap = {
  OK: ShieldCheck,
  Warning: ShieldAlert,
  Critical: ShieldX,
  Info: Info,
  Low: ShieldCheck,
  Medium: ShieldAlert,
  High: ShieldX,
  Online: ShieldCheck,
  Degraded: ShieldAlert,
  Offline: ShieldX,
};

export type StatusPillStatus = keyof typeof statusIconMap;

export interface StatusPillProps extends React.HTMLAttributes<HTMLDivElement> {
  status: StatusPillStatus;
}

export function StatusPill({ className, status, ...props }: StatusPillProps) {
  const Icon = status ? statusIconMap[status] : Info;

  const statusStyles: Record<StatusPillStatus, string> = {
    // Standard
    OK: 'bg-[hsl(var(--chart-5))] text-green-300',
    Warning: 'bg-yellow-900/50 text-yellow-300',
    Critical: 'bg-destructive/80 text-destructive-foreground',
    Info: 'bg-secondary text-secondary-foreground',

    // SA KPIs
    Low: 'bg-[hsl(var(--chart-5))] text-green-300',
    Medium: 'bg-yellow-900/50 text-yellow-300',
    High: 'bg-destructive/80 text-destructive-foreground',

    // Connection
    Online: 'bg-[hsl(var(--chart-5))] text-green-300',
    Degraded: 'bg-yellow-900/50 text-yellow-300',
    Offline: 'bg-destructive/80 text-destructive-foreground',
  };

  const iconStyles: Record<StatusPillStatus, string> = {
    OK: 'text-green-400',
    Warning: 'text-yellow-400',
    Critical: 'text-white',
    Info: 'text-muted-foreground',
    Low: 'text-green-400',
    Medium: 'text-yellow-400',
    High: 'text-red-400',
    Online: 'text-green-400',
    Degraded: 'text-yellow-400',
    Offline: 'text-white',
  }

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold",
        status && statusStyles[status],
        className
      )}
      {...props}
    >
      <Icon className={cn("size-3.5", status && iconStyles[status])} />
      {status}
    </div>
  );
}
