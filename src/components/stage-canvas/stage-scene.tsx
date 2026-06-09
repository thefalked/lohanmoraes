import { useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

import { StageParticles } from "./particles";
import { SpotlightCone } from "./spotlights";
import type { StageQuality } from "./use-stage-quality";

type CameraKeyframe = {
  at: number;
  position: [number, number, number];
  target: [number, number, number];
};

// One keyframe per page section: hero, about, shows, teaching, contact.
const CAMERA_KEYFRAMES: CameraKeyframe[] = [
  { at: 0.0, position: [0, 1.2, 9], target: [0, 1.5, 0] },
  { at: 0.25, position: [-3.5, 2.2, 8], target: [1, 1.2, 0] },
  { at: 0.5, position: [4, 3.2, 9.5], target: [-0.5, 1, 0] },
  { at: 0.75, position: [-2, 1, 7], target: [0.5, 2, 0] },
  { at: 1.0, position: [0, 2.4, 6.5], target: [0, 1.4, 0] },
];

function sampleKeyframes(progress: number, outPos: THREE.Vector3, outTarget: THREE.Vector3): void {
  const clamped = Math.min(1, Math.max(0, progress));
  let next = CAMERA_KEYFRAMES.findIndex((k) => k.at >= clamped);
  if (next <= 0) {
    const k = CAMERA_KEYFRAMES[Math.max(0, next)] ?? CAMERA_KEYFRAMES[0];
    outPos.set(...k.position);
    outTarget.set(...k.target);
    return;
  }
  const a = CAMERA_KEYFRAMES[next - 1];
  const b = CAMERA_KEYFRAMES[next];
  const span = b.at - a.at;
  const local = span > 0 ? (clamped - a.at) / span : 0;
  // ease in-out for gentler section-to-section moves
  const t = local * local * (3 - 2 * local);
  outPos.set(
    a.position[0] + (b.position[0] - a.position[0]) * t,
    a.position[1] + (b.position[1] - a.position[1]) * t,
    a.position[2] + (b.position[2] - a.position[2]) * t,
  );
  outTarget.set(
    a.target[0] + (b.target[0] - a.target[0]) * t,
    a.target[1] + (b.target[1] - a.target[1]) * t,
    a.target[2] + (b.target[2] - a.target[2]) * t,
  );
}

function getScrollProgress(): number {
  const doc = document.documentElement;
  const max = doc.scrollHeight - window.innerHeight;
  return max > 0 ? window.scrollY / max : 0;
}

export type StageSceneProps = {
  quality: StageQuality;
};

export function StageScene({ quality }: StageSceneProps) {
  const { camera } = useThree();
  const smoothProgress = useRef(0);
  const pointer = useRef({ x: 0, y: 0 });

  const scratch = useMemo(
    () => ({
      position: new THREE.Vector3(),
      target: new THREE.Vector3(),
      lookAt: new THREE.Vector3(0, 1.5, 0),
    }),
    [],
  );

  useFrame((state, delta) => {
    const damp = 1 - Math.exp(-3.5 * delta);
    smoothProgress.current += (getScrollProgress() - smoothProgress.current) * damp;

    sampleKeyframes(smoothProgress.current, scratch.position, scratch.target);

    if (quality.pointerParallax) {
      const pointerDamp = 1 - Math.exp(-2.5 * delta);
      pointer.current.x += (state.pointer.x - pointer.current.x) * pointerDamp;
      pointer.current.y += (state.pointer.y - pointer.current.y) * pointerDamp;
      scratch.position.x += pointer.current.x * 0.6;
      scratch.position.y += pointer.current.y * 0.35;
    }

    camera.position.copy(scratch.position);
    scratch.lookAt.lerp(scratch.target, damp);
    camera.lookAt(scratch.lookAt);
  });

  return (
    <>
      <fog attach="fog" args={["#08060a", 8, 24]} />
      <ambientLight intensity={0.12} />

      {/* stage floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]}>
        <planeGeometry args={[60, 40]} />
        <meshStandardMaterial color="#0c0a10" roughness={0.35} metalness={0.6} />
      </mesh>

      {/* back wall to catch the light wash */}
      <mesh position={[0, 6, -10]}>
        <planeGeometry args={[60, 30]} />
        <meshStandardMaterial color="#070509" roughness={0.9} metalness={0} />
      </mesh>

      <SpotlightCone position={[-4.5, 6, -3]} color="#e022b7" swayOffset={0} intensity={0.3} />
      <SpotlightCone position={[0, 7, -4.5]} color="#8a2be2" swayOffset={2.1} intensity={0.26} />
      <SpotlightCone position={[4.5, 6, -3]} color="#ff8a3d" swayOffset={4.2} intensity={0.22} />
      {!quality.isMobile && (
        <>
          <SpotlightCone
            position={[-8, 5.5, -6]}
            color="#c45ab0"
            swayOffset={1.3}
            intensity={0.16}
          />
          <SpotlightCone
            position={[8, 5.5, -6]}
            color="#5a4ae0"
            swayOffset={3.4}
            intensity={0.16}
          />
        </>
      )}

      <StageParticles count={quality.particleCount} />
    </>
  );
}
