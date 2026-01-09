'use client';

import { useEffect, Suspense } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import NProgress from 'nprogress';

function PageLoaderContent() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    NProgress.done();
  }, [pathname, searchParams]);

  return null;
}

export function PageLoader() {
  useEffect(() => {
    NProgress.configure({ showSpinner: false });

    const handleAnchorClick = (event: MouseEvent) => {
        // ... (rest of the logic)
       const target = event.currentTarget as HTMLAnchorElement;
       if (target.target === '_blank') return;
       
       // Basic check to see if it's an internal link
       if (target.href.startsWith(window.location.origin)) {
           const targetUrl = target.href;
           const currentUrl = window.location.href;
           if (targetUrl !== currentUrl) {
                NProgress.start();
           }
       }
    };

    const handleMutation: MutationCallback = () => {
      const anchorElements = document.querySelectorAll('a[href]');
      anchorElements.forEach((anchor) => {
        const hasClickListener = (anchor as any)._hasClickListener;
        if (!hasClickListener) {
          anchor.addEventListener('click', handleAnchorClick as any);
          (anchor as any)._hasClickListener = true;
        }
      });
    };

    const mutationObserver = new MutationObserver(handleMutation);
    mutationObserver.observe(document, { childList: true, subtree: true });

    // Initial run
    handleMutation([], mutationObserver);

    return () => {
      mutationObserver.disconnect();
      // Clean up event listeners
      const anchorElements = document.querySelectorAll('a[href]');
      anchorElements.forEach((anchor) => {
        anchor.removeEventListener('click', handleAnchorClick as any);
        delete (anchor as any)._hasClickListener;
      });
    };
  }, []);

  return (
    <Suspense fallback={null}>
        <PageLoaderContent />
    </Suspense>
  );
}
