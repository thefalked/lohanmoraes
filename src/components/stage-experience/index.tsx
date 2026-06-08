import { StageExperienceView } from "./stage-experience.view";
import { useStageExperience } from "./use-stage-experience";

export function StageExperience() {
  const stage = useStageExperience();
  return <StageExperienceView {...stage} />;
}
