import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import {
  AdditiveBlending,
  BufferAttribute,
  BufferGeometry,
  Color,
  Points,
  PointsMaterial,
} from "three";

import { stageExperienceContent } from "./stage-experience.content";
import { useStageScroll } from "./stage-experience-scroll-context";
import { lerpPhase, particleCountForViewport } from "./stage-experience.logic";

const SPREAD = 22;

function createParticleGeometry(count: number): BufferGeometry {
  const geometry = new BufferGeometry();
  const positions = new Float32Array(count * 3);
  const seeds = new Float32Array(count);

  for (let i = 0; i < count; i += 1) {
    positions[i * 3] = (Math.random() - 0.5) * SPREAD;
    positions[i * 3 + 1] = (Math.random() - 0.5) * SPREAD * 0.65;
    positions[i * 3 + 2] = (Math.random() - 0.5) * SPREAD;
    seeds[i] = Math.random() * Math.PI * 2;
  }

  geometry.setAttribute("position", new BufferAttribute(positions, 3));
  geometry.setAttribute("aSeed", new BufferAttribute(seeds, 1));
  return geometry;
}

export function ParticleField() {
  const pointsRef = useRef<Points>(null);
  const { progressRef, smoothRef } = useStageScroll();
  const count = typeof window !== "undefined" ? particleCountForViewport(window.innerWidth) : 640;

  const geometry = useMemo(() => createParticleGeometry(count), [count]);
  const material = useMemo(
    () =>
      new PointsMaterial({
        size: 0.045,
        transparent: true,
        opacity: 0.55,
        depthWrite: false,
        blending: AdditiveBlending,
        color: new Color(stageExperienceContent.accent),
      }),
    [],
  );

  useFrame(({ clock }) => {
    smoothRef.current = lerpPhase(smoothRef.current, progressRef.current, 0.08);
    const elapsed = clock.getElapsedTime();
    const positions = geometry.getAttribute("position") as BufferAttribute;
    const seeds = geometry.getAttribute("aSeed") as BufferAttribute;

    for (let i = 0; i < positions.count; i += 1) {
      const seed = seeds.getX(i);
      const baseX = (Math.sin(seed * 12.7) * 0.5 + 0.5 - 0.5) * SPREAD;
      const baseY = (Math.cos(seed * 8.3) * 0.5 + 0.5 - 0.5) * SPREAD * 0.65;
      const baseZ = (Math.sin(seed * 5.1) * 0.5 + 0.5 - 0.5) * SPREAD;
      const drift = Math.sin(elapsed * 0.35 + seed) * 0.35;
      positions.setXYZ(
        i,
        baseX + drift,
        baseY + Math.cos(elapsed * 0.28 + seed) * 0.25,
        baseZ - smoothRef.current * 4,
      );
    }
    positions.needsUpdate = true;

    if (pointsRef.current) {
      pointsRef.current.rotation.y = elapsed * 0.02 + smoothRef.current * 0.6;
      pointsRef.current.rotation.x = Math.sin(elapsed * 0.15) * 0.08;
    }
  });

  return <points ref={pointsRef} geometry={geometry} material={material} />;
}
