import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vite-plus/test";

import { GuitarChordsExperience } from "./index";

vi.mock("../../lib/motion", () => ({
  isMotionEnabled: () => false,
  ScrollTrigger: { create: vi.fn() },
  gsap: {},
}));

describe("GuitarChordsExperience", () => {
  it("does not render the guitar story when motion is disabled", () => {
    render(<GuitarChordsExperience />);

    expect(screen.queryByTestId("guitar-chords-root")).not.toBeInTheDocument();
    expect(screen.queryByTestId("guitar-chords-canvas")).not.toBeInTheDocument();
  });
});
