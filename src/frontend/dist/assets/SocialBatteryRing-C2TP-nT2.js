import { c as createLucideIcon, j as jsxRuntimeExports } from "./index-fRB1Ra1u.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
  ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
];
const X = createLucideIcon("x", __iconNode);
function getBatteryColor(value) {
  if (value >= 70) return "oklch(0.75 0.26 45)";
  if (value >= 40) return "oklch(0.75 0.22 80)";
  return "oklch(0.65 0.22 25)";
}
function getBatteryLabel(value) {
  if (value >= 80) return "Fully Charged";
  if (value >= 60) return "Feeling Social";
  if (value >= 40) return "Recharging";
  if (value >= 20) return "Low Energy";
  return "Burnout Risk";
}
function getBatteryMessage(value) {
  if (value >= 80) return "Connect with your team.";
  if (value >= 60) return "Great time to join group sessions.";
  if (value >= 40) return "Mix solo and group activities.";
  if (value >= 20) return "Prioritize recovery & rest.";
  return "Seek support — you need connection.";
}
function SocialBatteryRing({
  value,
  size = 180,
  strokeWidth = 14,
  showLabel = true
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const arcLength = circumference * 0.75;
  const progress = value / 100 * arcLength;
  const color = getBatteryColor(value);
  const center = size / 2;
  const rotation = 135;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", style: { width: size, height: size }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "svg",
        {
          width: size,
          height: size,
          viewBox: `0 0 ${size} ${size}`,
          "aria-label": `Social Battery: ${value}%`,
          role: "img",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("defs", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "linearGradient",
              {
                id: "battery-gradient",
                x1: "0%",
                y1: "0%",
                x2: "100%",
                y2: "0%",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "0%", stopColor: "oklch(0.65 0.22 25)" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "50%", stopColor: "oklch(0.75 0.22 80)" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "100%", stopColor: "oklch(0.75 0.26 45)" })
                ]
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "circle",
              {
                cx: center,
                cy: center,
                r: radius,
                fill: "none",
                stroke: "oklch(0.22 0 0)",
                strokeWidth,
                strokeDasharray: `${arcLength} ${circumference - arcLength}`,
                strokeLinecap: "round",
                transform: `rotate(${rotation} ${center} ${center})`
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "circle",
              {
                cx: center,
                cy: center,
                r: radius,
                fill: "none",
                stroke: color,
                strokeWidth,
                strokeDasharray: `${progress} ${circumference}`,
                strokeLinecap: "round",
                transform: `rotate(${rotation} ${center} ${center})`,
                style: {
                  transition: "stroke-dasharray 0.8s cubic-bezier(0.4, 0, 0.2, 1)"
                }
              }
            )
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "absolute inset-0 flex flex-col items-center justify-center",
          style: { top: strokeWidth },
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-display text-3xl font-bold", style: { color }, children: [
            value,
            "%"
          ] })
        }
      )
    ] }),
    showLabel && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-lg font-semibold text-foreground", children: getBatteryLabel(value) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: getBatteryMessage(value) })
    ] })
  ] });
}
export {
  SocialBatteryRing as S,
  X
};
