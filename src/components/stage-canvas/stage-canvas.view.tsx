import { useMemo } from "react";
import { Canvas } from "@react-three/fiber";

import { StageScene } from "./stage-scene";
import { getStageQuality } from "./use-stage-quality";

export function StageCanvasView() {
  const quality = useMemo(() => getStageQuality(), []);

  return (
    <div className="pointer-events-none fixed inset-0 -z-10" aria-hidden="true">
      <Canvas
        dpr={[1, quality.dprMax]}
        camera={{ fov: 42, near: 0.1, far: 60, position: [0, 0.8, 10] }}
        gl={{ antialias: !quality.isMobile, powerPreference: "high-performance", alpha: false }}
        eventSource={typeof document !== "undefined" ? document.body : undefined}
      >
        <StageScene quality={quality} />
      </Canvas>
    </div>
  );
}

export default StageCanvasView;
