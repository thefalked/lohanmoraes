import { GuitarChordsView } from "./guitar-chords.view";
import { useGuitarChords } from "./use-guitar-chords";

export function GuitarChordsExperience() {
  const props = useGuitarChords();
  return <GuitarChordsView {...props} />;
}
