import { Canvas } from "@react-three/fiber";
import { Suspense, useMemo } from "react";

import { StageScene } from "./stage-scene";
import { stageExperienceContent } from "./stage-experience.content";
import { getCanvasDpr } from "./stage-experience.logic";
import type { StageScrollRefs } from "./stage-experience-scroll-context";

type StageExperienceCanvasProps = {
  scrollRefs: StageScrollRefs;
};

export function StageExperienceCanvas({ scrollRefs }: StageExperienceCanvasProps) {
  const dpr = useMemo(() => {
    if (typeof window === "undefined") {
      return 1;
    }
    return getCanvasDpr(window.devicePixelRatio, window.innerWidth);
  }, []);

  return (
    <Canvas
      data-testid="stage-experience-canvas"
      dpr={dpr}
      camera={{ position: [0, 0.4, 8], fov: 50, near: 0.1, far: 60 }}
      gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
      style={{ width: "100%", height: "100%" }}
    >
      <color attach="background" args={[stageExperienceContent.fogColor]} />
      <fog attach="fog" args={[stageExperienceContent.fogColor, 10, 32]} />
      <Suspense fallback={null}>
        <StageScene scrollRefs={scrollRefs} />
      </Suspense>
    </Canvas>
  );
}
