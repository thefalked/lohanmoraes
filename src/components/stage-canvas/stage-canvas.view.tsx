import { useMemo } from "react";
import { Canvas } from "@react-three/fiber";

import { FpsGovernor } from "./fps-governor";
import { StageScene } from "./stage-scene";
import { getStageQuality } from "./use-stage-quality";

export function StageCanvasView() {
  const quality = useMemo(() => getStageQuality(), []);

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 contain-strict" aria-hidden="true">
      <Canvas
        dpr={[1, quality.dprMax]}
        camera={{ fov: 42, near: 0.1, far: 60, position: [0, 0.8, 10] }}
        gl={{
          antialias: quality.antialias,
          powerPreference: "high-performance",
          alpha: false,
          stencil: false,
          depth: true,
        }}
        frameloop="always"
        performance={{ min: 0.5, max: 1, debounce: 300 }}
        eventSource={
          quality.pointerParallax && typeof document !== "undefined" ? document.body : undefined
        }
        eventPrefix="client"
      >
        <FpsGovernor dprMax={quality.dprMax} />
        <StageScene quality={quality} />
      </Canvas>
    </div>
  );
}

export default StageCanvasView;
