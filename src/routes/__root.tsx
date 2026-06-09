import { createRootRoute, Outlet } from "@tanstack/react-router";

import { GrainOverlay } from "../components/grain-overlay";
import { SiteFooter } from "../components/site-footer";
import { SiteHeader } from "../components/site-header";
import { StageCanvas } from "../components/stage-canvas";
import { ScrollProvider } from "../providers/scroll-provider";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <ScrollProvider>
      <StageCanvas />
      <GrainOverlay />
      <SiteHeader />
      <main>
        <Outlet />
      </main>
      <SiteFooter />
    </ScrollProvider>
  );
}
