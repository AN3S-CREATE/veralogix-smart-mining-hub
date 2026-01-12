
'use client';

import { useState, useEffect } from 'react';
import { onAuthStateChanged, type User } from 'firebase/auth';
import { useAuth } from '@/firebase/provider';
import type { UserRole } from '@/lib/service-catalog';

// Extend the Firebase User type to include our custom role
export type AppUser = User & {
  role?: UserRole;
};

export function useUser() {
  const auth = useAuth();
  const [user, setUser] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!auth) {
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(
      auth,
      (firebaseUser) => {
        if (firebaseUser) {
          // For the prototype, we get the role from localStorage.
          // In a real app, this would come from a custom token claim.
          const role = (localStorage.getItem('userRole') as UserRole) || 'Viewer';
          setUser({ ...firebaseUser, role });
        } else {
          setUser(null);
        }
        setLoading(false);
      },
      (error) => {
        setError(error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [auth]);

  return { user, loading, error };
}
