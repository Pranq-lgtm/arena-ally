import { BadgeIcon } from "@/components/BadgeIcon";
import { SocialBatteryRing } from "@/components/SocialBatteryRing";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { useActivities, useSocialBattery } from "@/hooks/use-activities";
import { useMyObjectives } from "@/hooks/use-objectives";
import {
  useAvailableSports,
  useProfile,
  useSaveProfile,
} from "@/hooks/use-profile";
import { ObjectiveStatus } from "@/types";
import { Check, Edit2, Save, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const EARNED_BADGES = [
  { emoji: "🏆", label: "First Win" },
  { emoji: "🤝", label: "Team Player" },
  { emoji: "⚡", label: "Charged Up" },
  { emoji: "🎯", label: "On Target" },
];

export default function ProfilePage() {
  const { data: profile, isLoading } = useProfile();
  const { data: batteryRaw } = useSocialBattery();
  const { data: activities } = useActivities();
  const { data: myObjectives } = useMyObjectives();
  const { data: availableSports } = useAvailableSports();
  const saveProfile = useSaveProfile();

  const [editing, setEditing] = useState(false);
  const [editName, setEditName] = useState("");
  const [editSports, setEditSports] = useState<string[]>([]);

  const battery = batteryRaw !== undefined ? Number(batteryRaw) : null;
  const completedObjectives = (myObjectives ?? []).filter(
    ([obj]) => obj.status === ObjectiveStatus.completed,
  ).length;

  function startEdit() {
    setEditName(profile?.name ?? "");
    setEditSports(profile?.sports ?? []);
    setEditing(true);
  }

  function toggleSport(sport: string) {
    setEditSports((prev) =>
      prev.includes(sport) ? prev.filter((s) => s !== sport) : [...prev, sport],
    );
  }

  async function handleSave() {
    if (!editName.trim()) {
      toast.error("Name cannot be empty.");
      return;
    }
    try {
      await saveProfile.mutateAsync({
        name: editName.trim(),
        sports: editSports,
        onboardingComplete: true,
      });
      toast.success("Profile updated!");
      setEditing(false);
    } catch {
      toast.error("Failed to update profile.");
    }
  }

  if (isLoading) {
    return (
      <div className="p-6 space-y-4">
        <Skeleton className="h-32 w-full rounded-xl" />
        <Skeleton className="h-48 w-full rounded-xl" />
      </div>
    );
  }

  return (
    <div
      className="min-h-full bg-background p-4 lg:p-6"
      data-ocid="profile.page"
    >
      <div className="mx-auto max-w-2xl space-y-5">
        {/* Profile Card */}
        <div
          className="rounded-xl border border-border bg-card p-6"
          data-ocid="profile.info_card"
        >
          <div className="mb-4 flex items-start justify-between">
            <h1 className="font-display text-2xl font-bold text-foreground">
              My Profile
            </h1>
            {!editing ? (
              <Button
                variant="ghost"
                size="sm"
                onClick={startEdit}
                data-ocid="profile.edit_button"
                className="gap-2 text-muted-foreground hover:text-foreground"
              >
                <Edit2 size={14} /> Edit
              </Button>
            ) : (
              <div className="flex gap-2">
                <Button
                  size="sm"
                  onClick={handleSave}
                  disabled={saveProfile.isPending}
                  data-ocid="profile.save_button"
                  className="gap-1.5 bg-accent text-accent-foreground hover:bg-accent/90"
                >
                  <Save size={14} />
                  {saveProfile.isPending ? "Saving..." : "Save"}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setEditing(false)}
                  data-ocid="profile.cancel_button"
                >
                  <X size={14} />
                </Button>
              </div>
            )}
          </div>

          {/* Avatar + Name */}
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/20 text-2xl font-bold text-primary">
              {(profile?.name ?? "A")[0].toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              {editing ? (
                <div>
                  <Label className="text-xs text-muted-foreground">Name</Label>
                  <Input
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    data-ocid="profile.name_input"
                    className="mt-1"
                  />
                </div>
              ) : (
                <>
                  <p className="font-display text-xl font-bold text-foreground">
                    {profile?.name}
                  </p>
                  <p className="text-sm text-muted-foreground">Athlete</p>
                </>
              )}
            </div>
          </div>

          {/* Stats */}
          <div className="mt-5 grid grid-cols-3 gap-3">
            {[
              {
                label: "Social Battery",
                value: battery !== null ? `${battery}%` : "—",
              },
              {
                label: "Activities",
                value: activities ? String(activities.length) : "—",
              },
              { label: "Completed", value: String(completedObjectives) },
            ].map(({ label, value }) => (
              <div
                key={label}
                className="rounded-lg bg-muted/40 p-3 text-center"
              >
                <div className="font-display text-xl font-bold text-foreground">
                  {value}
                </div>
                <div className="text-xs text-muted-foreground">{label}</div>
              </div>
            ))}
          </div>

          {/* Sports */}
          <div className="mt-5">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Sports
            </p>
            {editing ? (
              <div className="flex flex-wrap gap-2">
                {(availableSports ?? []).map((sport) => {
                  const sel = editSports.includes(sport);
                  return (
                    <button
                      key={sport}
                      type="button"
                      onClick={() => toggleSport(sport)}
                      data-ocid={`profile.sport_toggle.${sport.toLowerCase()}`}
                      className={`flex items-center gap-1.5 rounded-full border px-3 py-1 text-sm transition-smooth ${
                        sel
                          ? "border-accent bg-accent/15 text-accent"
                          : "border-border text-muted-foreground hover:border-accent/50"
                      }`}
                    >
                      {sel && <Check size={11} />}
                      {sport}
                    </button>
                  );
                })}
              </div>
            ) : (
              <div className="flex flex-wrap gap-2">
                {(profile?.sports ?? []).map((s) => (
                  <span
                    key={s}
                    className="rounded-full bg-primary/15 px-3 py-1 text-xs font-medium text-primary"
                  >
                    {s}
                  </span>
                ))}
                {(profile?.sports ?? []).length === 0 && (
                  <span className="text-sm text-muted-foreground">
                    No sports selected
                  </span>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Social Battery */}
        {battery !== null && (
          <div
            className="rounded-xl border border-border bg-card p-6"
            data-ocid="profile.battery_card"
          >
            <h2 className="mb-4 font-display text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Social Battery
            </h2>
            <div className="flex justify-center">
              <SocialBatteryRing value={battery} size={160} />
            </div>
          </div>
        )}

        {/* Badges */}
        <div
          className="rounded-xl border border-border bg-card p-6"
          data-ocid="profile.badges_card"
        >
          <h2 className="mb-4 font-display text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Achievement Badges
          </h2>
          <div className="flex flex-wrap gap-4">
            {EARNED_BADGES.map((b) => (
              <BadgeIcon
                key={b.label}
                emoji={b.emoji}
                label={b.label}
                size="md"
                earned
                glow
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
