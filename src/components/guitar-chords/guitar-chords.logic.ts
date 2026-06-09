import { planeDimensions } from "../stage-experience/stage-experience.logic";
import { guitarChapters, guitarPhotoAsset, guitarSectionLabels } from "./guitar-chords.content";

export const GUITAR_CHAPTER_COUNT = guitarChapters.length;
export const GUITAR_VH_PER_CHAPTER = 115;
export const GUITAR_PIN_SCROLL_VH = GUITAR_CHAPTER_COUNT * GUITAR_VH_PER_CHAPTER;

export type CameraTarget = {
  position: { x: number; y: number; z: number };
  lookAt: { x: number; y: number; z: number };
  fov: number;
};

export function clamp01(value: number): number {
  return Math.min(1, Math.max(0, value));
}

export function guitarPlaneSize(): { width: number; height: number } {
  return planeDimensions(
    guitarPhotoAsset.nativeWidth,
    guitarPhotoAsset.nativeHeight,
    guitarPhotoAsset.sceneHeight,
  );
}

export function guitarPlaneContentTopY(): number {
  const { height } = guitarPlaneSize();
  const halfHeight = height / 2;
  return halfHeight - guitarPhotoAsset.contentTop * height;
}

export function guitarPlaneContentBottomY(): number {
  const { height } = guitarPlaneSize();
  const halfHeight = height / 2;
  return halfHeight - guitarPhotoAsset.contentBottom * height;
}

export function guitarBodyFocusY(): number {
  const { height } = guitarPlaneSize();
  const halfHeight = height / 2;
  const focusFromTop =
    guitarPhotoAsset.contentTop +
    (guitarPhotoAsset.contentBottom - guitarPhotoAsset.contentTop) *
    guitarPhotoAsset.bodyFocusRatio;
  return halfHeight - focusFromTop * height;
}

export function guitarPlaneOffsetY(): number {
  return -guitarBodyFocusY();
}

export function guitarSpiralBounds(): {
  height: number;
  radiusX: number;
  radiusZ: number;
  yCenter: number;
} {
  const { width, height } = guitarPlaneSize();
  const contentHeight = height * (guitarPhotoAsset.contentBottom - guitarPhotoAsset.contentTop);
  const bodyHeight = contentHeight * 0.55;
  const bodyWidth = width * 0.61;

  return {
    height: bodyHeight,
    radiusX: bodyWidth * 0.54,
    radiusZ: bodyWidth * 0.16,
    yCenter: guitarPlaneOffsetY(),
  };
}

export function spiralPoint(
  t: number,
  height: number,
  radiusX: number,
  radiusZ: number,
  turns: number,
  yCenter = 0,
): { x: number; y: number; z: number; angle: number } {
  const clamped = clamp01(t);
  const angle = clamped * turns * Math.PI * 2;
  return {
    x: Math.cos(angle) * radiusX,
    y: yCenter + height / 2 - clamped * height,
    z: Math.sin(angle) * radiusZ,
    angle,
  };
}

export function chapterIndex(progress: number, count = GUITAR_CHAPTER_COUNT): number {
  const p = clamp01(progress);
  if (p >= 1) {
    return count - 1;
  }
  return Math.min(count - 1, Math.floor(p * count));
}

export function chapterOpacity(
  progress: number,
  index: number,
  count = GUITAR_CHAPTER_COUNT,
): number {
  const p = clamp01(progress);
  const center = (index + 0.5) / count;
  const halfWidth = 0.62 / count;
  const distance = Math.abs(p - center);
  const fade = 1 - distance / halfWidth;
  return clamp01(fade);
}

export function chapterScrollProgress(chapter: number, count = GUITAR_CHAPTER_COUNT): number {
  return (chapter + 0.5) / count;
}

export function chapterSnapProgress(progress: number, count = GUITAR_CHAPTER_COUNT): number {
  const p = clamp01(progress);
  if (count <= 1) {
    return 0;
  }
  const index = Math.min(count - 1, Math.max(0, Math.round(p * count - 0.5)));
  return chapterScrollProgress(index, count);
}

export function shouldSnapExperienceProgress(progress: number, snapped: number): boolean {
  if (progress > snapped + 0.004) {
    return false;
  }
  return Math.abs(snapped - progress) >= 0.004;
}

export function chapterSectionLabel(index: number): string {
  for (let i = index; i >= 0; i -= 1) {
    const navId = guitarChapters[i]?.navId;
    if (navId && guitarSectionLabels[navId]) {
      return guitarSectionLabels[navId];
    }
  }
  return "Intro";
}

export function scrollProgressPercent(index: number, count = GUITAR_CHAPTER_COUNT): number {
  return ((index + 1) / count) * 100;
}

export type PanelSide = "left" | "right";

export function chapterPanelSide(chapterIndex: number): PanelSide {
  return chapterIndex % 2 === 0 ? "left" : "right";
}

export function experienceScrollProgress(
  wrapTop: number,
  wrapHeight: number,
  viewportHeight: number,
): number {
  const scrollable = Math.max(1, wrapHeight - viewportHeight);
  return clamp01(-wrapTop / scrollable);
}

export function experienceScrollY(
  progress: number,
  wrapOffsetTop: number,
  wrapHeight: number,
  viewportHeight: number,
): number {
  const scrollable = Math.max(1, wrapHeight - viewportHeight);
  return wrapOffsetTop + clamp01(progress) * scrollable;
}

export function chapterSectionTop(chapterIndex: number): string {
  return `${chapterIndex * GUITAR_VH_PER_CHAPTER}vh`;
}

export function chapterRevealProgress(
  progress: number,
  index: number,
  count = GUITAR_CHAPTER_COUNT,
): number {
  const center = chapterScrollProgress(index, count);
  const chapterSpan = 1 / count;
  const hold = chapterSpan * 0.72;
  const fade = chapterSpan * 0.28;
  const distance = Math.abs(clamp01(progress) - center);
  if (distance <= hold / 2) {
    return 1;
  }
  const reveal = 1 - (distance - hold / 2) / fade;
  return clamp01(reveal);
}

const CAMERA_Z = 1.52;
const CAMERA_FOV = 30;
const CAMERA_FRUSTUM_MARGIN = 0.02;

function cameraVisibleHalfHeight(): number {
  return CAMERA_Z * Math.tan((CAMERA_FOV * Math.PI) / 360);
}

export function cameraPosition(progress: number): CameraTarget {
  const t = clamp01(progress);
  const offsetY = guitarPlaneOffsetY();
  const visibleHalf = cameraVisibleHalfHeight();
  const headstockY = offsetY + guitarPlaneContentTopY();
  const bottomY = offsetY + guitarPlaneContentBottomY();
  const startY = headstockY - visibleHalf + CAMERA_FRUSTUM_MARGIN;
  const endY = bottomY + visibleHalf - CAMERA_FRUSTUM_MARGIN;
  const cameraY = startY + t * (endY - startY);
  const lookY = cameraY - 0.08;

  return {
    position: {
      x: 0,
      y: cameraY,
      z: CAMERA_Z,
    },
    lookAt: {
      x: 0,
      y: lookY,
      z: 0,
    },
    fov: CAMERA_FOV,
  };
}

export function shouldRenderGuitarChords(motionEnabled: boolean): boolean {
  return motionEnabled;
}

export function pinScrollHeight(): string {
  return `${GUITAR_PIN_SCROLL_VH}vh`;
}

export function guitarParticleCount(viewportWidth: number): number {
  if (viewportWidth < 640) {
    return 48;
  }
  if (viewportWidth < 1024) {
    return 72;
  }
  return 96;
}

export type ScatteredMusicParticle = {
  symbol: string;
  x: number;
  y: number;
  size: number;
  opacity: number;
  delay: number;
};

export type AnimatedMusicParticle = ScatteredMusicParticle & {
  vx: number;
  vy: number;
  baseVx: number;
  baseVy: number;
  wobble: number;
  wobbleSpeed: number;
  rotation: number;
};

export type MusicPointerField = {
  x: number;
  y: number;
  active: number;
};

export function scatterMusicParticles(count: number): ScatteredMusicParticle[] {
  const symbols = ["♪", "♫", "♬", "♩"] as const;
  let seed = 9137;

  const rand = () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };

  const particles: ScatteredMusicParticle[] = [];

  for (let index = 0; index < count; index += 1) {
    const x = 0.05 + rand() * 0.9;
    const y = 0.05 + rand() * 0.9;

    particles.push({
      symbol: symbols[index % symbols.length] ?? "♪",
      x,
      y,
      size: 0.9 + rand() * 0.75,
      opacity: 0.22 + rand() * 0.16,
      delay: rand() * 5,
    });
  }

  return particles;
}

export function createAnimatedMusicParticles(count: number): AnimatedMusicParticle[] {
  let seed = 4211;

  const rand = () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };

  return scatterMusicParticles(count).map((particle, index) => {
    const angle = rand() * Math.PI * 2;
    const speed = 0.000028 + rand() * 0.00004;

    return {
      ...particle,
      vx: 0,
      vy: 0,
      baseVx: Math.cos(angle) * speed,
      baseVy: Math.sin(angle) * speed,
      wobble: rand() * Math.PI * 2,
      wobbleSpeed: 0.6 + rand() * 1.1,
      rotation: (index % 5) - 2,
    };
  });
}

export function stepMusicParticle(
  particle: AnimatedMusicParticle,
  pointer: MusicPointerField,
  deltaSeconds: number,
): void {
  const dt = deltaSeconds * 60;
  const dx = particle.x - pointer.x;
  const dy = particle.y - pointer.y;
  const dist = Math.hypot(dx, dy);
  const radius = 0.18;

  if (pointer.active > 0 && dist < radius && dist > 0.0001) {
    const push = ((radius - dist) / radius) * 0.0024 * pointer.active;
    particle.vx += (dx / dist) * push;
    particle.vy += (dy / dist) * push;
  }

  particle.vx = (particle.vx + particle.baseVx * dt) * 0.985;
  particle.vy = (particle.vy + particle.baseVy * dt) * 0.985;
  particle.x += particle.vx * dt;
  particle.y += particle.vy * dt;

  if (particle.x < -0.05) {
    particle.x = 1.05;
  } else if (particle.x > 1.05) {
    particle.x = -0.05;
  }

  if (particle.y < -0.05) {
    particle.y = 1.05;
  } else if (particle.y > 1.05) {
    particle.y = -0.05;
  }

  particle.wobble += particle.wobbleSpeed * deltaSeconds;
  particle.rotation = Math.sin(particle.wobble) * 10;
}

export function domMusicParticleCount(viewportWidth: number): number {
  if (viewportWidth < 640) {
    return 22;
  }
  if (viewportWidth < 1024) {
    return 32;
  }
  return 42;
}

export type GuitarStorySection = {
  id: string;
  label: string;
  startIndex: number;
  endIndex: number;
};

export function guitarStorySections(): GuitarStorySection[] {
  const sections: GuitarStorySection[] = [
    { id: "intro", label: "Intro", startIndex: 0, endIndex: 0 },
  ];

  let current: GuitarStorySection | null = null;
  for (let i = 0; i < guitarChapters.length; i += 1) {
    const chapter = guitarChapters[i];
    if (chapter?.navId) {
      current = {
        id: chapter.navId,
        label: guitarSectionLabels[chapter.navId] ?? chapter.navId,
        startIndex: i,
        endIndex: i,
      };
      sections.push(current);
    } else if (current) {
      current.endIndex = i;
    }
  }

  return sections;
}

export function activeStorySection(
  index: number,
  sections = guitarStorySections(),
): GuitarStorySection {
  return (
    sections.find((section) => index >= section.startIndex && index <= section.endIndex) ??
    sections[0] ?? { id: "intro", label: "Intro", startIndex: 0, endIndex: 0 }
  );
}
