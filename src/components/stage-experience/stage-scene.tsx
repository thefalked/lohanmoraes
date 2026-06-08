import { Preload } from "@react-three/drei";

import { HeroPortal } from "./hero-portal";
import { ParticleField } from "./particle-field";
import { PhotoCloud } from "./photo-cloud";
import { ScrollCamera } from "./scroll-camera";
import { StageLights } from "./stage-lights";
import type { StageScrollRefs } from "./stage-experience-scroll-context";
import { StageScrollProvider } from "./stage-experience-scroll-context";

type StageSceneProps = {
  scrollRefs: StageScrollRefs;
};

export function StageScene({ scrollRefs }: StageSceneProps) {
  return (
    <StageScrollProvider value={scrollRefs}>
      <ScrollCamera />
      <StageLights />
      <HeroPortal />
      <PhotoCloud />
      <ParticleField />
      <Preload all />
    </StageScrollProvider>
  );
}
