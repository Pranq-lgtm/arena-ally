import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { Navigate } from "@tanstack/react-router";
import type { ReactNode } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, isInitializing } = useInternetIdentity();

  if (!isAuthenticated && !isInitializing) {
    return <Navigate to="/" />;
  }

  if (isInitializing) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-border border-t-accent" />
          <p className="font-display text-muted-foreground">Loading Arena...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
