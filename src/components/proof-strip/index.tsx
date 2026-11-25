import { ProofStripView } from "./proof-strip.view";
import { useProofStrip } from "./use-proof-strip";

export function ProofStrip() {
  const strip = useProofStrip();
  return <ProofStripView {...strip} />;
}
