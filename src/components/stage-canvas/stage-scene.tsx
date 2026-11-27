import { useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

import { LightRibbon } from "./light-ribbons";
import { StageParticles } from "./particles";
import type { StageQuality } from "./use-stage-quality";

type CameraKeyframe = {
  at: number;
  position: [number, number, number];
  target: [number, number, number];
};

const CAMERA_KEYFRAMES: CameraKeyframe[] = [
  { at: 0.0, position: [0, 0.8, 10], target: [0, 0.6, 0] },
  { at: 0.2, position: [-2.2, 1.2, 9.2], target: [0.4, 0.5, -1] },
  { at: 0.4, position: [1.8, 0.9, 8.8], target: [-0.3, 0.7, -0.5] },
  { at: 0.6, position: [2.6, 1.6, 9.5], target: [0, 0.4, -1] },
  { at: 0.8, position: [-1.4, 0.7, 8.4], target: [0.2, 0.8, -0.2] },
  { at: 1.0, position: [0, 1.3, 8], target: [0, 0.55, 0] },
];

type RibbonConfig = {
  color: string;
  position: [number, number, number];
  rotation: [number, number, number];
  phase: number;
  amp: number;
  opacity: number;
  width?: number;
  height?: number;
};

const RIBBONS: RibbonConfig[] = [
  {
    color: "#e022b7",
    position: [0, 1.2, -2],
    rotation: [0.35, 0.2, -0.15],
    phase: 0.2,
    amp: 1.35,
    opacity: 0.28,
  },
  {
    color: "#8a2be2",
    position: [-1.5, 0.2, -3.5],
    rotation: [0.55, -0.25, 0.1],
    phase: 1.7,
    amp: 1.6,
    opacity: 0.2,
    width: 20,
    height: 2.8,
  },
  {
    color: "#c45ab0",
    position: [1.8, -0.4, -1.5],
    rotation: [0.25, 0.35, 0.2],
    phase: 3.1,
    amp: 1.1,
    opacity: 0.18,
    width: 16,
    height: 2,
  },
  {
    color: "#5a4ae0",
    position: [0, 2.4, -5],
    rotation: [0.7, 0.05, -0.05],
    phase: 4.4,
    amp: 1.8,
    opacity: 0.12,
    width: 22,
    height: 3.2,
  },
  {
    color: "#e022b7",
    position: [-2.5, -1.2, -4],
    rotation: [0.4, -0.4, 0.25],
    phase: 5.6,
    amp: 0.9,
    opacity: 0.14,
    width: 14,
    height: 1.6,
  },
];

type OrbConfig = {
  position: [number, number, number];
  color: string;
  radius: number;
  opacity: number;
};

const ORBS: OrbConfig[] = [
  { position: [-3.5, 2.2, -6], color: "#e022b7", radius: 0.55, opacity: 0.18 },
  { position: [3.2, 1.4, -5.5], color: "#8a2be2", radius: 0.4, opacity: 0.16 },
  { position: [0.5, 3.1, -7], color: "#c45ab0", radius: 0.7, opacity: 0.1 },
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
  const scrollRef = useRef(0);
  const pointer = useRef({ x: 0, y: 0 });
  const frameStride = quality.tier === "low" ? 2 : 1;

  const scratch = useMemo(
    () => ({
      position: new THREE.Vector3(),
      target: new THREE.Vector3(),
      lookAt: new THREE.Vector3(0, 0.6, 0),
    }),
    [],
  );

  const ribbons = useMemo(() => RIBBONS.slice(0, quality.ribbonCount), [quality.ribbonCount]);
  const orbs = useMemo(() => ORBS.slice(0, quality.glowOrbs), [quality.glowOrbs]);

  useFrame((state, delta) => {
    const damp = 1 - Math.exp(-1.8 * delta);
    smoothProgress.current += (getScrollProgress() - smoothProgress.current) * damp;
    scrollRef.current = smoothProgress.current;

    sampleKeyframes(smoothProgress.current, scratch.position, scratch.target);

    if (quality.pointerParallax) {
      const pointerDamp = 1 - Math.exp(-1.4 * delta);
      pointer.current.x += (state.pointer.x - pointer.current.x) * pointerDamp;
      pointer.current.y += (state.pointer.y - pointer.current.y) * pointerDamp;
      scratch.position.x += pointer.current.x * 0.25;
      scratch.position.y += pointer.current.y * 0.12;
    }

    camera.position.copy(scratch.position);
    scratch.lookAt.lerp(scratch.target, damp);
    camera.lookAt(scratch.lookAt);
  });

  return (
    <>
      <fog attach="fog" args={["#07050b", 12, 28]} />
      <color attach="background" args={["#07050b"]} />
      <ambientLight intensity={0.12} />

      {ribbons.map((ribbon) => (
        <LightRibbon
          key={`${ribbon.color}-${ribbon.phase}`}
          color={ribbon.color}
          position={ribbon.position}
          rotation={ribbon.rotation}
          phase={ribbon.phase}
          amp={ribbon.amp}
          opacity={ribbon.opacity}
          width={ribbon.width}
          height={ribbon.height}
          segments={quality.ribbonSegments}
          scrollRef={scrollRef}
          frameStride={frameStride}
        />
      ))}

      {orbs.map((orb) => (
        <mesh key={`${orb.color}-${orb.position.join(",")}`} position={orb.position} frustumCulled>
          <sphereGeometry args={[orb.radius, quality.sphereSegments, quality.sphereSegments]} />
          <meshBasicMaterial
            color={orb.color}
            transparent
            opacity={orb.opacity}
            toneMapped={false}
            depthWrite={false}
          />
        </mesh>
      ))}

      <StageParticles
        count={quality.particleCount}
        color="#d45ec4"
        dprCap={quality.dprMax}
        frameStride={frameStride}
      />
    </>
  );
}
