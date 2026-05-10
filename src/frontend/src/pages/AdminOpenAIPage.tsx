import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useIsAdmin } from "@/hooks/use-profile";
import { useOpenAIConfig, useSetOpenAIKey } from "@/hooks/use-wellness";
import { Navigate } from "@tanstack/react-router";
import {
  AlertTriangle,
  CheckCircle2,
  KeyRound,
  ShieldCheck,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function AdminOpenAIPage() {
  const { data: isAdmin, isLoading: adminLoading } = useIsAdmin();
  const { data: isConfigured, isLoading: configLoading } = useOpenAIConfig();
  const setKey = useSetOpenAIKey();

  const [apiKey, setApiKey] = useState("");
  const [revealed, setRevealed] = useState(false);

  if (!adminLoading && !isAdmin) {
    return <Navigate to="/dashboard" />;
  }

  async function handleSave() {
    if (!apiKey.trim()) {
      toast.error("Enter your OpenAI API key.");
      return;
    }
    try {
      await setKey.mutateAsync(apiKey.trim());
      toast.success("API key saved!");
      setApiKey("");
    } catch {
      toast.error("Failed to save API key.");
    }
  }

  return (
    <div className="min-h-full bg-background p-4 lg:p-6" data-ocid="admin.page">
      <div className="mx-auto max-w-lg">
        {/* Header */}
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/20">
            <ShieldCheck size={20} className="text-primary" />
          </div>
          <div>
            <h1 className="font-display text-2xl font-bold text-foreground">
              Admin Settings
            </h1>
            <p className="text-sm text-muted-foreground">
              OpenAI Configuration
            </p>
          </div>
        </div>

        {/* Status Card */}
        <div className="mb-5 rounded-xl border border-border bg-card p-5">
          <div className="flex items-center gap-3">
            {configLoading ? (
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-border border-t-accent" />
            ) : isConfigured ? (
              <CheckCircle2 size={20} className="text-accent flex-shrink-0" />
            ) : (
              <AlertTriangle
                size={20}
                className="text-destructive flex-shrink-0"
              />
            )}
            <div>
              <p className="font-display text-sm font-semibold text-foreground">
                {isConfigured ? "API Key Configured" : "No API Key Set"}
              </p>
              <p className="text-xs text-muted-foreground">
                {isConfigured
                  ? "AI Wellness Coach is active and ready."
                  : "Set your OpenAI API key to enable the AI Wellness Coach."}
              </p>
            </div>
          </div>
        </div>

        {/* Key Entry */}
        <div className="rounded-xl border border-border bg-card p-5">
          <div className="mb-4 flex items-center gap-2">
            <KeyRound size={16} className="text-muted-foreground" />
            <h2 className="font-display text-sm font-semibold text-foreground">
              Set OpenAI API Key
            </h2>
          </div>

          <div className="space-y-4">
            <div>
              <Label htmlFor="apikey" className="text-xs text-muted-foreground">
                API Key (starts with sk-...)
              </Label>
              <div className="relative mt-1">
                <Input
                  id="apikey"
                  type={revealed ? "text" : "password"}
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="sk-..."
                  data-ocid="admin.apikey_input"
                  className="pr-20"
                />
                <button
                  type="button"
                  onClick={() => setRevealed((v) => !v)}
                  data-ocid="admin.toggle_reveal_button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground hover:text-foreground"
                >
                  {revealed ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <div className="rounded-lg bg-muted/40 p-3 text-xs text-muted-foreground">
              <p className="font-semibold text-foreground">Security note</p>
              <p className="mt-1">
                Your API key is stored securely on the Internet Computer and
                never exposed to clients. It is only used for server-side AI
                calls.
              </p>
            </div>

            <Button
              onClick={handleSave}
              disabled={setKey.isPending || !apiKey.trim()}
              data-ocid="admin.save_button"
              className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
            >
              {setKey.isPending ? "Saving..." : "Save API Key"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
