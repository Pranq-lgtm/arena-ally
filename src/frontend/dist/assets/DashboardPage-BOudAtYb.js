import { c as createLucideIcon, j as jsxRuntimeExports, B as Button, a as useNavigate, b as useProfile, d as useAvailableSports, r as reactExports, U as User, f as ue } from "./index-fRB1Ra1u.js";
import { P as Plus, O as ObjectiveCard, A as ActivityItem } from "./ObjectiveCard-CZV5MAXW.js";
import { X, S as SocialBatteryRing } from "./SocialBatteryRing-C2TP-nT2.js";
import { T as TriangleAlert, u as useWellnessTip, a as useRefreshWellnessTip } from "./use-wellness-Qps0J2q-.js";
import { B as Brain } from "./brain-BAaOQE2D.js";
import { L as Label, I as Input } from "./label-BL4Q4ZkO.js";
import { u as useSocialBattery, a as useActivities, b as useObjectives, c as useMyObjectives, d as useAcceptObjective, e as useLogActivity, A as ActivityType, O as ObjectiveStatus, S as Skeleton } from "./use-objectives-CXyWEVek.js";
import { U as Users } from "./users-DQZAbzPP.js";
import { C as ChevronRight } from "./chevron-right-C3143o7q.js";
import "./circle-check-CQ-CPb_p.js";
import "./zap-J9OcsS04.js";
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
      d: "M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2",
      key: "169zse"
    }
  ]
];
const Activity = createLucideIcon("activity", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8", key: "v9h5vc" }],
  ["path", { d: "M21 3v5h-5", key: "1q7to0" }],
  ["path", { d: "M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16", key: "3uifl3" }],
  ["path", { d: "M8 16H3v5", key: "1cv678" }]
];
const RefreshCw = createLucideIcon("refresh-cw", __iconNode);
function WellnessTipCard({
  tip,
  onRefresh,
  isRefreshing
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "data-ocid": "wellness.tip_card",
      className: `rounded-xl border p-4 transition-smooth ${tip.isBurnoutRisk ? "border-destructive/30 bg-destructive/5" : "border-secondary/20 bg-secondary/5"}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-3 flex items-start justify-between gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: `flex h-8 w-8 items-center justify-center rounded-lg ${tip.isBurnoutRisk ? "bg-destructive/20" : "bg-secondary/20"}`,
                children: tip.isBurnoutRisk ? /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { size: 16, className: "text-destructive" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Brain, { size: 16, className: "text-secondary" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-sm font-semibold text-foreground", children: "AI Wellness Coach" })
          ] }),
          tip.isBurnoutRisk && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "animate-pulse-badge rounded-full bg-destructive/20 px-2 py-0.5 text-xs font-medium text-destructive", children: "⚠ Burnout Risk" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-4 text-sm leading-relaxed text-muted-foreground", children: tip.tip }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "Social Battery:" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "span",
              {
                className: `font-display text-sm font-bold ${Number(tip.socialBattery) >= 60 ? "text-accent" : Number(tip.socialBattery) >= 30 ? "text-yellow-400" : "text-destructive"}`,
                children: [
                  Number(tip.socialBattery),
                  "%"
                ]
              }
            )
          ] }),
          onRefresh && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "ghost",
              size: "sm",
              onClick: onRefresh,
              disabled: isRefreshing,
              "data-ocid": "wellness.refresh_button",
              className: "gap-1.5 text-xs text-muted-foreground hover:text-foreground",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  RefreshCw,
                  {
                    size: 12,
                    className: isRefreshing ? "animate-spin" : ""
                  }
                ),
                "Refresh"
              ]
            }
          )
        ] })
      ]
    }
  );
}
function DashboardPage() {
  var _a;
  const navigate = useNavigate();
  const { data: profile, isLoading: profileLoading } = useProfile();
  const { data: batteryRaw, isLoading: batteryLoading } = useSocialBattery();
  const { data: activities, isLoading: activitiesLoading } = useActivities();
  const { data: objectives, isLoading: objectivesLoading } = useObjectives();
  const { data: myObjectives } = useMyObjectives();
  const { data: wellnessTip, isLoading: wellnessLoading } = useWellnessTip();
  const { data: sports } = useAvailableSports();
  const acceptObjective = useAcceptObjective();
  const refreshTip = useRefreshWellnessTip();
  const logActivity = useLogActivity();
  const [showLogModal, setShowLogModal] = reactExports.useState(false);
  const [logSport, setLogSport] = reactExports.useState("");
  const [logType, setLogType] = reactExports.useState(ActivityType.group);
  const [logNotes, setLogNotes] = reactExports.useState("");
  const battery = batteryRaw !== void 0 ? Number(batteryRaw) : null;
  const isLowBattery = battery !== null && battery < 40;
  reactExports.useEffect(() => {
    if (profile && !profile.onboardingComplete) {
      navigate({ to: "/onboarding" });
    }
  }, [profile, navigate]);
  async function handleAccept(id) {
    try {
      await acceptObjective.mutateAsync(id);
      ue.success("Challenge accepted! Let's go! 🎯");
    } catch {
      ue.error("Failed to accept challenge.");
    }
  }
  async function handleRefreshTip() {
    try {
      await refreshTip.mutateAsync();
      ue.success("Wellness tip refreshed!");
    } catch {
      ue.error("Could not refresh tip.");
    }
  }
  async function handleLogActivity() {
    if (!logSport) {
      ue.error("Select a sport.");
      return;
    }
    try {
      await logActivity.mutateAsync({
        sport: logSport,
        activityType: logType,
        notes: logNotes
      });
      ue.success("Activity logged! Social Battery updated. 🔋");
      setLogSport("");
      setLogNotes("");
      setShowLogModal(false);
    } catch {
      ue.error("Failed to log activity.");
    }
  }
  const acceptedIds = new Set(
    (myObjectives ?? []).map(([, uo]) => String(uo.objectiveId))
  );
  const activeObjectives = (objectives ?? []).filter((o) => o.status === ObjectiveStatus.active).slice(0, 3);
  const recentActivities = (activities ?? []).slice(0, 5);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "min-h-full bg-background p-4 lg:p-6",
      "data-ocid": "dashboard.page",
      children: [
        isLowBattery && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            "data-ocid": "dashboard.low_battery_alert",
            className: "mb-5 flex items-start gap-3 rounded-xl border border-destructive/30 bg-destructive/8 p-4",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                TriangleAlert,
                {
                  size: 18,
                  className: "mt-0.5 flex-shrink-0 text-destructive"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-sm font-semibold text-foreground", children: "Your Social Battery is low" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Try joining a group activity this week — even a short session helps recharge your social energy." })
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6 flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-bold text-foreground", children: profileLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-40" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              "Hey, ",
              ((_a = profile == null ? void 0 : profile.name) == null ? void 0 : _a.split(" ")[0]) ?? "Athlete",
              " 👋"
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Your arena at a glance" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              size: "sm",
              onClick: () => setShowLogModal(true),
              "data-ocid": "dashboard.log_activity_button",
              className: "gap-2 bg-accent text-accent-foreground hover:bg-accent/90",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 14 }),
                "Log Activity"
              ]
            }
          )
        ] }),
        showLogModal && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4",
            "data-ocid": "dashboard.log_modal",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-lg", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4 flex items-center justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-lg font-bold text-foreground", children: "Log Activity" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => setShowLogModal(false),
                    "data-ocid": "dashboard.log_modal_close_button",
                    className: "rounded-lg p-1 text-muted-foreground hover:text-foreground",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 16 })
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs text-muted-foreground", children: "Sport" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "select",
                    {
                      value: logSport,
                      onChange: (e) => setLogSport(e.target.value),
                      "data-ocid": "dashboard.log_sport_select",
                      className: "mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Select sport..." }),
                        (sports ?? []).map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: s, children: s }, s))
                      ]
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs text-muted-foreground", children: "Activity Type" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1 flex gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "button",
                      {
                        type: "button",
                        onClick: () => setLogType(ActivityType.group),
                        "data-ocid": "dashboard.log_type_group_toggle",
                        className: `flex flex-1 items-center justify-center gap-1.5 rounded-lg border py-2 text-xs font-medium transition-smooth ${logType === ActivityType.group ? "border-accent bg-accent/15 text-accent" : "border-border text-muted-foreground hover:border-accent/40"}`,
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { size: 12 }),
                          " Group"
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "button",
                      {
                        type: "button",
                        onClick: () => setLogType(ActivityType.solo),
                        "data-ocid": "dashboard.log_type_solo_toggle",
                        className: `flex flex-1 items-center justify-center gap-1.5 rounded-lg border py-2 text-xs font-medium transition-smooth ${logType === ActivityType.solo ? "border-primary bg-primary/15 text-primary" : "border-border text-muted-foreground hover:border-primary/40"}`,
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(User, { size: 12 }),
                          " Solo"
                        ]
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs text-muted-foreground", children: "Notes (optional)" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      value: logNotes,
                      onChange: (e) => setLogNotes(e.target.value),
                      placeholder: "How'd it go?",
                      "data-ocid": "dashboard.log_notes_input",
                      className: "mt-1"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 pt-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      onClick: handleLogActivity,
                      disabled: logActivity.isPending || !logSport,
                      "data-ocid": "dashboard.log_submit_button",
                      className: "flex-1 bg-accent text-accent-foreground hover:bg-accent/90",
                      children: logActivity.isPending ? "Logging..." : "Save Activity"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      variant: "ghost",
                      onClick: () => setShowLogModal(false),
                      "data-ocid": "dashboard.log_cancel_button",
                      children: "Cancel"
                    }
                  )
                ] })
              ] })
            ] })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 lg:grid-cols-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "rounded-xl border border-border bg-card p-5",
              "data-ocid": "dashboard.social_battery_card",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mb-4 font-display text-sm font-semibold uppercase tracking-wider text-muted-foreground", children: "Social Battery" }),
                batteryLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center py-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-44 w-44 rounded-full" }) }) : battery !== null ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SocialBatteryRing, { value: battery }) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    "data-ocid": "dashboard.battery.empty_state",
                    className: "flex flex-col items-center justify-center py-8 text-center",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { size: 32, className: "mb-3 text-muted-foreground/40" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Log activities to calculate your Social Battery" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Button,
                        {
                          variant: "ghost",
                          size: "sm",
                          onClick: () => setShowLogModal(true),
                          className: "mt-2 text-accent hover:text-accent/80",
                          children: "Log first activity"
                        }
                      )
                    ]
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "rounded-xl border border-border bg-card p-5",
              "data-ocid": "dashboard.objectives_card",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4 flex items-center justify-between", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-sm font-semibold uppercase tracking-wider text-muted-foreground", children: "Team Objectives" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "button",
                    {
                      type: "button",
                      onClick: () => navigate({ to: "/objectives" }),
                      "data-ocid": "dashboard.objectives_view_all_link",
                      className: "flex items-center gap-1 text-xs text-accent hover:underline",
                      children: [
                        "View All ",
                        /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { size: 12 })
                      ]
                    }
                  )
                ] }),
                objectivesLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-24 w-full rounded-xl" }, i)) }) : activeObjectives.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    "data-ocid": "dashboard.objectives.empty_state",
                    className: "py-8 text-center",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "No active objectives" })
                  }
                ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: activeObjectives.map((obj, i) => {
                  var _a2;
                  return /* @__PURE__ */ jsxRuntimeExports.jsx(
                    ObjectiveCard,
                    {
                      objective: obj,
                      userObjective: (_a2 = (myObjectives ?? []).find(
                        ([, uo]) => String(uo.objectiveId) === String(obj.id)
                      )) == null ? void 0 : _a2[1],
                      onAccept: !acceptedIds.has(String(obj.id)) ? handleAccept : void 0,
                      isAccepting: acceptObjective.isPending,
                      index: i
                    },
                    String(obj.id)
                  );
                }) })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "rounded-xl border border-border bg-card p-5",
                "data-ocid": "dashboard.wellness_card",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mb-3 font-display text-sm font-semibold uppercase tracking-wider text-muted-foreground", children: "AI Wellness Coach" }),
                  wellnessLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-32 w-full rounded-xl" }) : wellnessTip ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                    WellnessTipCard,
                    {
                      tip: wellnessTip,
                      onRefresh: handleRefreshTip,
                      isRefreshing: refreshTip.isPending
                    }
                  ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      "data-ocid": "dashboard.wellness.empty_state",
                      className: "rounded-xl border border-dashed border-border p-4 text-center",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Log activities to get your AI wellness tip" })
                    }
                  )
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "rounded-xl border border-border bg-card p-5",
                "data-ocid": "dashboard.activity_card",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mb-3 font-display text-sm font-semibold uppercase tracking-wider text-muted-foreground", children: "Recent Activity" }),
                  activitiesLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: [1, 2].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-14 w-full rounded-xl" }, i)) }) : recentActivities.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      "data-ocid": "dashboard.activity.empty_state",
                      className: "rounded-xl border border-dashed border-border py-6 text-center",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "No activities logged yet" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          Button,
                          {
                            variant: "ghost",
                            size: "sm",
                            onClick: () => setShowLogModal(true),
                            "data-ocid": "dashboard.first_activity_button",
                            className: "mt-2 text-accent hover:text-accent/80",
                            children: "Log your first activity"
                          }
                        )
                      ]
                    }
                  ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: recentActivities.map((activity, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                    ActivityItem,
                    {
                      activity,
                      index: i
                    },
                    String(activity.id)
                  )) })
                ]
              }
            )
          ] })
        ] })
      ]
    }
  );
}
export {
  DashboardPage as default
};
