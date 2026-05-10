import { c as createLucideIcon, u as useInternetIdentity, a as useNavigate, b as useProfile, r as reactExports, j as jsxRuntimeExports, B as Button, T as Target } from "./index-fRB1Ra1u.js";
import { Z as Zap } from "./zap-J9OcsS04.js";
import { C as ChevronRight } from "./chevron-right-C3143o7q.js";
import { B as Brain } from "./brain-BAaOQE2D.js";
import { U as Users } from "./users-DQZAbzPP.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
      key: "oel41y"
    }
  ]
];
const Shield = createLucideIcon("shield", __iconNode);
const FEATURES = [
  {
    icon: Zap,
    title: "Social Battery",
    description: "Real-time well-being score based on how often you connect and play with others.",
    color: "text-accent",
    bg: "bg-accent/10"
  },
  {
    icon: Target,
    title: "Team Objectives",
    description: "Complete gamified challenges with teammates to unlock local rewards and badges.",
    color: "text-primary",
    bg: "bg-primary/10"
  },
  {
    icon: Brain,
    title: "AI Wellness Coach",
    description: "Personalized insights that detect early burnout signals and guide your recovery.",
    color: "text-secondary",
    bg: "bg-secondary/10"
  },
  {
    icon: Users,
    title: "Athlete Matchmaking",
    description: "Find people of similar skill and complementary personality types to play with.",
    color: "text-chart-3",
    bg: "bg-chart-3/10"
  }
];
function LandingPage() {
  const { isAuthenticated, isLoggingIn, isInitializing, login } = useInternetIdentity();
  const navigate = useNavigate();
  const { data: profile } = useProfile();
  reactExports.useEffect(() => {
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
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative flex min-h-[90vh] flex-col items-center justify-center overflow-hidden bg-background px-6 py-20", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "pointer-events-none absolute inset-0",
          style: {
            background: "radial-gradient(ellipse 80% 50% at 50% 0%, oklch(0.35 0.15 250 / 0.25) 0%, transparent 70%), radial-gradient(ellipse 40% 30% at 80% 60%, oklch(0.65 0.25 45 / 0.12) 0%, transparent 60%)"
          }
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 mx-auto max-w-3xl text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { size: 14, className: "text-accent" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-sm font-semibold text-accent", children: "The Future of Sports & Well-being" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display text-5xl font-extrabold leading-tight tracking-tight text-foreground sm:text-6xl lg:text-7xl", children: [
          "Arena",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-2 text-accent", children: "Ally" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mx-auto mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground", children: "Fight the loneliness epidemic through sports. Track your Social Battery, complete Team Objectives, and connect with athletes who match your vibe." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              size: "lg",
              onClick: login,
              disabled: isLoggingIn || isInitializing,
              "data-ocid": "landing.login_button",
              className: "gap-2 bg-accent px-8 py-6 text-base font-semibold text-accent-foreground hover:bg-accent/90",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { size: 18 }),
                isLoggingIn ? "Signing In..." : "Join the Arena",
                /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { size: 16 })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "a",
            {
              href: "#features",
              "data-ocid": "landing.learn_more_link",
              className: "font-medium text-muted-foreground transition-smooth hover:text-foreground",
              children: "Learn More"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-16 grid grid-cols-3 gap-8", children: [
          { value: "70%", label: "Athletes feel digitally overwhelmed" },
          { value: "60%", label: "Struggle with anxiety or depression" },
          { value: "1 App", label: "To fix all of this" }
        ].map(({ value, label }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-3xl font-extrabold text-accent", children: value }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 text-xs text-muted-foreground", children: label })
        ] }, value)) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { id: "features", className: "bg-card/40 py-20", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-5xl px-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-12 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl font-bold text-foreground", children: "Everything You Need to Thrive" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-muted-foreground", children: "From AI coaching to gamified community challenges" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-6 sm:grid-cols-2 lg:grid-cols-4", children: FEATURES.map(({ icon: Icon, title, description, color, bg }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "rounded-xl border border-border bg-card p-5 transition-smooth hover:border-accent/30 hover:-translate-y-1",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: `mb-4 flex h-10 w-10 items-center justify-center rounded-lg ${bg}`,
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { size: 20, className: color })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-sm font-bold text-foreground", children: title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-xs leading-relaxed text-muted-foreground", children: description })
          ]
        },
        title
      )) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-background py-20 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-2xl px-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl font-bold text-foreground", children: "Play Smarter. Live Better." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-muted-foreground", children: "Join Arena Ally — the movement to transform how athletes perform, connect, and thrive." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          size: "lg",
          onClick: login,
          "data-ocid": "landing.cta_button",
          className: "mt-8 gap-2 bg-accent px-8 py-6 text-base font-semibold text-accent-foreground hover:bg-accent/90",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { size: 18 }),
            "Get Started Free"
          ]
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("footer", { className: "border-t border-border bg-card/60 py-8 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
      "© ",
      (/* @__PURE__ */ new Date()).getFullYear(),
      ". Built with love using",
      " ",
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "a",
        {
          href: `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`,
          target: "_blank",
          rel: "noopener noreferrer",
          className: "text-accent hover:underline",
          children: "caffeine.ai"
        }
      )
    ] }) })
  ] });
}
export {
  LandingPage as default
};
