import { QueryClient } from "@tanstack/query-core";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      throwOnError: true,
      refetchOnWindowFocus: true,
      retry: false,
    },
    mutations: {
      retry: false,
      throwOnError: true,
    },
  },
});
