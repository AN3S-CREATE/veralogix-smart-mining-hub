import { useMemo, type DependencyList } from 'react';

// A simple utility hook to memoize Firebase queries and references.
// This is crucial to prevent infinite loops in `useCollection` and `useDoc`
// when queries are created dynamically.
export function useMemoFirebase<T>(
  factory: () => T,
  deps: DependencyList | undefined
): T {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useMemo(factory, deps);
}
