import { proofCredits } from "../../data/portfolio";
import { proofStripContent } from "./proof-strip.content";

export function useProofStrip() {
  return {
    credits: proofCredits,
    content: proofStripContent,
  };
}
