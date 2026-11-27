export type PerfTier = "high" | "mid" | "low";

export type PerfProfile = {
  tier: PerfTier;
  isMobile: boolean;
  refreshHint: number;
  lenis: {
    duration: number;
    wheelMultiplier: number;
    touchMultiplier: number;
    syncTouch: boolean;
  };
  reveal: {
    y: number;
    duration: number;
    stagger: number;
  };
  grainBlend: boolean;
  heavyBlur: boolean;
};

function readDeviceMemory(): number {
  const nav = navigator as Navigator & { deviceMemory?: number };
  return nav.deviceMemory ?? 8;
}

function readConcurrency(): number {
  return navigator.hardwareConcurrency || 4;
}

function readSaveData(): boolean {
  const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
  return Boolean(conn?.saveData);
}

function readRefreshHint(): number {
  const rate = (window as Window & { screen?: Screen & { refreshRate?: number } }).screen
    ?.refreshRate;
  if (typeof rate === "number" && rate >= 90) {
    return rate;
  }
  return 60;
}

export function detectPerfProfile(): PerfProfile {
  const coarse = window.matchMedia("(pointer: coarse)").matches;
  const narrow = window.innerWidth < 768;
  const isMobile = coarse || narrow;
  const memory = readDeviceMemory();
  const cores = readConcurrency();
  const saveData = readSaveData();
  const refreshHint = readRefreshHint();

  let tier: PerfTier = "high";
  if (saveData || memory <= 2 || cores <= 4 || (isMobile && memory <= 4)) {
    tier = "low";
  } else if (isMobile || memory <= 4 || cores <= 6) {
    tier = "mid";
  }

  if (tier === "high" && refreshHint >= 90) {
    return {
      tier,
      isMobile,
      refreshHint,
      lenis: {
        duration: 0.95,
        wheelMultiplier: 1,
        touchMultiplier: 1.35,
        syncTouch: false,
      },
      reveal: { y: 20, duration: 0.7, stagger: 0.06 },
      grainBlend: true,
      heavyBlur: true,
    };
  }

  if (tier === "mid") {
    return {
      tier,
      isMobile,
      refreshHint,
      lenis: {
        duration: isMobile ? 0.9 : 1.05,
        wheelMultiplier: 1,
        touchMultiplier: 1.25,
        syncTouch: false,
      },
      reveal: { y: 18, duration: 0.65, stagger: 0.05 },
      grainBlend: true,
      heavyBlur: !isMobile,
    };
  }

  if (tier === "low") {
    return {
      tier,
      isMobile,
      refreshHint,
      lenis: {
        duration: 0.8,
        wheelMultiplier: 0.9,
        touchMultiplier: 1.15,
        syncTouch: false,
      },
      reveal: { y: 14, duration: 0.5, stagger: 0.04 },
      grainBlend: false,
      heavyBlur: false,
    };
  }

  return {
    tier: "high",
    isMobile,
    refreshHint,
    lenis: {
      duration: 1.1,
      wheelMultiplier: 1,
      touchMultiplier: 1.4,
      syncTouch: false,
    },
    reveal: { y: 20, duration: 0.7, stagger: 0.06 },
    grainBlend: true,
    heavyBlur: true,
  };
}

export function applyPerfProfile(profile: PerfProfile): void {
  const root = document.documentElement;
  root.dataset.perf = profile.tier;
  root.dataset.perfMobile = profile.isMobile ? "1" : "0";
  root.style.setProperty("--perf-refresh", String(profile.refreshHint));
}

let cached: PerfProfile | null = null;

export function getPerfProfile(): PerfProfile {
  if (cached) {
    return cached;
  }
  if (typeof window === "undefined") {
    return {
      tier: "high",
      isMobile: false,
      refreshHint: 60,
      lenis: {
        duration: 1.1,
        wheelMultiplier: 1,
        touchMultiplier: 1.4,
        syncTouch: false,
      },
      reveal: { y: 20, duration: 0.7, stagger: 0.06 },
      grainBlend: true,
      heavyBlur: true,
    };
  }
  cached = detectPerfProfile();
  return cached;
}

export function initPerfProfile(): PerfProfile {
  const profile = getPerfProfile();
  applyPerfProfile(profile);
  return profile;
}
