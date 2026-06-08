import { tv } from "tailwind-variants";

import { SplitHeading } from "../split-heading";
import type { useAboutSection } from "./use-about-section";

const aboutSection = tv({
  slots: {
    root: "scroll-mt-20 px-5 py-24 lg:px-10 lg:py-32",
    inner: "mx-auto grid max-w-content gap-12 lg:grid-cols-2 lg:gap-16",
    copy: ["flex flex-col gap-6", "rounded-stage bg-surface/45 p-6 backdrop-blur-sm"],
    body: "text-body-lg text-text-muted",
    gallery: "grid grid-cols-2 gap-4",
    photoMain: "col-span-2 overflow-hidden rounded-stage",
    photo: "overflow-hidden rounded-stage-sm aspect-4/5 object-cover",
    img: "h-full w-full object-cover",
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
                className={styles.img()}
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
