import { useEffect } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vite-plus/test";

import { showPackages } from "../../data/portfolio";
import { BookingProvider, useBooking } from "../../providers/booking-provider";
import { ShowCardView } from "./show-card.view";

function BookingOpenProbe({ onOpen }: { onOpen: (packageId: string | null) => void }) {
  const { isOpen, packageId } = useBooking();
  useEffect(() => {
    if (isOpen) {
      onOpen(packageId);
    }
  }, [isOpen, packageId, onOpen]);
  return null;
}

describe("ShowCardView", () => {
  it("renders show details and opens booking with package", async () => {
    const user = userEvent.setup();
    const show = showPackages[0]!;
    const onOpen = vi.fn();

    render(
      <BookingProvider>
        <BookingOpenProbe onOpen={onOpen} />
        <ShowCardView show={show} />
      </BookingProvider>,
    );

    expect(screen.getByRole("heading", { name: show.title })).toBeInTheDocument();
    expect(screen.getByText(show.forWhom)).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Solicitar orçamento" }));
    expect(onOpen).toHaveBeenCalledWith(show.id);
  });
});
