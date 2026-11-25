import { createRootRoute, Outlet } from "@tanstack/react-router";

import { BookingSheet } from "../components/booking-sheet";
import { GrainOverlay } from "../components/grain-overlay";
import { SiteFooter } from "../components/site-footer";
import { SiteHeader } from "../components/site-header";
import { StageCanvas } from "../components/stage-canvas";
import { BookingProvider } from "../providers/booking-provider";
import { ScrollProvider } from "../providers/scroll-provider";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <ScrollProvider>
      <BookingProvider>
        <StageCanvas />
        <GrainOverlay />
        <SiteHeader />
        <main>
          <Outlet />
        </main>
        <SiteFooter />
        <BookingSheet />
      </BookingProvider>
    </ScrollProvider>
  );
}
