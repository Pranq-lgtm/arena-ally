import { Button } from "@/components/ui/button";
import { useProfile } from "@/hooks/use-profile";
import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { useNavigate } from "@tanstack/react-router";
import { Brain, ChevronRight, Shield, Target, Users, Zap } from "lucide-react";
import { useEffect } from "react";

const FEATURES = [
  {
    icon: Zap,
    title: "Social Battery",
    description:
      "Real-time well-being score based on how often you connect and play with others.",
    color: "text-accent",
    bg: "bg-accent/10",
  },
  {
    icon: Target,
    title: "Team Objectives",
    description:
      "Complete gamified challenges with teammates to unlock local rewards and badges.",
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    icon: Brain,
    title: "AI Wellness Coach",
    description:
      "Personalized insights that detect early burnout signals and guide your recovery.",
    color: "text-secondary",
    bg: "bg-secondary/10",
  },
  {
    icon: Users,
    title: "Athlete Matchmaking",
    description:
      "Find people of similar skill and complementary personality types to play with.",
    color: "text-chart-3",
    bg: "bg-chart-3/10",
  },
];

export default function LandingPage() {
  const { isAuthenticated, isLoggingIn, isInitializing, login } =
    useInternetIdentity();
  const navigate = useNavigate();
  const { data: profile } = useProfile();

  useEffect(() => {
    if (isAuthenticated) {
      if (profile === null) {
        navigate({ to: "/onboarding" });
      } else if (profile) {
        if (!profile.onboardingComplete) {
          navigate({ to: "/onboarding" });
        } else {
          navigate({ to: "/dashboard" });
        }
      }
    }
  }, [isAuthenticated, profile, navigate]);

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative flex min-h-[90vh] flex-col items-center justify-center overflow-hidden bg-background px-6 py-20">
        {/* Background glow */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 50% at 50% 0%, oklch(0.35 0.15 250 / 0.25) 0%, transparent 70%), radial-gradient(ellipse 40% 30% at 80% 60%, oklch(0.65 0.25 45 / 0.12) 0%, transparent 60%)",
          }}
        />

        <div className="relative z-10 mx-auto max-w-3xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5">
            <Zap size={14} className="text-accent" />
            <span className="font-display text-sm font-semibold text-accent">
              The Future of Sports & Well-being
            </span>
          </div>

          <h1 className="font-display text-5xl font-extrabold leading-tight tracking-tight text-foreground sm:text-6xl lg:text-7xl">
            Arena
            <span className="ml-2 text-accent">Ally</span>
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
            Fight the loneliness epidemic through sports. Track your Social
            Battery, complete Team Objectives, and connect with athletes who
            match your vibe.
          </p>

          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button
              size="lg"
              onClick={login}
              disabled={isLoggingIn || isInitializing}
              data-ocid="landing.login_button"
              className="gap-2 bg-accent px-8 py-6 text-base font-semibold text-accent-foreground hover:bg-accent/90"
            >
              <Shield size={18} />
              {isLoggingIn ? "Signing In..." : "Join the Arena"}
              <ChevronRight size={16} />
            </Button>
            <a
              href="#features"
              data-ocid="landing.learn_more_link"
              className="font-medium text-muted-foreground transition-smooth hover:text-foreground"
            >
              Learn More
            </a>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-3 gap-8">
            {[
              { value: "70%", label: "Athletes feel digitally overwhelmed" },
              { value: "60%", label: "Struggle with anxiety or depression" },
              { value: "1 App", label: "To fix all of this" },
            ].map(({ value, label }) => (
              <div key={value} className="text-center">
                <div className="font-display text-3xl font-extrabold text-accent">
                  {value}
                </div>
                <div className="mt-1 text-xs text-muted-foreground">
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="bg-card/40 py-20">
        <div className="mx-auto max-w-5xl px-6">
          <div className="mb-12 text-center">
            <h2 className="font-display text-3xl font-bold text-foreground">
              Everything You Need to Thrive
            </h2>
            <p className="mt-3 text-muted-foreground">
              From AI coaching to gamified community challenges
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {FEATURES.map(({ icon: Icon, title, description, color, bg }) => (
              <div
                key={title}
                className="rounded-xl border border-border bg-card p-5 transition-smooth hover:border-accent/30 hover:-translate-y-1"
              >
                <div
                  className={`mb-4 flex h-10 w-10 items-center justify-center rounded-lg ${bg}`}
                >
                  <Icon size={20} className={color} />
                </div>
                <h3 className="font-display text-sm font-bold text-foreground">
                  {title}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-background py-20 text-center">
        <div className="mx-auto max-w-2xl px-6">
          <h2 className="font-display text-3xl font-bold text-foreground">
            Play Smarter. Live Better.
          </h2>
          <p className="mt-4 text-muted-foreground">
            Join Arena Ally — the movement to transform how athletes perform,
            connect, and thrive.
          </p>
          <Button
            size="lg"
            onClick={login}
            data-ocid="landing.cta_button"
            className="mt-8 gap-2 bg-accent px-8 py-6 text-base font-semibold text-accent-foreground hover:bg-accent/90"
          >
            <Shield size={18} />
            Get Started Free
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card/60 py-8 text-center">
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()}. Built with love using{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:underline"
          >
            caffeine.ai
          </a>
        </p>
      </footer>
    </div>
  );
}
