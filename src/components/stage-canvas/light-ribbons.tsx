import { useMemo, useRef, type MutableRefObject } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const ribbonVertex = /* glsl */ `
  uniform float uTime;
  uniform float uScroll;
  uniform float uPhase;
  uniform float uAmp;
  varying vec2 vUv;
  varying float vFade;

  void main() {
    vUv = uv;
    vec3 pos = position;
    float wave = sin(pos.x * 0.35 + uTime * 0.12 + uPhase + uScroll * 1.4);
    float lift = cos(pos.x * 0.18 + uTime * 0.08 + uPhase);
    pos.z += wave * uAmp;
    pos.y += lift * uAmp * 0.35;
    pos.y += (uScroll - 0.5) * 0.6;

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPosition;

    float edge = smoothstep(0.0, 0.18, uv.y) * (1.0 - smoothstep(0.82, 1.0, uv.y));
    float lengthFade = smoothstep(0.0, 0.12, uv.x) * (1.0 - smoothstep(0.88, 1.0, uv.x));
    vFade = edge * lengthFade;
  }
`;

const ribbonFragment = /* glsl */ `
  uniform vec3 uColor;
  uniform float uOpacity;
  varying vec2 vUv;
  varying float vFade;

  void main() {
    float soft = pow(vFade, 1.35);
    float sheen = 0.55 + 0.45 * sin(vUv.x * 6.283 + vUv.y * 2.0);
    float alpha = soft * sheen * uOpacity;
    gl_FragColor = vec4(uColor, alpha);
  }
`;

export type LightRibbonProps = {
  color: string;
  position: [number, number, number];
  rotation?: [number, number, number];
  width?: number;
  height?: number;
  phase?: number;
  amp?: number;
  opacity?: number;
  scrollRef: MutableRefObject<number>;
};

export function LightRibbon({
  color,
  position,
  rotation = [0.15, 0, 0],
  width = 18,
  height = 2.4,
  phase = 0,
  amp = 1.1,
  opacity = 0.22,
  scrollRef,
}: LightRibbonProps) {
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uScroll: { value: 0 },
      uPhase: { value: phase },
      uAmp: { value: amp },
      uColor: { value: new THREE.Color(color) },
      uOpacity: { value: opacity },
    }),
    [amp, color, opacity, phase],
  );

  useFrame(({ clock }) => {
    const material = materialRef.current;
    if (!material) {
      return;
    }
    material.uniforms.uTime.value = clock.elapsedTime;
    material.uniforms.uScroll.value = scrollRef.current;
  });

  return (
    <mesh position={position} rotation={rotation}>
      <planeGeometry args={[width, height, 64, 16]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={ribbonVertex}
        fragmentShader={ribbonFragment}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        side={THREE.DoubleSide}
        toneMapped={false}
      />
    </mesh>
  );
}
