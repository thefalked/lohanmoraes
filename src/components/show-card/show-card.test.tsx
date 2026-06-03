import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vite-plus/test";

import { showPackages } from "../../data/portfolio";
import { ShowCardView } from "./show-card.view";

describe("ShowCardView", () => {
  it("renders show details and whatsapp cta", () => {
    const show = showPackages[0]!;
    render(<ShowCardView show={show} />);

    expect(screen.getByRole("heading", { name: show.title })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Solicitar orçamento" })).toHaveAttribute(
      "href",
      expect.stringContaining("wa.me"),
    );
  });
});
