import { useFrame, useThree } from "@react-three/fiber";
import { MathUtils, PerspectiveCamera } from "three";

import { useStageScroll } from "./stage-experience-scroll-context";
import { lerpPhase, sectionPhase } from "./stage-experience.logic";

export function ScrollCamera() {
  const { camera } = useThree();
  const { progressRef, smoothRef } = useStageScroll();

  useFrame(() => {
    smoothRef.current = lerpPhase(smoothRef.current, progressRef.current, 0.08);
    const t = smoothRef.current;
    const phase = sectionPhase(t);
    const cam = camera as PerspectiveCamera;

    const heroZ = 8;
    const orbitZ = 6 - t * 2;
    const depthZ = 4 - t * 3;
    const finaleZ = 2.5;

    let targetZ = heroZ;
    if (phase === "orbit") targetZ = orbitZ;
    else if (phase === "depth") targetZ = depthZ;
    else if (phase === "finale") targetZ = finaleZ;

    cam.position.x = MathUtils.lerp(cam.position.x, Math.sin(t * Math.PI * 2) * 1.2, 0.06);
    cam.position.y = MathUtils.lerp(cam.position.y, 0.4 - t * 1.8, 0.06);
    cam.position.z = MathUtils.lerp(cam.position.z, targetZ, 0.06);
    cam.lookAt(0, -0.2 - t * 0.5, -1 - t * 2);
    cam.fov = MathUtils.lerp(cam.fov, 48 + t * 8, 0.04);
    cam.updateProjectionMatrix();
  });

  return null;
}
