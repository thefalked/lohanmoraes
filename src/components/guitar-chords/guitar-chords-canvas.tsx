import { Canvas } from "@react-three/fiber";
import { Suspense, useMemo } from "react";

import { getCanvasDpr } from "../stage-experience/stage-experience.logic";
import { guitarChordsVisual } from "./guitar-chords.content";
import { GuitarChordsScene } from "./guitar-chords-scene";
import type { GuitarScrollRefs } from "./guitar-chords-scroll-context";

type GuitarChordsCanvasProps = {
  scrollRefs: GuitarScrollRefs;
};

export function GuitarChordsCanvas({ scrollRefs }: GuitarChordsCanvasProps) {
  const dpr = useMemo(() => {
    if (typeof window === "undefined") {
      return 1;
    }
    return getCanvasDpr(window.devicePixelRatio, window.innerWidth);
  }, []);

  return (
    <Canvas
      data-testid="guitar-chords-canvas"
      dpr={dpr}
      camera={{ position: [0, 1.5, 1.52], fov: 30, near: 0.05, far: 20 }}
      gl={{
        antialias: true,
        alpha: false,
        powerPreference: "high-performance",
      }}
      style={{ width: "100%", height: "100%" }}
    >
      <color attach="background" args={[guitarChordsVisual.fogColor]} />
      <fog attach="fog" args={[guitarChordsVisual.fogColor, 8, 22]} />
      <Suspense fallback={null}>
        <GuitarChordsScene scrollRefs={scrollRefs} />
      </Suspense>
    </Canvas>
  );
}
