import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { AdditiveBlending, CanvasTexture, Color, Group, SRGBColorSpace } from "three";

import { guitarChordsVisual } from "./guitar-chords.content";
import { guitarSpiralBounds, spiralPoint } from "./guitar-chords.logic";
import { useGuitarScroll } from "./guitar-chords-scroll-context";

const SPIRAL_TURNS = 1.55;
const INNER_COUNT = 72;
const OUTER_COUNT = 36;

type OrbitHelix = {
  count: number;
  radiusScale: number;
  zScale: number;
  size: number;
  opacity: number;
  color: string;
  yShift: number;
};

const HELIXES: OrbitHelix[] = [
  {
    count: INNER_COUNT,
    radiusScale: 1,
    zScale: 1,
    size: 0.045,
    opacity: 0.72,
    color: guitarChordsVisual.accent,
    yShift: 0,
  },
  {
    count: OUTER_COUNT,
    radiusScale: 1.22,
    zScale: 1.35,
    size: 0.055,
    opacity: 0.38,
    color: guitarChordsVisual.accentChroma,
    yShift: 0.04,
  },
];

function createSoftGlowTexture(): CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext("2d");

  if (ctx) {
    const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    gradient.addColorStop(0, "rgba(255,255,255,0.95)");
    gradient.addColorStop(0.4, "rgba(255,255,255,0.25)");
    gradient.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 64, 64);
  }

  const texture = new CanvasTexture(canvas);
  texture.colorSpace = SRGBColorSpace;
  return texture;
}

function buildHelixPoints(
  config: OrbitHelix,
  height: number,
  radiusX: number,
  radiusZ: number,
  yCenter: number,
): {
  positions: Float32Array;
  colors: Float32Array;
} {
  const positions = new Float32Array(config.count * 3);
  const colors = new Float32Array(config.count * 3);
  const tint = new Color(config.color);

  for (let i = 0; i < config.count; i += 1) {
    const t = i / (config.count - 1);
    const edgeFade = Math.min(1, t / 0.16, (1 - t) / 0.16);
    const fade = edgeFade * edgeFade;
    const point = spiralPoint(
      t,
      height * 0.92,
      radiusX * config.radiusScale,
      radiusZ * config.zScale,
      SPIRAL_TURNS,
      yCenter + config.yShift,
    );

    positions[i * 3] = point.x;
    positions[i * 3 + 1] = point.y;
    positions[i * 3 + 2] = point.z;

    colors[i * 3] = tint.r * fade;
    colors[i * 3 + 1] = tint.g * fade;
    colors[i * 3 + 2] = tint.b * fade;
  }

  return { positions, colors };
}

export function GuitarSpiral() {
  const groupRef = useRef<Group>(null);
  const { smoothRef } = useGuitarScroll();
  const bounds = guitarSpiralBounds();

  const glowTexture = useMemo(() => createSoftGlowTexture(), []);

  const helixes = useMemo(
    () =>
      HELIXES.map((config) => ({
        config,
        ...buildHelixPoints(config, bounds.height, bounds.radiusX, bounds.radiusZ, bounds.yCenter),
      })),
    [bounds.height, bounds.radiusX, bounds.radiusZ, bounds.yCenter],
  );

  useFrame(({ clock }) => {
    const group = groupRef.current;
    if (!group) {
      return;
    }

    const elapsed = clock.getElapsedTime();
    const scroll = smoothRef.current;
    group.rotation.y = elapsed * 0.06 + scroll * 0.35;
    group.position.y = Math.sin(elapsed * 0.7) * 0.012;
  });

  return (
    <group ref={groupRef} position={[0, 0, 0.05]}>
      {helixes.map(({ config, positions, colors }, index) => (
        <points key={index}>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[positions, 3]} />
            <bufferAttribute attach="attributes-color" args={[colors, 3]} />
          </bufferGeometry>
          <pointsMaterial
            map={glowTexture}
            size={config.size}
            sizeAttenuation
            vertexColors
            transparent
            opacity={config.opacity}
            depthWrite={false}
            blending={AdditiveBlending}
            toneMapped={false}
          />
        </points>
      ))}
    </group>
  );
}
