import { getPerfProfile, type PerfTier } from "../../lib/performance";

export type StageQuality = {
  tier: PerfTier;
  isMobile: boolean;
  dprMax: number;
  particleCount: number;
  pointerParallax: boolean;
  ribbonCount: number;
  ribbonSegments: [number, number];
  sphereSegments: number;
  antialias: boolean;
  glowOrbs: number;
};

const BY_TIER: Record<PerfTier, Omit<StageQuality, "tier" | "isMobile"> & { ribbonCount: number }> =
  {
    high: {
      dprMax: 2,
      particleCount: 480,
      pointerParallax: true,
      ribbonCount: 5,
      ribbonSegments: [48, 12],
      sphereSegments: 20,
      antialias: true,
      glowOrbs: 3,
    },
    mid: {
      dprMax: 1.5,
      particleCount: 260,
      pointerParallax: true,
      ribbonCount: 4,
      ribbonSegments: [32, 8],
      sphereSegments: 14,
      antialias: true,
      glowOrbs: 2,
    },
    low: {
      dprMax: 1.25,
      particleCount: 140,
      pointerParallax: false,
      ribbonCount: 3,
      ribbonSegments: [24, 6],
      sphereSegments: 10,
      antialias: false,
      glowOrbs: 2,
    },
  };

export function getStageQuality(): StageQuality {
  const profile = getPerfProfile();
  const base = BY_TIER[profile.tier];
  const isMobile = profile.isMobile;

  return {
    tier: profile.tier,
    isMobile,
    ...base,
    dprMax: isMobile ? Math.min(base.dprMax, 1.5) : base.dprMax,
    pointerParallax: base.pointerParallax && !isMobile,
    particleCount: isMobile ? Math.round(base.particleCount * 0.7) : base.particleCount,
  };
}
