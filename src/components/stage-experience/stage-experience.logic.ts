export const STAGE_DPR_MAX = 1.75;
export const STAGE_DPR_MOBILE_MAX = 1.25;
export const STAGE_DPR_MIN = 1;
export const PARTICLE_COUNT_DESKTOP = 640;
export const PARTICLE_COUNT_MOBILE = 192;
export const MOBILE_BREAKPOINT = 768;

export type SectionPhase = "hero" | "orbit" | "depth" | "finale";

export function getCanvasDpr(devicePixelRatio: number, viewportWidth: number): number {
  const cap = viewportWidth < MOBILE_BREAKPOINT ? STAGE_DPR_MOBILE_MAX : STAGE_DPR_MAX;
  return Math.min(Math.max(devicePixelRatio, STAGE_DPR_MIN), cap);
}

export function sectionPhase(progress: number): SectionPhase {
  const p = clamp01(progress);
  if (p < 0.22) return "hero";
  if (p < 0.55) return "orbit";
  if (p < 0.82) return "depth";
  return "finale";
}

export function lerpPhase(current: number, target: number, alpha: number): number {
  return current + (target - current) * alpha;
}

export function shouldRenderStageExperience(motionEnabled: boolean): boolean {
  return motionEnabled;
}

export function particleCountForViewport(viewportWidth: number): number {
  return viewportWidth < MOBILE_BREAKPOINT ? PARTICLE_COUNT_MOBILE : PARTICLE_COUNT_DESKTOP;
}

function clamp01(value: number): number {
  return Math.min(1, Math.max(0, value));
}
