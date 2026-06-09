import type { Texture } from "three";

const STAGE_DPR_MAX = 1.75;
const STAGE_DPR_MOBILE_MAX = 1.25;
const STAGE_DPR_MIN = 1;
const PARTICLE_COUNT_DESKTOP = 640;
const PARTICLE_COUNT_MOBILE = 192;
const MOBILE_BREAKPOINT = 768;

export function planeDimensions(
  width: number,
  height: number,
  maxSize: number,
): { width: number; height: number } {
  if (width <= 0 || height <= 0) {
    return { width: maxSize, height: maxSize };
  }
  const scale = Math.min(maxSize / width, maxSize / height);
  return { width: width * scale, height: height * scale };
}

export function textureImageSize(texture: Texture): { width: number; height: number } {
  const image = texture.image as {
    naturalWidth?: number;
    naturalHeight?: number;
    width?: number;
    height?: number;
  } | null;
  if (!image) {
    return { width: 1, height: 1 };
  }
  const width = image.naturalWidth ?? image.width ?? 1;
  const height = image.naturalHeight ?? image.height ?? 1;
  return { width, height };
}

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
