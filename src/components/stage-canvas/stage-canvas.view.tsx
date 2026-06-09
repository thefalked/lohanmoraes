import { useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { Bloom, EffectComposer } from "@react-three/postprocessing";

import { StageScene } from "./stage-scene";
import { getStageQuality } from "./use-stage-quality";

export function StageCanvasView() {
  const quality = useMemo(() => getStageQuality(), []);

  return (
    <div className="pointer-events-none fixed inset-0 -z-10" aria-hidden="true">
      <Canvas
        dpr={[1, quality.dprMax]}
        camera={{ fov: 42, near: 0.1, far: 60, position: [0, 1.2, 9] }}
        gl={{ antialias: !quality.isMobile, powerPreference: "high-performance" }}
        eventSource={typeof document !== "undefined" ? document.body : undefined}
      >
        <color attach="background" args={["#08060a"]} />
        <StageScene quality={quality} />
        {quality.bloom && (
          <EffectComposer>
            <Bloom intensity={0.45} luminanceThreshold={0.3} luminanceSmoothing={0.9} mipmapBlur />
          </EffectComposer>
        )}
      </Canvas>
    </div>
  );
}

export default StageCanvasView;
