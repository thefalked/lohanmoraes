import { lazy, Suspense, useEffect, useState } from "react";

import { prefersReducedMotion } from "../../lib/lenis";

const StageCanvasView = lazy(() => import("./stage-canvas.view"));

function supportsWebgl(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(canvas.getContext("webgl2") ?? canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

/**
 * Fixed full-viewport 3D stage behind the page content.
 * Deferred until after first paint so the hero scroll stays smooth.
 */
export function StageCanvas() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion() || !supportsWebgl()) {
      return;
    }

    let idleId = 0;
    let timeoutId = 0;
    const arm = () => setEnabled(true);

    // Let the first paint + Lenis settle before mounting WebGL.
    timeoutId = window.setTimeout(() => {
      const ric = (
        window as Window & {
          requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
        }
      ).requestIdleCallback;
      if (typeof ric === "function") {
        idleId = ric(arm, { timeout: 600 });
      } else {
        arm();
      }
    }, 180);

    return () => {
      window.clearTimeout(timeoutId);
      const cic = (window as Window & { cancelIdleCallback?: (id: number) => void })
        .cancelIdleCallback;
      if (idleId && typeof cic === "function") {
        cic(idleId);
      }
    };
  }, []);

  if (!enabled) {
    return <div className="stage-backdrop-static fixed inset-0 -z-10" aria-hidden="true" />;
  }

  return (
    <Suspense
      fallback={<div className="stage-backdrop-static fixed inset-0 -z-10" aria-hidden="true" />}
    >
      <StageCanvasView />
    </Suspense>
  );
}
