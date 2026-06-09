import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const coneVertex = /* glsl */ `
  varying vec2 vUv;
  varying vec3 vWorldPos;
  varying vec3 vNormal;

  void main() {
    vUv = uv;
    vec4 worldPos = modelMatrix * vec4(position, 1.0);
    vWorldPos = worldPos.xyz;
    vNormal = normalize(mat3(modelMatrix) * normal);
    gl_Position = projectionMatrix * viewMatrix * worldPos;
  }
`;

const coneFragment = /* glsl */ `
  uniform vec3 uColor;
  uniform float uIntensity;
  uniform float uTime;
  varying vec2 vUv;
  varying vec3 vWorldPos;
  varying vec3 vNormal;

  void main() {
    // long fade from the wide base up, dying out before the apex
    float vertical = smoothstep(0.0, 0.65, vUv.y) * (1.0 - smoothstep(0.6, 0.98, vUv.y));
    // fake volumetric depth: brightest looking through the beam core,
    // fading to nothing at the silhouette
    vec3 viewDir = normalize(cameraPosition - vWorldPos);
    float core = pow(abs(dot(normalize(vNormal), viewDir)), 2.0);
    float flicker = 0.92 + 0.08 * sin(uTime * 2.3 + vWorldPos.x * 4.0);
    float alpha = vertical * core * uIntensity * flicker;
    gl_FragColor = vec4(uColor, alpha);
  }
`;

export type SpotlightConeProps = {
  position: [number, number, number];
  color: string;
  swayOffset?: number;
  swayAmount?: number;
  intensity?: number;
};

export function SpotlightCone({
  position,
  color,
  swayOffset = 0,
  swayAmount = 0.18,
  intensity = 0.6,
}: SpotlightConeProps) {
  const groupRef = useRef<THREE.Group>(null);

  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: coneVertex,
        fragmentShader: coneFragment,
        uniforms: {
          uColor: { value: new THREE.Color(color) },
          uIntensity: { value: intensity },
          uTime: { value: 0 },
        },
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        side: THREE.DoubleSide,
      }),
    [color, intensity],
  );

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    material.uniforms.uTime.value = t;
    const group = groupRef.current;
    if (group) {
      group.rotation.z = Math.sin(t * 0.4 + swayOffset) * swayAmount;
      group.rotation.x = Math.cos(t * 0.3 + swayOffset) * swayAmount * 0.5;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      {/* cone apex at the light source, opening downwards */}
      <mesh position={[0, -4.5, 0]} material={material}>
        <coneGeometry args={[2.4, 9, 32, 1, true]} />
      </mesh>
      <pointLight color={color} intensity={3} distance={14} decay={2} />
    </group>
  );
}
