import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  useAvailableSports,
  useProfile,
  useSaveProfile,
} from "@/hooks/use-profile";
import { useNavigate } from "@tanstack/react-router";
import { Check, ChevronRight, Zap } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

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
  "Gym",
];

export default function OnboardingPage() {
  const navigate = useNavigate();
  const { data: profile } = useProfile();
  const { data: availableSports } = useAvailableSports();
  const saveProfile = useSaveProfile();

  const [name, setName] = useState(profile?.name ?? "");
  const [selectedSports, setSelectedSports] = useState<string[]>(
    profile?.sports ?? [],
  );
  const [step, setStep] = useState<1 | 2>(1);

  const sports = availableSports ?? FALLBACK_SPORTS;

  function toggleSport(sport: string) {
    setSelectedSports((prev) =>
      prev.includes(sport) ? prev.filter((s) => s !== sport) : [...prev, sport],
    );
  }

  async function handleComplete() {
    if (!name.trim()) {
      toast.error("Please enter your name.");
      return;
    }
    if (selectedSports.length === 0) {
      toast.error("Select at least one sport.");
      return;
    }
    try {
      await saveProfile.mutateAsync({
        name: name.trim(),
        sports: selectedSports,
        onboardingComplete: true,
      });
      toast.success("Welcome to the Arena!");
      navigate({ to: "/dashboard" });
    } catch {
      toast.error("Failed to save profile. Please try again.");
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-6">
      <div
        className="pointer-events-none fixed inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 0%, oklch(0.35 0.15 250 / 0.2) 0%, transparent 70%)",
        }}
      />
      <div className="relative w-full max-w-md animate-scale-in">
        {/* Logo */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-accent">
            <Zap size={28} className="text-accent-foreground" />
          </div>
          <h1 className="font-display text-2xl font-bold text-foreground">
            Join the Arena
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {step === 1
              ? "What should we call you?"
              : "Which sports are you into?"}
          </p>
        </div>

        {/* Step indicator */}
        <div className="mb-8 flex items-center justify-center gap-2">
          {[1, 2].map((s) => (
            <div
              key={s}
              className={`h-2 rounded-full transition-all duration-300 ${
                s === step
                  ? "w-8 bg-accent"
                  : s < step
                    ? "w-4 bg-accent/50"
                    : "w-4 bg-muted"
              }`}
            />
          ))}
        </div>

        <div className="rounded-2xl border border-border bg-card p-6">
          {step === 1 ? (
            <div className="space-y-4">
              <div>
                <Label
                  htmlFor="name"
                  className="font-display text-sm font-semibold"
                >
                  Your Name
                </Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Alex Rivera"
                  data-ocid="onboarding.name_input"
                  className="mt-2"
                  onKeyDown={(e) =>
                    e.key === "Enter" && name.trim() && setStep(2)
                  }
                />
              </div>
              <Button
                onClick={() => setStep(2)}
                disabled={!name.trim()}
                data-ocid="onboarding.next_button"
                className="w-full gap-2 bg-accent text-accent-foreground hover:bg-accent/90"
              >
                Next <ChevronRight size={16} />
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {sports.map((sport) => {
                  const selected = selectedSports.includes(sport);
                  return (
                    <button
                      key={sport}
                      type="button"
                      onClick={() => toggleSport(sport)}
                      data-ocid={`onboarding.sport_toggle.${sport.toLowerCase()}`}
                      className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-medium transition-smooth ${
                        selected
                          ? "border-accent bg-accent/15 text-accent"
                          : "border-border bg-muted/30 text-muted-foreground hover:border-accent/50 hover:text-foreground"
                      }`}
                    >
                      {selected && <Check size={12} />}
                      {sport}
                    </button>
                  );
                })}
              </div>
              <p className="text-xs text-muted-foreground">
                {selectedSports.length} selected
              </p>
              <div className="flex gap-3">
                <Button
                  variant="ghost"
                  onClick={() => setStep(1)}
                  data-ocid="onboarding.back_button"
                  className="flex-1"
                >
                  Back
                </Button>
                <Button
                  onClick={handleComplete}
                  disabled={
                    selectedSports.length === 0 || saveProfile.isPending
                  }
                  data-ocid="onboarding.submit_button"
                  className="flex-1 bg-accent text-accent-foreground hover:bg-accent/90"
                >
                  {saveProfile.isPending ? "Saving..." : "Enter Arena"}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
