import { useState } from "react";

import { videos } from "../../data/portfolio";
import { useReveal } from "../../hooks/use-reveal";
import { videoSectionContent } from "./video-section.content";

export function useVideoSection() {
  const sectionRef = useReveal<HTMLElement>();

  const featured = videos.items.find((item) => item.id === videos.featuredId) ?? videos.items[0]!;
  const [activeId, setActiveId] = useState(featured.youtubeId);
  const [playing, setPlaying] = useState(false);

  const active = videos.items.find((item) => item.youtubeId === activeId) ?? featured;

  const selectVideo = (youtubeId: string) => {
    setActiveId(youtubeId);
    setPlaying(true);
  };

  const startPlaying = () => setPlaying(true);

  return {
    sectionRef,
    content: videoSectionContent,
    channelHref: videos.channelHref,
    items: videos.items,
    active,
    playing,
    selectVideo,
    startPlaying,
  };
}
