import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { DirectionalLight, PointLight } from "three";

import { stageExperienceContent } from "./stage-experience.content";
import { useStageScroll } from "./stage-experience-scroll-context";
import { lerpPhase, sectionPhase } from "./stage-experience.logic";

export function StageLights() {
  const keyRef = useRef<DirectionalLight>(null);
  const rimRef = useRef<DirectionalLight>(null);
  const accentRef = useRef<PointLight>(null);
  const { progressRef, smoothRef } = useStageScroll();

  useFrame(() => {
    smoothRef.current = lerpPhase(smoothRef.current, progressRef.current, 0.08);
    const phase = sectionPhase(smoothRef.current);
    const t = smoothRef.current;

    if (keyRef.current) {
      keyRef.current.intensity = phase === "hero" ? 1.4 : 0.9;
      keyRef.current.position.set(-4 + t * 2, 6 - t * 1.5, 5);
    }
    if (rimRef.current) {
      rimRef.current.intensity = phase === "finale" ? 1.2 : 0.65;
      rimRef.current.position.set(5 - t * 3, 2 + t * 2, -3);
    }
    if (accentRef.current) {
      accentRef.current.intensity = 2.2 + Math.sin(t * Math.PI * 4) * 0.35;
      accentRef.current.position.set(Math.sin(t * Math.PI * 2) * 3, 1.5, 2 + t * 2);
    }
  });

  return (
    <>
      <ambientLight intensity={0.25} />
      <directionalLight ref={keyRef} color="#f5f0ff" intensity={1.2} position={[-4, 6, 5]} />
      <directionalLight
        ref={rimRef}
        color={stageExperienceContent.accentSecondary}
        intensity={0.7}
        position={[5, 2, -3]}
      />
      <pointLight
        ref={accentRef}
        color={stageExperienceContent.accent}
        intensity={2}
        position={[0, 1.5, 3]}
        distance={18}
        decay={2}
      />
    </>
  );
}
