import { useEffect, useRef, useState } from "react";

import { isMotionEnabled } from "../../lib/motion";
import { useLenis } from "../../providers/scroll-provider";
import { lerpPhase } from "../stage-experience/stage-experience.logic";
import {
  chapterIndex,
  chapterSnapProgress,
  experienceScrollProgress,
  experienceScrollY,
  GUITAR_CHAPTER_COUNT,
  shouldRenderGuitarChords,
  shouldSnapExperienceProgress,
} from "./guitar-chords.logic";
import { defaultGuitarPointer } from "./guitar-chords-scroll-context";

const SNAP_DELAY_MS = 420;
const SNAP_DURATION = 1;

export function useGuitarChords() {
  const enabled = shouldRenderGuitarChords(isMotionEnabled());
  const lenis = useLenis();
  const progressRef = useRef(0);
  const smoothRef = useRef(0);
  const activeChapterRef = useRef(0);
  const pointerRef = useRef(defaultGuitarPointer());
  const contentRef = useRef<HTMLDivElement>(null);
  const snapLockRef = useRef(false);
  const [activeChapter, setActiveChapter] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    if (!enabled) {
      return undefined;
    }

    let frame = 0;
    const tick = () => {
      smoothRef.current = lerpPhase(smoothRef.current, progressRef.current, 0.06);
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
    };
  }, [enabled]);

  useEffect(() => {
    if (!enabled || !lenis) {
      return undefined;
    }

    const wrap = contentRef.current;
    if (!wrap) {
      return undefined;
    }

    const viewportHeight = () => window.innerHeight;

    const measure = () => {
      const rect = wrap.getBoundingClientRect();
      const progress = experienceScrollProgress(rect.top, wrap.offsetHeight, viewportHeight());
      progressRef.current = progress;
      setScrollProgress(progress);
      const next = chapterIndex(progress, GUITAR_CHAPTER_COUNT);
      activeChapterRef.current = next;
      setActiveChapter(next);
    };

    let snapTimer = 0;

    const snapToChapter = () => {
      if (snapLockRef.current) {
        return;
      }

      const rect = wrap.getBoundingClientRect();
      if (rect.bottom <= 0 || rect.top >= viewportHeight()) {
        return;
      }

      const progress = experienceScrollProgress(rect.top, wrap.offsetHeight, viewportHeight());
      const snapped = chapterSnapProgress(progress, GUITAR_CHAPTER_COUNT);
      if (!shouldSnapExperienceProgress(progress, snapped)) {
        return;
      }

      const wrapOffsetTop = rect.top + lenis.scroll;
      const targetY = experienceScrollY(
        snapped,
        wrapOffsetTop,
        wrap.offsetHeight,
        viewportHeight(),
      );

      snapLockRef.current = true;
      lenis.scrollTo(targetY, {
        duration: SNAP_DURATION,
        onComplete: () => {
          snapLockRef.current = false;
          measure();
        },
      });
    };

    const onScroll = () => {
      measure();
      window.clearTimeout(snapTimer);
      snapTimer = window.setTimeout(snapToChapter, SNAP_DELAY_MS);
    };

    measure();
    lenis.on("scroll", onScroll);

    const onPointerMove = (event: PointerEvent) => {
      pointerRef.current = {
        x: event.clientX,
        y: event.clientY,
        uvX: event.clientX / window.innerWidth,
        uvY: event.clientY / window.innerHeight,
        active: 1,
      };
    };

    const onPointerLeave = () => {
      pointerRef.current.active = 0;
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerleave", onPointerLeave);

    const onResize = () => {
      measure();
      lenis.resize();
    };
    window.addEventListener("resize", onResize);

    return () => {
      lenis.off("scroll", onScroll);
      window.clearTimeout(snapTimer);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerleave", onPointerLeave);
    };
  }, [enabled, lenis]);

  return {
    enabled,
    progressRef,
    smoothRef,
    activeChapterRef,
    pointerRef,
    activeChapter,
    scrollProgress,
    contentRef,
  };
}
