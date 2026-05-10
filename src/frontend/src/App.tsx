import { Layout } from "@/components/Layout";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Toaster } from "@/components/ui/sonner";
import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { Suspense, lazy } from "react";

const LandingPage = lazy(() => import("@/pages/LandingPage"));
const OnboardingPage = lazy(() => import("@/pages/OnboardingPage"));
const DashboardPage = lazy(() => import("@/pages/DashboardPage"));
const ObjectivesPage = lazy(() => import("@/pages/ObjectivesPage"));
const ProfilePage = lazy(() => import("@/pages/ProfilePage"));
const AdminOpenAIPage = lazy(() => import("@/pages/AdminOpenAIPage"));

const PageLoader = () => (
  <div className="flex min-h-[60vh] items-center justify-center">
    <div className="h-10 w-10 animate-spin rounded-full border-4 border-border border-t-accent" />
  </div>
);

const rootRoute = createRootRoute({
  component: () => (
    <Layout>
      <Suspense fallback={<PageLoader />}>
        <Outlet />
      </Suspense>
      <Toaster richColors position="top-right" />
    </Layout>
  ),
});

const landingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: LandingPage,
});

const onboardingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/onboarding",
  component: () => (
    <ProtectedRoute>
      <OnboardingPage />
    </ProtectedRoute>
  ),
});

const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/dashboard",
  component: () => (
    <ProtectedRoute>
      <DashboardPage />
    </ProtectedRoute>
  ),
});

const objectivesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/objectives",
  component: () => (
    <ProtectedRoute>
      <ObjectivesPage />
    </ProtectedRoute>
  ),
});

const profileRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/profile",
  component: () => (
    <ProtectedRoute>
      <ProfilePage />
    </ProtectedRoute>
  ),
});

const adminOpenAIRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/openai-settings",
  component: () => (
    <ProtectedRoute>
      <AdminOpenAIPage />
    </ProtectedRoute>
  ),
});

const routeTree = rootRoute.addChildren([
  landingRoute,
  onboardingRoute,
  dashboardRoute,
  objectivesRoute,
  profileRoute,
  adminOpenAIRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
