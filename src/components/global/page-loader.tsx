'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import NProgress from 'nprogress';

export function PageLoader() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    NProgress.done();
  }, [pathname, searchParams]);

  useEffect(() => {
    NProgress.configure({ showSpinner: false });

    const handleAnchorClick = (event: MouseEvent) => {
      const targetUrl = (event.currentTarget as HTMLAnchorElement).href;
      const currentUrl = window.location.href;
      if (targetUrl !== currentUrl) {
        NProgress.start();
      }
    };

    const handleMutation: MutationCallback = () => {
      const anchorElements = document.querySelectorAll('a[href]');
      anchorElements.forEach((anchor) => {
        const hasClickListener = (anchor as any)._hasClickListener;
        if (!hasClickListener) {
          anchor.addEventListener('click', handleAnchorClick);
          (anchor as any)._hasClickListener = true;
        }
      });
    };

    const mutationObserver = new MutationObserver(handleMutation);
    mutationObserver.observe(document, { childList: true, subtree: true });

    // Initial run
    handleMutation([]);

    return () => {
      mutationObserver.disconnect();
      // Clean up event listeners
      const anchorElements = document.querySelectorAll('a[href]');
      anchorElements.forEach((anchor) => {
        anchor.removeEventListener('click', handleAnchorClick);
        delete (anchor as any)._hasClickListener;
      });
    };
  }, []);

  return null;
}
