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
 * Lazy-loaded so content paints before the Three.js chunk arrives;
 * falls back to the static CSS backdrop for reduced motion / no WebGL.
 */
export function StageCanvas() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    setEnabled(!prefersReducedMotion() && supportsWebgl());
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
