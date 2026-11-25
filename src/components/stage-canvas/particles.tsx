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
    pos.y += mod(t + aPhase * 10.0, 10.0) - 2.0;
    pos.x += sin(t * 0.7 + aPhase * 6.28) * 0.4;
    pos.z += cos(t * 0.5 + aPhase * 6.28) * 0.3;

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPosition;
    gl_PointSize = aScale * uPixelRatio * (18.0 / -mvPosition.z);

    // fade out near the top of the rise and far from camera
    float heightFade = 1.0 - smoothstep(4.0, 8.0, pos.y);
    vAlpha = heightFade * 0.65;
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
};

export function StageParticles({ count, color = "#e8a06a" }: StageParticlesProps) {
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const geometry = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const scales = new Float32Array(count);
    const speeds = new Float32Array(count);
    const phases = new Float32Array(count);

    for (let i = 0; i < count; i += 1) {
      positions[i * 3] = (Math.random() - 0.5) * 18;
      positions[i * 3 + 1] = Math.random() * 8 - 2;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 12;
      scales[i] = 0.4 + Math.random() * 1.2;
      speeds[i] = 0.15 + Math.random() * 0.35;
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
      uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
      uColor: { value: new THREE.Color(color) },
    }),
    [color],
  );

  useFrame(({ clock }) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = clock.elapsedTime;
    }
  });

  return (
    <points geometry={geometry}>
      <shaderMaterial
        ref={materialRef}
        vertexShader={particleVertex}
        fragmentShader={particleFragment}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
