import { useFrame, useThree } from "@react-three/fiber";
import { MathUtils, PerspectiveCamera } from "three";

import { cameraPosition } from "./guitar-chords.logic";
import { useGuitarScroll } from "./guitar-chords-scroll-context";

export function GuitarCamera() {
  const { camera } = useThree();
  const { smoothRef } = useGuitarScroll();

  useFrame(() => {
    const target = cameraPosition(smoothRef.current);
    const cam = camera as PerspectiveCamera;

    cam.position.x = MathUtils.lerp(cam.position.x, target.position.x, 0.035);
    cam.position.y = MathUtils.lerp(cam.position.y, target.position.y, 0.035);
    cam.position.z = target.position.z;
    cam.lookAt(target.lookAt.x, target.lookAt.y, target.lookAt.z);
    cam.fov = target.fov;
    cam.updateProjectionMatrix();
  });

  return null;
}
