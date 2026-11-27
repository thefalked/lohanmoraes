import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const particleVertex = /* glsl */ `
  uniform float uTime;
  uniform float uPixelRatio;
  attribute float aScale;
  attribute float aSpeed;
  attribute float aPhase;
  varying float vAlpha;

  void main() {
    vec3 pos = position;
    float t = uTime * aSpeed;
    float cycle = mod(t + aPhase * 12.0, 12.0);
    pos.y += cycle - 3.0;
    pos.x += sin(t * 0.25 + aPhase * 6.28) * 0.35;
    pos.z += cos(t * 0.2 + aPhase * 6.28) * 0.25;

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPosition;
    gl_PointSize = aScale * uPixelRatio * (11.0 / -mvPosition.z);

    float wrapFade = smoothstep(0.0, 1.2, cycle) * (1.0 - smoothstep(10.0, 12.0, cycle));
    float depthFade = smoothstep(0.0, 2.0, -mvPosition.z);
    vAlpha = wrapFade * depthFade * 0.28;
  }
`;

const particleFragment = /* glsl */ `
  uniform vec3 uColor;
  varying float vAlpha;

  void main() {
    float d = distance(gl_PointCoord, vec2(0.5));
    float glow = 1.0 - smoothstep(0.0, 0.5, d);
    gl_FragColor = vec4(uColor, glow * glow * vAlpha);
  }
`;

export type StageParticlesProps = {
  count: number;
  color?: string;
  dprCap?: number;
  frameStride?: number;
};

export function StageParticles({
  count,
  color = "#e022b7",
  dprCap = 2,
  frameStride = 1,
}: StageParticlesProps) {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const frame = useRef(0);

  const geometry = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const scales = new Float32Array(count);
    const speeds = new Float32Array(count);
    const phases = new Float32Array(count);

    for (let i = 0; i < count; i += 1) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = Math.random() * 8 - 3;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 14 - 2;
      scales[i] = 0.25 + Math.random() * 0.7;
      speeds[i] = 0.05 + Math.random() * 0.12;
      phases[i] = Math.random();
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("aScale", new THREE.BufferAttribute(scales, 1));
    geo.setAttribute("aSpeed", new THREE.BufferAttribute(speeds, 1));
    geo.setAttribute("aPhase", new THREE.BufferAttribute(phases, 1));
    return geo;
  }, [count]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uPixelRatio: {
        value: Math.min(typeof window !== "undefined" ? window.devicePixelRatio : 1, dprCap),
      },
      uColor: { value: new THREE.Color(color) },
    }),
    [color, dprCap],
  );

  useFrame(({ clock }) => {
    frame.current += 1;
    if (frameStride > 1 && frame.current % frameStride !== 0) {
      return;
    }
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = clock.elapsedTime;
    }
  });

  return (
    <points geometry={geometry} frustumCulled={false}>
      <shaderMaterial
        ref={materialRef}
        vertexShader={particleVertex}
        fragmentShader={particleFragment}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        toneMapped={false}
      />
    </points>
  );
}
