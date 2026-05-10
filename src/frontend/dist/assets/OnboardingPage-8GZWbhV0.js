import { a as useNavigate, b as useProfile, d as useAvailableSports, e as useSaveProfile, r as reactExports, j as jsxRuntimeExports, B as Button, f as ue } from "./index-fRB1Ra1u.js";
import { L as Label, I as Input } from "./label-BL4Q4ZkO.js";
import { Z as Zap } from "./zap-J9OcsS04.js";
import { C as ChevronRight } from "./chevron-right-C3143o7q.js";
import { C as Check } from "./check-4kbHHAHo.js";
const FALLBACK_SPORTS = [
  "Basketball",
  "Football",
  "Tennis",
  "Running",
  "Cycling",
  "Swimming",
  "Volleyball",
  "Badminton",
  "Yoga",
  "Gym"
];
function OnboardingPage() {
  const navigate = useNavigate();
  const { data: profile } = useProfile();
  const { data: availableSports } = useAvailableSports();
  const saveProfile = useSaveProfile();
  const [name, setName] = reactExports.useState((profile == null ? void 0 : profile.name) ?? "");
  const [selectedSports, setSelectedSports] = reactExports.useState(
    (profile == null ? void 0 : profile.sports) ?? []
  );
  const [step, setStep] = reactExports.useState(1);
  const sports = availableSports ?? FALLBACK_SPORTS;
  function toggleSport(sport) {
    setSelectedSports(
      (prev) => prev.includes(sport) ? prev.filter((s) => s !== sport) : [...prev, sport]
    );
  }
  async function handleComplete() {
    if (!name.trim()) {
      ue.error("Please enter your name.");
      return;
    }
    if (selectedSports.length === 0) {
      ue.error("Select at least one sport.");
      return;
    }
    try {
      await saveProfile.mutateAsync({
        name: name.trim(),
        sports: selectedSports,
        onboardingComplete: true
      });
      ue.success("Welcome to the Arena!");
      navigate({ to: "/dashboard" });
    } catch {
      ue.error("Failed to save profile. Please try again.");
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-h-screen items-center justify-center bg-background p-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "pointer-events-none fixed inset-0",
        style: {
          background: "radial-gradient(ellipse 60% 40% at 50% 0%, oklch(0.35 0.15 250 / 0.2) 0%, transparent 70%)"
        }
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-full max-w-md animate-scale-in", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-accent", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { size: 28, className: "text-accent-foreground" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-bold text-foreground", children: "Join the Arena" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: step === 1 ? "What should we call you?" : "Which sports are you into?" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-8 flex items-center justify-center gap-2", children: [1, 2].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: `h-2 rounded-full transition-all duration-300 ${s === step ? "w-8 bg-accent" : s < step ? "w-4 bg-accent/50" : "w-4 bg-muted"}`
        },
        s
      )) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-2xl border border-border bg-card p-6", children: step === 1 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Label,
            {
              htmlFor: "name",
              className: "font-display text-sm font-semibold",
              children: "Your Name"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "name",
              value: name,
              onChange: (e) => setName(e.target.value),
              placeholder: "e.g. Alex Rivera",
              "data-ocid": "onboarding.name_input",
              className: "mt-2",
              onKeyDown: (e) => e.key === "Enter" && name.trim() && setStep(2)
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            onClick: () => setStep(2),
            disabled: !name.trim(),
            "data-ocid": "onboarding.next_button",
            className: "w-full gap-2 bg-accent text-accent-foreground hover:bg-accent/90",
            children: [
              "Next ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { size: 16 })
            ]
          }
        )
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: sports.map((sport) => {
          const selected = selectedSports.includes(sport);
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => toggleSport(sport),
              "data-ocid": `onboarding.sport_toggle.${sport.toLowerCase()}`,
              className: `flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-medium transition-smooth ${selected ? "border-accent bg-accent/15 text-accent" : "border-border bg-muted/30 text-muted-foreground hover:border-accent/50 hover:text-foreground"}`,
              children: [
                selected && /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { size: 12 }),
                sport
              ]
            },
            sport
          );
        }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
          selectedSports.length,
          " selected"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "ghost",
              onClick: () => setStep(1),
              "data-ocid": "onboarding.back_button",
              className: "flex-1",
              children: "Back"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              onClick: handleComplete,
              disabled: selectedSports.length === 0 || saveProfile.isPending,
              "data-ocid": "onboarding.submit_button",
              className: "flex-1 bg-accent text-accent-foreground hover:bg-accent/90",
              children: saveProfile.isPending ? "Saving..." : "Enter Arena"
            }
          )
        ] })
      ] }) })
    ] })
  ] });
}
export {
  OnboardingPage as default
};
