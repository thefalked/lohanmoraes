import { describe, expect, it } from "vite-plus/test";
import { routeTree } from "./routeTree.gen";

describe("route tree", () => {
  it("registers home route only", () => {
    const children = routeTree.children as unknown as Array<{ options?: { path?: string } }>;
    const paths = children.map((route) => route.options?.path);

    expect(paths).toEqual(["/"]);
  });
});
