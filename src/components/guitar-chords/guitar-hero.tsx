import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import { ClampToEdgeWrapping, Group, SRGBColorSpace } from "three";

import { planeDimensions, textureImageSize } from "../stage-experience/stage-experience.logic";
import { guitarPhotoAsset } from "./guitar-chords.content";
import { guitarPlaneOffsetY, guitarPlaneSize } from "./guitar-chords.logic";

export function GuitarHero() {
  const groupRef = useRef<Group>(null);
  const texture = useTexture(guitarPhotoAsset.path);
  const planeOffsetY = guitarPlaneOffsetY();

  texture.colorSpace = SRGBColorSpace;

  useEffect(() => {
    texture.wrapS = ClampToEdgeWrapping;
    texture.wrapT = ClampToEdgeWrapping;
    texture.repeat.set(1, 1);
    texture.offset.set(0, 0);
    texture.needsUpdate = true;
  }, [texture]);

  const planeSize = useMemo(() => {
    const { width, height } = textureImageSize(texture);
    return planeDimensions(width, height, guitarPhotoAsset.sceneHeight);
  }, [texture]);

  const { width: fallbackWidth, height: fallbackHeight } = guitarPlaneSize();
  const width = planeSize.width || fallbackWidth;
  const height = planeSize.height || fallbackHeight;

  useFrame(({ clock }) => {
    const elapsed = clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(elapsed * 0.55) * 0.006;
    }
  });

  return (
    <group ref={groupRef} position={[0, planeOffsetY, 0]}>
      <mesh>
        <planeGeometry args={[width, height]} />
        <meshBasicMaterial map={texture} toneMapped={false} />
      </mesh>
    </group>
  );
}

useTexture.preload(guitarPhotoAsset.path);
