import { c as createLucideIcon, j as jsxRuntimeExports, b as useProfile, d as useAvailableSports, e as useSaveProfile, r as reactExports, B as Button, f as ue } from "./index-fRB1Ra1u.js";
import { X, S as SocialBatteryRing } from "./SocialBatteryRing-C2TP-nT2.js";
import { L as Label, I as Input } from "./label-BL4Q4ZkO.js";
import { u as useSocialBattery, a as useActivities, c as useMyObjectives, O as ObjectiveStatus, S as Skeleton } from "./use-objectives-CXyWEVek.js";
import { C as Check } from "./check-4kbHHAHo.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",
      key: "1a8usu"
    }
  ]
];
const Pen = createLucideIcon("pen", __iconNode$1);
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
      d: "M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z",
      key: "1c8476"
    }
  ],
  ["path", { d: "M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7", key: "1ydtos" }],
  ["path", { d: "M7 3v4a1 1 0 0 0 1 1h7", key: "t51u73" }]
];
const Save = createLucideIcon("save", __iconNode);
const sizeMap = {
  sm: { outer: "h-8 w-8", text: "text-base" },
  md: { outer: "h-12 w-12", text: "text-2xl" },
  lg: { outer: "h-16 w-16", text: "text-3xl" }
};
function BadgeIcon({
  emoji,
  label,
  size = "md",
  glow = false,
  earned = true
}) {
  const { outer, text } = sizeMap[size];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "relative flex flex-col items-center gap-1",
      title: label,
      "aria-label": label,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: `${outer} flex items-center justify-center rounded-xl transition-smooth ${earned ? "bg-accent/15" : "bg-muted/40 opacity-40 grayscale"} ${glow && earned ? "ring-2 ring-accent/40 ring-offset-1 ring-offset-background" : ""}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: text, role: "img", "aria-hidden": true, children: emoji }),
              glow && earned && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 rounded-xl animate-pulse-badge bg-accent/10" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "max-w-[60px] text-center text-xs text-muted-foreground truncate", children: label })
      ]
    }
  );
}
const EARNED_BADGES = [
  { emoji: "🏆", label: "First Win" },
  { emoji: "🤝", label: "Team Player" },
  { emoji: "⚡", label: "Charged Up" },
  { emoji: "🎯", label: "On Target" }
];
function ProfilePage() {
  const { data: profile, isLoading } = useProfile();
  const { data: batteryRaw } = useSocialBattery();
  const { data: activities } = useActivities();
  const { data: myObjectives } = useMyObjectives();
  const { data: availableSports } = useAvailableSports();
  const saveProfile = useSaveProfile();
  const [editing, setEditing] = reactExports.useState(false);
  const [editName, setEditName] = reactExports.useState("");
  const [editSports, setEditSports] = reactExports.useState([]);
  const battery = batteryRaw !== void 0 ? Number(batteryRaw) : null;
  const completedObjectives = (myObjectives ?? []).filter(
    ([obj]) => obj.status === ObjectiveStatus.completed
  ).length;
  function startEdit() {
    setEditName((profile == null ? void 0 : profile.name) ?? "");
    setEditSports((profile == null ? void 0 : profile.sports) ?? []);
    setEditing(true);
  }
  function toggleSport(sport) {
    setEditSports(
      (prev) => prev.includes(sport) ? prev.filter((s) => s !== sport) : [...prev, sport]
    );
  }
  async function handleSave() {
    if (!editName.trim()) {
      ue.error("Name cannot be empty.");
      return;
    }
    try {
      await saveProfile.mutateAsync({
        name: editName.trim(),
        sports: editSports,
        onboardingComplete: true
      });
      ue.success("Profile updated!");
      setEditing(false);
    } catch {
      ue.error("Failed to update profile.");
    }
  }
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-32 w-full rounded-xl" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-48 w-full rounded-xl" })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "min-h-full bg-background p-4 lg:p-6",
      "data-ocid": "profile.page",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-2xl space-y-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "rounded-xl border border-border bg-card p-6",
            "data-ocid": "profile.info_card",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4 flex items-start justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-bold text-foreground", children: "My Profile" }),
                !editing ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    variant: "ghost",
                    size: "sm",
                    onClick: startEdit,
                    "data-ocid": "profile.edit_button",
                    className: "gap-2 text-muted-foreground hover:text-foreground",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Pen, { size: 14 }),
                      " Edit"
                    ]
                  }
                ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Button,
                    {
                      size: "sm",
                      onClick: handleSave,
                      disabled: saveProfile.isPending,
                      "data-ocid": "profile.save_button",
                      className: "gap-1.5 bg-accent text-accent-foreground hover:bg-accent/90",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { size: 14 }),
                        saveProfile.isPending ? "Saving..." : "Save"
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      variant: "ghost",
                      size: "sm",
                      onClick: () => setEditing(false),
                      "data-ocid": "profile.cancel_button",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 14 })
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/20 text-2xl font-bold text-primary", children: ((profile == null ? void 0 : profile.name) ?? "A")[0].toUpperCase() }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 min-w-0", children: editing ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs text-muted-foreground", children: "Name" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      value: editName,
                      onChange: (e) => setEditName(e.target.value),
                      "data-ocid": "profile.name_input",
                      className: "mt-1"
                    }
                  )
                ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-xl font-bold text-foreground", children: profile == null ? void 0 : profile.name }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Athlete" })
                ] }) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-5 grid grid-cols-3 gap-3", children: [
                {
                  label: "Social Battery",
                  value: battery !== null ? `${battery}%` : "—"
                },
                {
                  label: "Activities",
                  value: activities ? String(activities.length) : "—"
                },
                { label: "Completed", value: String(completedObjectives) }
              ].map(({ label, value }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "rounded-lg bg-muted/40 p-3 text-center",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-xl font-bold text-foreground", children: value }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: label })
                  ]
                },
                label
              )) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground", children: "Sports" }),
                editing ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: (availableSports ?? []).map((sport) => {
                  const sel = editSports.includes(sport);
                  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "button",
                    {
                      type: "button",
                      onClick: () => toggleSport(sport),
                      "data-ocid": `profile.sport_toggle.${sport.toLowerCase()}`,
                      className: `flex items-center gap-1.5 rounded-full border px-3 py-1 text-sm transition-smooth ${sel ? "border-accent bg-accent/15 text-accent" : "border-border text-muted-foreground hover:border-accent/50"}`,
                      children: [
                        sel && /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { size: 11 }),
                        sport
                      ]
                    },
                    sport
                  );
                }) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2", children: [
                  ((profile == null ? void 0 : profile.sports) ?? []).map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: "rounded-full bg-primary/15 px-3 py-1 text-xs font-medium text-primary",
                      children: s
                    },
                    s
                  )),
                  ((profile == null ? void 0 : profile.sports) ?? []).length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: "No sports selected" })
                ] })
              ] })
            ]
          }
        ),
        battery !== null && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "rounded-xl border border-border bg-card p-6",
            "data-ocid": "profile.battery_card",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mb-4 font-display text-sm font-semibold uppercase tracking-wider text-muted-foreground", children: "Social Battery" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SocialBatteryRing, { value: battery, size: 160 }) })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "rounded-xl border border-border bg-card p-6",
            "data-ocid": "profile.badges_card",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mb-4 font-display text-sm font-semibold uppercase tracking-wider text-muted-foreground", children: "Achievement Badges" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-4", children: EARNED_BADGES.map((b) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                BadgeIcon,
                {
                  emoji: b.emoji,
                  label: b.label,
                  size: "md",
                  earned: true,
                  glow: true
                },
                b.label
              )) })
            ]
          }
        )
      ] })
    }
  );
}
export {
  ProfilePage as default
};
