import { tv } from "tailwind-variants";

import { SplitHeading } from "../split-heading";
import type { useAboutSection } from "./use-about-section";

const aboutSection = tv({
  slots: {
    root: "relative scroll-mt-20 px-5 py-24 lg:px-10 lg:py-32",
    inner: "mx-auto grid max-w-content gap-12 lg:grid-cols-2 lg:gap-16",
    copy: "stage-panel flex flex-col gap-6 p-7 lg:p-10",
    body: "text-body-lg text-text",
    gallery: "grid grid-cols-2 gap-4",
    photoMain: [
      "col-span-2 overflow-hidden rounded-stage border border-border shadow-stage-card",
      "rotate-[-1deg] transition-transform duration-500 hover:rotate-0",
    ],
    photo: [
      "overflow-hidden rounded-stage-sm border border-border aspect-4/5 object-cover",
      "transition-transform duration-500 odd:rotate-[1.2deg] even:rotate-[-1.2deg] hover:rotate-0",
    ],
    img: "h-full w-full object-cover",
    // oversized + recentered so the parallax travel never exposes the container edges
    imgParallax: "h-full w-full scale-118 object-cover",
  },
});

export type AboutSectionViewProps = ReturnType<typeof useAboutSection>;

export function AboutSectionView({
  sectionRef,
  parallaxRef,
  bio,
  headingLines,
  srHeading,
}: AboutSectionViewProps) {
  const styles = aboutSection();
  const [mainPhoto, ...galleryPhotos] = bio.photos;

  return (
    <section id="sobre" ref={sectionRef} className={styles.root()} aria-labelledby="sobre-heading">
      <div className={styles.inner()}>
        <div className={styles.copy()}>
          <SplitHeading lines={[...headingLines]} accentIndex={0} className="mb-2" />
          <h2 id="sobre-heading" className="sr-only">
            {srHeading}
          </h2>
          {bio.paragraphs.map((paragraph, index) => (
            <p key={index} data-reveal className={styles.body()}>
              {paragraph}
            </p>
          ))}
        </div>
        <div className={styles.gallery()}>
          {mainPhoto ? (
            <div data-reveal className={styles.photoMain()}>
              <img
                ref={parallaxRef}
                src={mainPhoto.src}
                alt={mainPhoto.alt}
                className={styles.imgParallax()}
                loading="lazy"
              />
            </div>
          ) : null}
          {galleryPhotos.map((photo) => (
            <div key={photo.src} data-reveal className={styles.photo()}>
              <img src={photo.src} alt={photo.alt} className={styles.img()} loading="lazy" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
