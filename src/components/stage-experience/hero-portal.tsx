import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { AdditiveBlending, Group, Mesh, MeshBasicMaterial } from "three";

import { stageExperienceContent } from "./stage-experience.content";
import { useStageScroll } from "./stage-experience-scroll-context";
import { lerpPhase } from "./stage-experience.logic";

export function HeroPortal() {
  const groupRef = useRef<Group>(null);
  const ringRef = useRef<Mesh>(null);
  const glowRef = useRef<Mesh>(null);
  const texture = useTexture(stageExperienceContent.heroImage);
  const { progressRef, smoothRef } = useStageScroll();

  useFrame(({ clock }) => {
    smoothRef.current = lerpPhase(smoothRef.current, progressRef.current, 0.08);
    const t = smoothRef.current;
    const elapsed = clock.getElapsedTime();

    if (groupRef.current) {
      groupRef.current.position.z = -t * 3.5;
      groupRef.current.position.y = Math.sin(elapsed * 0.4) * 0.08;
      groupRef.current.scale.setScalar(1 - t * 0.35);
    }
    if (ringRef.current) {
      ringRef.current.rotation.x = elapsed * 0.35;
      ringRef.current.rotation.z = elapsed * 0.22;
    }
    if (glowRef.current) {
      const material = glowRef.current.material as MeshBasicMaterial;
      material.opacity = 0.18 + Math.sin(elapsed * 1.2) * 0.06;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0.2, 0]}>
      <mesh>
        <planeGeometry args={[5.2, 3.4]} />
        <meshBasicMaterial map={texture} toneMapped={false} transparent opacity={0.95} />
      </mesh>
      <mesh ref={ringRef} position={[0, 0, 0.6]}>
        <torusGeometry args={[3.1, 0.045, 16, 128]} />
        <meshBasicMaterial
          color={stageExperienceContent.accent}
          transparent
          opacity={0.85}
          blending={AdditiveBlending}
        />
      </mesh>
      <mesh ref={glowRef} position={[0, 0, -0.2]} scale={[6.5, 4.5, 1]}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial
          color={stageExperienceContent.accentSecondary}
          transparent
          opacity={0.2}
          blending={AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}
