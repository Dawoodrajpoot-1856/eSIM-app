"use client";

import { useEffect, Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

function ProgressBarContent() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    NProgress.configure({ showSpinner: false, trickleSpeed: 200 });

    const style = document.createElement("style");
    style.innerHTML = `
      #nprogress .bar {
        background: #166534 !important;
        height: 4px !important;
        position: fixed;
        z-index: 999999;
        top: 0;
        left: 0;
        width: 100%;
      }
      #nprogress .peg {
        box-shadow: 0 0 10px #166534, 0 0 5px #166534 !important;
      }
      #nprogress .spinner {
        display: none !important;
      }
    `;
    document.head.appendChild(style);

    const handleClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("a");
      if (target && target.href) {
        const targetUrl = new URL(target.href);
        const currentUrl = window.location.href;
        if (
          targetUrl.href !== currentUrl &&
          targetUrl.origin === window.location.origin
        ) {
          NProgress.start();

          setTimeout(() => {
            NProgress.done();
          }, 2000);
        }
      }
    };

    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  useEffect(() => {
    NProgress.done();
  }, [pathname, searchParams]);

  return null;
}

export function TopProgressBar() {
  return (
    <Suspense fallback={null}>
      <ProgressBarContent />
    </Suspense>
  );
}
