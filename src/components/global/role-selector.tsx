'use client';

import { useRole, type UserRole } from '@/contexts/role-provider';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { User, Shield, Briefcase, UserCog, Eye } from 'lucide-react';

const roles: { id: UserRole; icon: React.ElementType }[] = [
  { id: 'Admin', icon: UserCog },
  { id: 'Ops', icon: Shield },
  { id: 'Safety', icon: User },
  { id: 'HR', icon: Briefcase },
  { id: 'Viewer', icon: Eye },
];

export function RoleSelector() {
  const { role, setRole } = useRole();

  return (
    <Select value={role} onValueChange={(value) => setRole(value as UserRole)}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select Role" />
      </SelectTrigger>
      <SelectContent>
        {roles.map((r) => (
          <SelectItem key={r.id} value={r.id}>
            <div className="flex items-center gap-2">
              <r.icon className="size-4" />
              <span>{r.id}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
