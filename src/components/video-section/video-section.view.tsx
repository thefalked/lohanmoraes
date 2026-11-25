import { tv } from "tailwind-variants";

import { SplitHeading } from "../split-heading";
import type { useVideoSection } from "./use-video-section";

const videoSection = tv({
  slots: {
    root: "relative scroll-mt-20 border-t border-border px-5 py-24 lg:px-10 lg:py-32",
    inner: "mx-auto max-w-content",
    intro: "mb-10 max-w-2xl",
    sub: "mt-4 text-body-lg text-text",
    playerWrap: [
      "relative overflow-hidden rounded-stage border border-border bg-surface-elevated/80",
      "shadow-stage-card aspect-video",
    ],
    iframe: "h-full w-full",
    poster: [
      "group absolute inset-0 flex cursor-pointer items-center justify-center",
      "border-0 bg-transparent p-0 text-left",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-inset",
    ],
    posterImg: "absolute inset-0 h-full w-full object-cover",
    playBtn: [
      "relative z-10 inline-flex items-center justify-center rounded-stage-sm px-8 py-4",
      "bg-accent font-display text-body-sm font-semibold uppercase tracking-wide text-surface",
      "shadow-stage-card transition-all group-hover:bg-accent-muted",
    ],
    thumbs: "mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5",
    thumb: [
      "group relative overflow-hidden rounded-stage-sm border border-border text-left",
      "transition-colors hover:border-accent",
    ],
    thumbActive: "border-accent shadow-[0_0_0_1px_rgb(224_34_183/0.35)]",
    thumbImg:
      "aspect-video w-full object-cover opacity-80 transition-opacity group-hover:opacity-100",
    thumbLabel: [
      "absolute inset-x-0 bottom-0 bg-linear-to-t from-surface/90 to-transparent px-2 pb-2 pt-6",
      "font-display text-[0.65rem] uppercase tracking-wide text-text-bright",
    ],
    channel: "mt-6 inline-flex font-display text-body-sm uppercase tracking-widest text-accent",
  },
});

export type VideoSectionViewProps = ReturnType<typeof useVideoSection>;

export function VideoSectionView({
  sectionRef,
  content,
  channelHref,
  items,
  active,
  playing,
  selectVideo,
  startPlaying,
}: VideoSectionViewProps) {
  const styles = videoSection();
  const posterSrc = `https://i.ytimg.com/vi/${active.youtubeId}/hqdefault.jpg`;
  const embedSrc = `https://www.youtube-nocookie.com/embed/${active.youtubeId}?autoplay=1&rel=0`;

  return (
    <section
      id="ao-vivo"
      ref={sectionRef}
      className={styles.root()}
      aria-labelledby="ao-vivo-heading"
    >
      <div className={styles.inner()}>
        <div className={styles.intro()}>
          <SplitHeading lines={[...content.headingLines]} accentIndex={0} />
          <h2 id="ao-vivo-heading" className="sr-only">
            {content.srHeading}
          </h2>
          <p data-reveal className={styles.sub()}>
            {content.intro}
          </p>
        </div>
        <div data-reveal className={styles.playerWrap()}>
          {playing ? (
            <iframe
              className={styles.iframe()}
              src={embedSrc}
              title={active.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <button
              type="button"
              className={styles.poster()}
              onClick={startPlaying}
              aria-label={content.playLabel}
            >
              <img src={posterSrc} alt="" className={styles.posterImg()} loading="lazy" />
              <span className={styles.playBtn()}>{content.playLabel}</span>
            </button>
          )}
        </div>
        <div className={styles.thumbs()}>
          {items.map((item) => (
            <button
              key={item.id}
              type="button"
              data-reveal
              className={styles.thumb({
                className: item.youtubeId === active.youtubeId ? styles.thumbActive() : "",
              })}
              onClick={() => selectVideo(item.youtubeId)}
            >
              <img
                src={`https://i.ytimg.com/vi/${item.youtubeId}/mqdefault.jpg`}
                alt={item.title}
                className={styles.thumbImg()}
                loading="lazy"
              />
              <span className={styles.thumbLabel()}>{item.title}</span>
            </button>
          ))}
        </div>
        <a
          data-reveal
          href={channelHref}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.channel()}
        >
          {content.channelLabel}
        </a>
      </div>
    </section>
  );
}
