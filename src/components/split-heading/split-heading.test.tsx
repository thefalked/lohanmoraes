import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vite-plus/test";

import { SplitHeadingView } from "./split-heading.view";

describe("SplitHeadingView", () => {
  it("renders all lines", () => {
    render(<SplitHeadingView lines={["Shows", "Formatos"]} accentIndex={0} />);
    expect(screen.getByText("Shows")).toBeInTheDocument();
    expect(screen.getByText("Formatos")).toBeInTheDocument();
  });
});
