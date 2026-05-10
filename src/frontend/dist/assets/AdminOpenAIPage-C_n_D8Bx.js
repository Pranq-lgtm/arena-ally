import { c as createLucideIcon, n as useIsAdmin, r as reactExports, j as jsxRuntimeExports, N as Navigate, S as ShieldCheck, B as Button, f as ue } from "./index-fRB1Ra1u.js";
import { L as Label, I as Input } from "./label-BL4Q4ZkO.js";
import { b as useOpenAIConfig, c as useSetOpenAIKey, T as TriangleAlert } from "./use-wellness-Qps0J2q-.js";
import { C as CircleCheck } from "./circle-check-CQ-CPb_p.js";
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
      d: "M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z",
      key: "1s6t7t"
    }
  ],
  ["circle", { cx: "16.5", cy: "7.5", r: ".5", fill: "currentColor", key: "w0ekpg" }]
];
const KeyRound = createLucideIcon("key-round", __iconNode);
function AdminOpenAIPage() {
  const { data: isAdmin, isLoading: adminLoading } = useIsAdmin();
  const { data: isConfigured, isLoading: configLoading } = useOpenAIConfig();
  const setKey = useSetOpenAIKey();
  const [apiKey, setApiKey] = reactExports.useState("");
  const [revealed, setRevealed] = reactExports.useState(false);
  if (!adminLoading && !isAdmin) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Navigate, { to: "/dashboard" });
  }
  async function handleSave() {
    if (!apiKey.trim()) {
      ue.error("Enter your OpenAI API key.");
      return;
    }
    try {
      await setKey.mutateAsync(apiKey.trim());
      ue.success("API key saved!");
      setApiKey("");
    } catch {
      ue.error("Failed to save API key.");
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-full bg-background p-4 lg:p-6", "data-ocid": "admin.page", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-lg", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6 flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-10 w-10 items-center justify-center rounded-xl bg-primary/20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { size: 20, className: "text-primary" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-bold text-foreground", children: "Admin Settings" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "OpenAI Configuration" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-5 rounded-xl border border-border bg-card p-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
      configLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-5 w-5 animate-spin rounded-full border-2 border-border border-t-accent" }) : isConfigured ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { size: 20, className: "text-accent flex-shrink-0" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
        TriangleAlert,
        {
          size: 20,
          className: "text-destructive flex-shrink-0"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-sm font-semibold text-foreground", children: isConfigured ? "API Key Configured" : "No API Key Set" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: isConfigured ? "AI Wellness Coach is active and ready." : "Set your OpenAI API key to enable the AI Wellness Coach." })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border bg-card p-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4 flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(KeyRound, { size: 16, className: "text-muted-foreground" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-sm font-semibold text-foreground", children: "Set OpenAI API Key" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "apikey", className: "text-xs text-muted-foreground", children: "API Key (starts with sk-...)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mt-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "apikey",
                type: revealed ? "text" : "password",
                value: apiKey,
                onChange: (e) => setApiKey(e.target.value),
                placeholder: "sk-...",
                "data-ocid": "admin.apikey_input",
                className: "pr-20"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => setRevealed((v) => !v),
                "data-ocid": "admin.toggle_reveal_button",
                className: "absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground hover:text-foreground",
                children: revealed ? "Hide" : "Show"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg bg-muted/40 p-3 text-xs text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground", children: "Security note" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1", children: "Your API key is stored securely on the Internet Computer and never exposed to clients. It is only used for server-side AI calls." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            onClick: handleSave,
            disabled: setKey.isPending || !apiKey.trim(),
            "data-ocid": "admin.save_button",
            className: "w-full bg-accent text-accent-foreground hover:bg-accent/90",
            children: setKey.isPending ? "Saving..." : "Save API Key"
          }
        )
      ] })
    ] })
  ] }) });
}
export {
  AdminOpenAIPage as default
};
