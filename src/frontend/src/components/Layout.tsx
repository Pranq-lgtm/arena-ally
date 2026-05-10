import { Button } from "@/components/ui/button";
import { useProfile } from "@/hooks/use-profile";
import { useIsAdmin } from "@/hooks/use-profile";
import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  LogOut,
  ShieldCheck,
  Target,
  User,
} from "lucide-react";
import type { ReactNode } from "react";

const NAV_ITEMS = [
  { to: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/objectives", icon: Target, label: "Objectives" },
  { to: "/profile", icon: User, label: "Profile" },
];

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { isAuthenticated, clear } = useInternetIdentity();
  const { data: profile } = useProfile();
  const { data: isAdmin } = useIsAdmin();
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  const isLoggedIn = isAuthenticated;

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      {isLoggedIn && (
        <aside className="hidden w-60 flex-shrink-0 flex-col border-r border-border bg-card md:flex">
          {/* Logo */}
          <div className="flex items-center gap-3 border-b border-border px-6 py-5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent">
              <span className="font-display text-base font-bold text-accent-foreground">
                A
              </span>
            </div>
            <span className="font-display text-lg font-bold tracking-tight text-foreground">
              Arena Ally
            </span>
          </div>

          {/* Nav */}
          <nav className="flex-1 space-y-1 px-3 py-4">
            {NAV_ITEMS.map(({ to, icon: Icon, label }) => {
              const active =
                currentPath === to || currentPath.startsWith(`${to}/`);
              return (
                <Link
                  key={to}
                  to={to}
                  data-ocid={`nav.${label.toLowerCase()}.link`}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-smooth ${
                    active
                      ? "bg-accent/15 text-accent"
                      : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
                  }`}
                >
                  <Icon size={18} />
                  {label}
                </Link>
              );
            })}

            {isAdmin && (
              <Link
                to="/admin/openai-settings"
                data-ocid="nav.admin.link"
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-smooth ${
                  currentPath.startsWith("/admin")
                    ? "bg-primary/15 text-primary"
                    : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
                }`}
              >
                <ShieldCheck size={18} />
                Admin
              </Link>
            )}
          </nav>

          {/* User footer */}
          <div className="border-t border-border p-4">
            <div className="mb-3 flex items-center gap-3 px-1">
              <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary/20">
                <User size={14} className="text-primary" />
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-foreground">
                  {profile?.name ?? "Athlete"}
                </p>
                <p className="text-xs text-muted-foreground">Active</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={clear}
              data-ocid="nav.logout_button"
              className="w-full justify-start gap-2 text-muted-foreground hover:text-foreground"
            >
              <LogOut size={14} />
              Sign Out
            </Button>
          </div>
        </aside>
      )}

      {/* Main */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top bar (mobile only when logged in, always visible when logged out) */}
        <header
          className={`flex items-center border-b border-border bg-card px-4 py-3 shadow-xs ${
            isLoggedIn ? "md:hidden" : ""
          }`}
        >
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent">
              <span className="font-display text-sm font-bold text-accent-foreground">
                A
              </span>
            </div>
            <span className="font-display text-base font-bold tracking-tight text-foreground">
              Arena Ally
            </span>
          </div>
          {isLoggedIn && (
            <div className="ml-auto flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                {profile?.name}
              </span>
              <Button
                variant="ghost"
                size="icon"
                onClick={clear}
                data-ocid="nav.mobile_logout_button"
                className="text-muted-foreground"
              >
                <LogOut size={16} />
              </Button>
            </div>
          )}
        </header>

        {/* Content */}
        <main className="flex-1 overflow-auto">{children}</main>

        {/* Mobile bottom nav */}
        {isLoggedIn && (
          <nav className="flex border-t border-border bg-card md:hidden">
            {NAV_ITEMS.map(({ to, icon: Icon, label }) => {
              const active = currentPath === to;
              return (
                <Link
                  key={to}
                  to={to}
                  data-ocid={`nav.mobile.${label.toLowerCase()}.link`}
                  className={`flex flex-1 flex-col items-center gap-1 py-3 text-xs font-medium transition-smooth ${
                    active
                      ? "text-accent"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Icon size={20} />
                  {label}
                </Link>
              );
            })}
          </nav>
        )}
      </div>
    </div>
  );
}
