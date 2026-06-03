import { createRootRoute, Outlet } from "@tanstack/react-router";

import { SiteFooter } from "../components/site-footer";
import { SiteHeader } from "../components/site-header";
import { ScrollProvider } from "../providers/scroll-provider";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <ScrollProvider>
      <SiteHeader />
      <main>
        <Outlet />
      </main>
      <SiteFooter />
    </ScrollProvider>
  );
}
