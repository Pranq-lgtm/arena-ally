import { d as useAvailableSports, r as reactExports, j as jsxRuntimeExports, B as Button, U as User, f as ue } from "./index-fRB1Ra1u.js";
import { P as Plus, O as ObjectiveCard, A as ActivityItem } from "./ObjectiveCard-CZV5MAXW.js";
import { L as Label, I as Input } from "./label-BL4Q4ZkO.js";
import { b as useObjectives, c as useMyObjectives, a as useActivities, d as useAcceptObjective, e as useLogActivity, A as ActivityType, O as ObjectiveStatus, S as Skeleton } from "./use-objectives-CXyWEVek.js";
import { U as Users } from "./users-DQZAbzPP.js";
import "./circle-check-CQ-CPb_p.js";
import "./zap-J9OcsS04.js";
function ObjectivesPage() {
  const { data: objectives, isLoading: objectivesLoading } = useObjectives();
  const { data: myObjectives, isLoading: myObjectivesLoading } = useMyObjectives();
  const { data: activities, isLoading: activitiesLoading } = useActivities();
  const { data: sports } = useAvailableSports();
  const acceptObjective = useAcceptObjective();
  const logActivity = useLogActivity();
  const [tab, setTab] = reactExports.useState("available");
  const [logSport, setLogSport] = reactExports.useState("");
  const [logType, setLogType] = reactExports.useState(ActivityType.group);
  const [logNotes, setLogNotes] = reactExports.useState("");
  const [showLogForm, setShowLogForm] = reactExports.useState(false);
  const acceptedIds = new Set(
    (myObjectives ?? []).map(([, uo]) => String(uo.objectiveId))
  );
  const availableObjectives = (objectives ?? []).filter(
    (obj) => obj.status === ObjectiveStatus.active
  );
  const myAcceptedObjectives = myObjectives ?? [];
  async function handleAccept(id) {
    try {
      await acceptObjective.mutateAsync(id);
      ue.success("Challenge accepted! 🎯");
    } catch {
      ue.error("Failed to accept challenge.");
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
      ue.success("Activity logged! Social Battery updated.");
      setLogSport("");
      setLogNotes("");
      setShowLogForm(false);
    } catch {
      ue.error("Failed to log activity.");
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "min-h-full bg-background p-4 lg:p-6",
      "data-ocid": "objectives.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6 flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-bold text-foreground", children: "Team Objectives" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Complete challenges, earn rewards" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              size: "sm",
              onClick: () => setShowLogForm((v) => !v),
              "data-ocid": "objectives.log_activity_button",
              className: "gap-2 bg-accent text-accent-foreground hover:bg-accent/90",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 14 }),
                "Log Activity"
              ]
            }
          )
        ] }),
        showLogForm && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "mb-6 rounded-xl border border-accent/20 bg-card p-5",
            "data-ocid": "objectives.log_form",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mb-4 font-display text-sm font-semibold text-foreground", children: "Log New Activity" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 sm:grid-cols-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs text-muted-foreground", children: "Sport" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "select",
                    {
                      value: logSport,
                      onChange: (e) => setLogSport(e.target.value),
                      "data-ocid": "objectives.sport_select",
                      className: "mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Select sport..." }),
                        (sports ?? []).map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: s, children: s }, s))
                      ]
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs text-muted-foreground", children: "Type" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1 flex gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "button",
                      {
                        type: "button",
                        onClick: () => setLogType(ActivityType.group),
                        "data-ocid": "objectives.type_group_toggle",
                        className: `flex flex-1 items-center justify-center gap-1.5 rounded-lg border py-2 text-xs font-medium transition-smooth ${logType === ActivityType.group ? "border-accent bg-accent/15 text-accent" : "border-border text-muted-foreground"}`,
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
                        "data-ocid": "objectives.type_solo_toggle",
                        className: `flex flex-1 items-center justify-center gap-1.5 rounded-lg border py-2 text-xs font-medium transition-smooth ${logType === ActivityType.solo ? "border-primary bg-primary/15 text-primary" : "border-border text-muted-foreground"}`,
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
                      "data-ocid": "objectives.notes_input",
                      className: "mt-1"
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    onClick: handleLogActivity,
                    disabled: logActivity.isPending || !logSport,
                    "data-ocid": "objectives.submit_log_button",
                    className: "bg-accent text-accent-foreground hover:bg-accent/90",
                    children: logActivity.isPending ? "Logging..." : "Save Activity"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    variant: "ghost",
                    onClick: () => setShowLogForm(false),
                    "data-ocid": "objectives.cancel_log_button",
                    children: "Cancel"
                  }
                )
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-5 flex gap-1 rounded-xl border border-border bg-muted/30 p-1", children: ["available", "my"].map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => setTab(t),
            "data-ocid": `objectives.${t}.tab`,
            className: `flex-1 rounded-lg py-2 text-sm font-semibold transition-smooth ${tab === t ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`,
            children: t === "available" ? "Available" : `My Objectives (${myAcceptedObjectives.length})`
          },
          t
        )) }),
        tab === "available" && (objectivesLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-48 w-full rounded-xl" }, i)) }) : availableObjectives.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            "data-ocid": "objectives.available.empty_state",
            className: "flex flex-col items-center justify-center py-20 text-center",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-lg font-semibold text-foreground", children: "No active objectives" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: "Check back soon for new challenges." })
            ]
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
            "data-ocid": "objectives.available.list",
            children: availableObjectives.map((obj, i) => {
              var _a;
              return /* @__PURE__ */ jsxRuntimeExports.jsx(
                ObjectiveCard,
                {
                  objective: obj,
                  userObjective: (_a = (myObjectives ?? []).find(
                    ([, uo]) => String(uo.objectiveId) === String(obj.id)
                  )) == null ? void 0 : _a[1],
                  onAccept: !acceptedIds.has(String(obj.id)) ? handleAccept : void 0,
                  isAccepting: acceptObjective.isPending,
                  index: i
                },
                String(obj.id)
              );
            })
          }
        )),
        tab === "my" && (myObjectivesLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: [1, 2].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-32 w-full rounded-xl" }, i)) }) : myAcceptedObjectives.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            "data-ocid": "objectives.my.empty_state",
            className: "flex flex-col items-center justify-center py-20 text-center",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-lg font-semibold text-foreground", children: "No challenges accepted yet" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: "Browse Available tab to accept your first challenge!" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  size: "sm",
                  onClick: () => setTab("available"),
                  "data-ocid": "objectives.my.browse_button",
                  className: "mt-4 bg-accent text-accent-foreground hover:bg-accent/90",
                  children: "Browse Challenges"
                }
              )
            ]
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", "data-ocid": "objectives.my.list", children: myAcceptedObjectives.map(([teamObj, userObj], i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            "data-ocid": `objectives.my.item.${i + 1}`,
            className: `rounded-xl border p-4 transition-smooth ${teamObj.status === ObjectiveStatus.completed ? "border-accent/30 bg-accent/5" : "border-border bg-card"}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-1 flex items-center gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded bg-primary/20 px-2 py-0.5 text-xs font-medium text-primary", children: teamObj.sport }),
                    teamObj.status === ObjectiveStatus.completed && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex items-center gap-1 text-xs font-medium text-accent", children: "🎉 Completed!" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-sm font-bold text-foreground", children: teamObj.title }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-0.5 text-xs text-muted-foreground", children: teamObj.description }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-1 flex items-center justify-between text-xs", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground", children: [
                        "Your progress: ",
                        Number(userObj.progress),
                        " /",
                        " ",
                        Number(teamObj.targetCount)
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "span",
                        {
                          className: `font-semibold ${Number(userObj.progress) >= Number(teamObj.targetCount) ? "text-accent" : "text-muted-foreground"}`,
                          children: [
                            Math.round(
                              Math.min(
                                100,
                                Number(userObj.progress) / Number(teamObj.targetCount) * 100
                              )
                            ),
                            "%"
                          ]
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2 overflow-hidden rounded-full bg-muted", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: `h-full rounded-full transition-all duration-700 ${Number(userObj.progress) >= Number(teamObj.targetCount) ? "bg-accent" : "bg-gradient-to-r from-primary to-accent"}`,
                        style: {
                          width: `${Math.min(100, Number(userObj.progress) / Number(teamObj.targetCount) * 100)}%`
                        }
                      }
                    ) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2 overflow-hidden rounded-full bg-muted", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: "h-full rounded-full transition-all duration-700",
                        style: {
                          width: `${Math.min(100, Number(userObj.progress) / Number(teamObj.targetCount) * 100)}%`,
                          background: Number(userObj.progress) >= Number(teamObj.targetCount) ? "oklch(0.75 0.26 45)" : "linear-gradient(90deg, oklch(0.55 0.18 250), oklch(0.65 0.25 45))"
                        }
                      }
                    ) })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl", role: "img", "aria-label": "badge", children: teamObj.rewardBadge }) }),
                  teamObj.status === ObjectiveStatus.completed && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium text-accent", children: "Earned!" })
                ] })
              ] }),
              teamObj.status === ObjectiveStatus.completed && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 rounded-lg bg-accent/10 px-3 py-2 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-display text-xs font-semibold text-accent", children: [
                "🏆 ",
                teamObj.rewardText
              ] }) })
            ]
          },
          String(userObj.objectiveId)
        )) })),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-10", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mb-4 font-display text-lg font-bold text-foreground", children: "Activity History" }),
          activitiesLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-14 w-full rounded-xl" }, i)) }) : (activities ?? []).length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              "data-ocid": "objectives.activities.empty_state",
              className: "rounded-xl border border-dashed border-border py-10 text-center",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "No activities yet. Log your first!" })
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", "data-ocid": "objectives.activities.list", children: (activities ?? []).map((activity, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            ActivityItem,
            {
              activity,
              index: i
            },
            String(activity.id)
          )) })
        ] })
      ]
    }
  );
}
export {
  ObjectivesPage as default
};
