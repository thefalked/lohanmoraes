export type StageQuality = {
  isMobile: boolean;
  dprMax: number;
  particleCount: number;
  bloom: boolean;
  pointerParallax: boolean;
};

export function getStageQuality(): StageQuality {
  const coarse = typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches;
  const narrow = typeof window !== "undefined" && window.innerWidth < 768;
  const isMobile = coarse || narrow;

  return {
    isMobile,
    dprMax: isMobile ? 1.5 : 2,
    particleCount: isMobile ? 350 : 1100,
    bloom: !isMobile,
    pointerParallax: !isMobile,
  };
}
