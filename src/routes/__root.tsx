import { createRootRoute, Outlet } from "@tanstack/react-router";

import { SiteFooter } from "../components/site-footer";
import { SiteHeader } from "../components/site-header";
import { StageExperience } from "../components/stage-experience";
import { ScrollProvider } from "../providers/scroll-provider";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <ScrollProvider>
      <StageExperience />
      <SiteHeader />
      <main>
        <Outlet />
      </main>
      <SiteFooter />
    </ScrollProvider>
  );
}
