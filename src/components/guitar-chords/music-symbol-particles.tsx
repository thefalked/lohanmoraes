import { useEffect, useMemo, useRef } from "react";
import { tv } from "tailwind-variants";

import { isMotionEnabled } from "../../lib/motion";
import type { GuitarPointer } from "./guitar-chords-scroll-context";
import {
  createAnimatedMusicParticles,
  domMusicParticleCount,
  stepMusicParticle,
} from "./guitar-chords.logic";

const musicParticles = tv({
  slots: {
    layer: "pointer-events-none absolute inset-0 z-0 overflow-hidden",
    glyph:
      "absolute left-0 top-0 origin-center font-serif leading-none select-none will-change-transform text-accent drop-shadow-[0_0_10px_rgb(224_34_183_/_0.28)]",
  },
});

type MusicSymbolParticlesProps = {
  pointerRef: { current: GuitarPointer };
};

export function MusicSymbolParticles({ pointerRef }: MusicSymbolParticlesProps) {
  const motionEnabled = isMotionEnabled();
  const count = useMemo(
    () => (typeof window !== "undefined" ? domMusicParticleCount(window.innerWidth) : 32),
    [],
  );
  const particles = useMemo(() => createAnimatedMusicParticles(count), [count]);
  const styles = musicParticles();
  const particlesRef = useRef(particles);
  const nodesRef = useRef<(HTMLSpanElement | null)[]>([]);
  const smoothPointerRef = useRef({ x: 0.5, y: 0.5, active: 0 });

  particlesRef.current = particles;

  useEffect(() => {
    if (!motionEnabled) {
      return undefined;
    }

    let frame = 0;
    let lastTime = performance.now();

    const tick = (time: number) => {
      const deltaSeconds = Math.min(0.05, (time - lastTime) / 1000);
      lastTime = time;

      const target = pointerRef.current;
      const smooth = smoothPointerRef.current;
      smooth.x += (target.uvX - smooth.x) * 0.14;
      smooth.y += (target.uvY - smooth.y) * 0.14;
      smooth.active += (target.active - smooth.active) * 0.18;

      const pointer = {
        x: smooth.x,
        y: smooth.y,
        active: smooth.active,
      };

      particlesRef.current.forEach((particle, index) => {
        stepMusicParticle(particle, pointer, deltaSeconds);
        const node = nodesRef.current[index];
        if (!node) {
          return;
        }
        node.style.transform = `translate3d(calc(${particle.x * 100}vw - 50%), calc(${particle.y * 100}vh - 50%), 0) rotate(${particle.rotation}deg)`;
      });

      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [motionEnabled, pointerRef]);

  return (
    <div className={styles.layer()} aria-hidden="true" data-testid="music-symbol-particles">
      {particles.map((particle, index) => (
        <span
          key={`${particle.symbol}-${index}`}
          ref={(node) => {
            nodesRef.current[index] = node;
          }}
          className={styles.glyph()}
          style={{
            fontSize: `${particle.size}rem`,
            opacity: particle.opacity,
            transform: motionEnabled
              ? undefined
              : `translate3d(calc(${particle.x * 100}vw - 50%), calc(${particle.y * 100}vh - 50%), 0)`,
          }}
        >
          {particle.symbol}
        </span>
      ))}
    </div>
  );
}
