import { GuitarCamera } from "./guitar-camera";
import { GuitarHero } from "./guitar-hero";
import { GuitarSpiral } from "./guitar-spiral";
import type { GuitarScrollRefs } from "./guitar-chords-scroll-context";
import { GuitarScrollProvider } from "./guitar-chords-scroll-context";

type GuitarChordsSceneProps = {
  scrollRefs: GuitarScrollRefs;
};

export function GuitarChordsScene({ scrollRefs }: GuitarChordsSceneProps) {
  return (
    <GuitarScrollProvider value={scrollRefs}>
      <ambientLight intensity={0.12} />
      <pointLight position={[0.6, 1.2, 1.4]} intensity={0.35} color="#e022b7" />
      <pointLight position={[-0.5, -0.8, 1.2]} intensity={0.25} color="#22d3ee" />

      <GuitarSpiral />
      <GuitarHero />
      <GuitarCamera />
    </GuitarScrollProvider>
  );
}
