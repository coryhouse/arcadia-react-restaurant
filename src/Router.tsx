import type { QueryClient } from "@tanstack/query-core";
import { Router, RouterProvider } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { queryClient } from "./queryClient";

// Type router context so it can be referenced in __root. Must be in sync with the context in the router below for app to compile.
export type MyRouterContext = {
  queryClient: QueryClient;
  defaultPreloadStaleTime: number;
};

// Create router instance
const router = new Router({
  routeTree,
  context: {
    queryClient,
    // Since we're using React Query, we don't want loader calls to ever be stale
    // This will ensure that the loader is always called when the route is preloaded or visited
    defaultPreloadStaleTime: 0,
  },
  scrollRestoration: true,
});

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export function AppRouterProvider() {
  return <RouterProvider router={router} />;
}
