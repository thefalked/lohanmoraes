import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { DoubleSide, Group, MathUtils, Mesh } from "three";

import { stageExperienceContent } from "./stage-experience.content";
import { useStageScroll } from "./stage-experience-scroll-context";
import { lerpPhase, planeDimensions, textureImageSize } from "./stage-experience.logic";

const ORBIT_RADIUS = 5.5;
const PHOTO_PLANE_MAX = 3.2;

export function PhotoCloud() {
  const groupRef = useRef<Group>(null);
  const meshRefs = useRef<Mesh[]>([]);
  const { progressRef, smoothRef } = useStageScroll();
  const urls = useMemo(() => stageExperienceContent.photoCloud.map((photo) => photo.src), []);
  const textures = useTexture(urls);

  const layouts = useMemo(
    () =>
      stageExperienceContent.photoCloud.map((_, index) => {
        const angle = (index / stageExperienceContent.photoCloud.length) * Math.PI * 2;
        const { width, height } = textureImageSize(textures[index]);
        const plane = planeDimensions(width, height, PHOTO_PLANE_MAX);
        return {
          angle,
          y: Math.sin(angle * 2) * 0.8,
          scale: 0.85 + (index % 3) * 0.12,
          tilt: MathUtils.degToRad((index % 5) * 4 - 8),
          planeWidth: plane.width,
          planeHeight: plane.height,
        };
      }),
    [textures],
  );

  useFrame(({ clock }) => {
    smoothRef.current = lerpPhase(smoothRef.current, progressRef.current, 0.08);
    const t = smoothRef.current;
    const spin = clock.getElapsedTime() * 0.08 + t * Math.PI * 1.4;

    if (groupRef.current) {
      groupRef.current.rotation.y = spin;
      groupRef.current.position.y = Math.sin(t * Math.PI) * 0.6 - t * 0.8;
    }

    meshRefs.current.forEach((mesh, index) => {
      const layout = layouts[index];
      if (!mesh || !layout) return;
      const angle = layout.angle + t * 0.5;
      mesh.position.set(Math.cos(angle) * ORBIT_RADIUS, layout.y, Math.sin(angle) * ORBIT_RADIUS);
      mesh.rotation.set(layout.tilt, angle + Math.PI / 2, 0);
      mesh.scale.setScalar(layout.scale);
    });
  });

  return (
    <group ref={groupRef} position={[0, -0.5, -2]}>
      {layouts.map((layout, index) => (
        <mesh
          key={urls[index]}
          ref={(node) => {
            if (node) meshRefs.current[index] = node;
          }}
        >
          <planeGeometry args={[layout.planeWidth, layout.planeHeight]} />
          <meshBasicMaterial
            map={textures[index]}
            side={DoubleSide}
            transparent
            opacity={0.92}
            toneMapped={false}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  );
}
