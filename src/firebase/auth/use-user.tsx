
'use client';

import { useState, useEffect } from 'react';
import type { User } from 'firebase/auth';
import type { UserRole } from '@/lib/service-catalog';

// Extend the Firebase User type to include our custom role
export type AppUser = Partial<User> & {
  role?: UserRole;
  uid: string;
};

// Mock user for prototype mode without login
const mockUser: AppUser = {
  uid: 'dev-user',
  email: 'dev@veralogix.com',
  displayName: 'Dev User',
  role: 'Viewer' // Default role
};


export function useUser() {
  const [user, setUser] = useState<AppUser | null>(mockUser);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // In this password-less prototype, we just use the mock user.
    // The role can be changed via the RoleSelector component.
    const role = (localStorage.getItem('userRole') as UserRole) || 'Viewer';
    setUser({ ...mockUser, role });
  }, []);

  return { user, loading, error };
}
