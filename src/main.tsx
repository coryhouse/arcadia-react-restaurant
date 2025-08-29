import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { ErrorBoundary } from "react-error-boundary";
import { Toaster } from "sonner";
import { UserContextProvider } from "./UserContext";
import { AppRouterProvider } from "./Router";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary fallback={<div>Oops!</div>}>
      <Toaster richColors position="top-right" />
      <UserContextProvider>
        <AppRouterProvider />
      </UserContextProvider>
    </ErrorBoundary>
  </StrictMode>
);
