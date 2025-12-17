'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import NProgress from 'nprogress';

export function PageLoader() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    NProgress.configure({ showSpinner: false });

    const handleStop = () => {
      NProgress.done();
    };

    handleStop(); // Stop progress on initial load and after a route change

    // This effect should only run once to set up the configuration.
    // The dependency on pathname and searchParams handles stopping the progress bar.
  }, [pathname, searchParams]);


  useEffect(() => {
    // This effect handles starting the progress bar on link clicks.
    // It is separate to avoid re-running NProgress.configure on every route change.
    
    const handleStart = (url:string) => {
      if (url !== window.location.pathname) {
        NProgress.start();
      }
    };
    
    // We need to find all links and add event listeners.
    // This is a bit of a workaround for Next.js App Router, but it's reliable.
    const handleLinkClick = (event: MouseEvent) => {
        try {
            const target = event.target as HTMLElement;
            const anchor = target.closest('a');
            if (anchor) {
                handleStart(anchor.pathname);
            }
        } catch (err) {
            NProgress.start();
        }
    };

    document.addEventListener('click', handleLinkClick);

    return () => {
      document.removeEventListener('click', handleLinkClick);
      NProgress.done(); // Ensure progress is stopped on unmount
    };
  }, []);

  return null;
}
