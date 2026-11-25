import { VideoSectionView } from "./video-section.view";
import { useVideoSection } from "./use-video-section";

export function VideoSection() {
  const video = useVideoSection();
  return <VideoSectionView {...video} />;
}
