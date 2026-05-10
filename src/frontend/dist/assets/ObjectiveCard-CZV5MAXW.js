import { c as createLucideIcon, j as jsxRuntimeExports, U as User, B as Button } from "./index-fRB1Ra1u.js";
import { A as ActivityType, O as ObjectiveStatus } from "./use-objectives-CXyWEVek.js";
import { U as Users } from "./users-DQZAbzPP.js";
import { C as CircleCheck } from "./circle-check-CQ-CPb_p.js";
import { Z as Zap } from "./zap-J9OcsS04.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "M12 5v14", key: "s699le" }]
];
const Plus = createLucideIcon("plus", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M6 9H4.5a2.5 2.5 0 0 1 0-5H6", key: "17hqa7" }],
  ["path", { d: "M18 9h1.5a2.5 2.5 0 0 0 0-5H18", key: "lmptdp" }],
  ["path", { d: "M4 22h16", key: "57wxv0" }],
  ["path", { d: "M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22", key: "1nw9bq" }],
  ["path", { d: "M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22", key: "1np0yb" }],
  ["path", { d: "M18 2H6v7a6 6 0 0 0 12 0V2Z", key: "u46fv3" }]
];
const Trophy = createLucideIcon("trophy", __iconNode);
const SPORT_EMOJI = {
  Basketball: "🏀",
  Football: "⚽",
  Tennis: "🎾",
  Running: "🏃",
  Cycling: "🚴",
  Swimming: "🏊",
  Volleyball: "🏐",
  Badminton: "🏸",
  "Table Tennis": "🏓",
  Boxing: "🥊",
  Yoga: "🧘",
  Gym: "🏋️",
  Hiking: "🥾",
  default: "🏅"
};
function formatTimestamp(timestamp) {
  const ms = Number(timestamp) / 1e6;
  const date = new Date(ms);
  const now = /* @__PURE__ */ new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffHours = diffMs / (1e3 * 60 * 60);
  const diffDays = diffHours / 24;
  if (diffHours < 1) return "Just now";
  if (diffHours < 24) return `${Math.floor(diffHours)}h ago`;
  if (diffDays < 7) return `${Math.floor(diffDays)}d ago`;
  return date.toLocaleDateString();
}
function ActivityItem({ activity, index = 0 }) {
  const emoji = SPORT_EMOJI[activity.sport] ?? SPORT_EMOJI.default;
  const isGroup = activity.activityType === ActivityType.group;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "data-ocid": `activity.item.${index + 1}`,
      className: "flex items-center gap-3 rounded-xl border border-border bg-card/60 p-3 transition-smooth hover:bg-card",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-muted text-xl", children: emoji }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-sm font-semibold text-foreground", children: activity.sport }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "span",
              {
                className: `flex items-center gap-1 rounded px-1.5 py-0.5 text-xs font-medium ${isGroup ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"}`,
                children: [
                  isGroup ? /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { size: 10 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(User, { size: 10 }),
                  isGroup ? "Group" : "Solo"
                ]
              }
            )
          ] }),
          activity.notes && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-0.5 truncate text-xs text-muted-foreground", children: activity.notes })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex-shrink-0 text-xs text-muted-foreground", children: formatTimestamp(activity.timestamp) })
      ]
    }
  );
}
function ObjectiveCard({
  objective,
  userObjective,
  onAccept,
  isAccepting,
  index = 0
}) {
  const isAccepted = !!userObjective;
  const isCompleted = objective.status === ObjectiveStatus.completed;
  const target = Number(objective.targetCount);
  const current = isAccepted ? Number(userObjective.progress) : Number(objective.currentProgress);
  const progressPct = target > 0 ? Math.min(100, current / target * 100) : 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "data-ocid": `objective.card.${index + 1}`,
      className: `rounded-xl border p-4 transition-smooth ${isCompleted ? "border-accent/30 bg-accent/5" : "border-border bg-card hover:border-border/80 hover:bg-card/80"}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-3 flex items-start justify-between gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-1 flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded bg-primary/20 px-2 py-0.5 text-xs font-medium text-primary", children: objective.sport }),
              isCompleted && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 text-xs font-medium text-accent", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { size: 12 }),
                "Completed"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "truncate font-display text-sm font-semibold text-foreground", children: objective.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-0.5 text-xs text-muted-foreground line-clamp-2", children: objective.description })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-shrink-0 flex-col items-center gap-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl", role: "img", "aria-label": "reward badge", children: objective.rewardBadge }) }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-1 flex items-center justify-between text-xs", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground", children: [
              current,
              " / ",
              target
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "span",
              {
                className: `font-medium ${progressPct >= 100 ? "text-accent" : "text-muted-foreground"}`,
                children: [
                  Math.round(progressPct),
                  "%"
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2 overflow-hidden rounded-full bg-muted", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: `h-full rounded-full transition-all duration-700 ${progressPct >= 100 ? "bg-accent" : "bg-gradient-to-r from-primary to-accent"}`,
              style: { width: `${progressPct}%` }
            }
          ) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-3 flex items-center gap-2 rounded-lg bg-muted/40 px-3 py-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { size: 14, className: "text-accent flex-shrink-0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: objective.rewardText })
        ] }),
        !isCompleted && !isAccepted && onAccept && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            size: "sm",
            onClick: () => onAccept(objective.id),
            disabled: isAccepting,
            "data-ocid": `objective.accept_button.${index + 1}`,
            className: "w-full gap-2 bg-accent text-accent-foreground hover:bg-accent/90",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { size: 14 }),
              isAccepting ? "Joining..." : "Accept Challenge"
            ]
          }
        ),
        isAccepted && !isCompleted && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex items-center justify-center gap-2 rounded-lg bg-primary/10 py-2 text-xs font-medium text-primary",
            "data-ocid": `objective.accepted_badge.${index + 1}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { size: 12 }),
              "In Progress"
            ]
          }
        )
      ]
    }
  );
}
export {
  ActivityItem as A,
  ObjectiveCard as O,
  Plus as P
};
