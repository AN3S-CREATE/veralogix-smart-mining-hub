'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type UserRole = 'Admin' | 'Ops' | 'Safety' | 'HR' | 'Viewer';

interface RoleContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
}

const RoleContext = createContext<RoleContextType | undefined>(undefined);

export function RoleProvider({ children }: { children: ReactNode }) {
  const [role, setRoleState] = useState<UserRole>('Viewer');

  useEffect(() => {
    // On initial load, try to get the role from localStorage
    const storedRole = localStorage.getItem('userRole') as UserRole;
    if (storedRole) {
      setRoleState(storedRole);
    }
  }, []);

  const setRole = (newRole: UserRole) => {
    localStorage.setItem('userRole', newRole);
    setRoleState(newRole);
  };

  return (
    <RoleContext.Provider value={{ role, setRole }}>
      {children}
    </RoleContext.Provider>
  );
}

export function useRole() {
  const context = useContext(RoleContext);
  if (context === undefined) {
    throw new Error('useRole must be used within a RoleProvider');
  }
  return context;
}
