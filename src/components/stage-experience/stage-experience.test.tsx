import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vite-plus/test";

import { StageExperience } from "./index";

vi.mock("../../lib/motion", () => ({
  isMotionEnabled: () => false,
  ScrollTrigger: { create: vi.fn() },
}));

describe("StageExperience", () => {
  it("does not render the canvas when motion is disabled", () => {
    render(<StageExperience />);

    expect(screen.queryByTestId("stage-experience-root")).not.toBeInTheDocument();
    expect(screen.queryByTestId("stage-experience-canvas")).not.toBeInTheDocument();
  });
});
