import { ActivityItem } from "@/components/ActivityItem";
import { ObjectiveCard } from "@/components/ObjectiveCard";
import { SocialBatteryRing } from "@/components/SocialBatteryRing";
import { WellnessTipCard } from "@/components/WellnessTipCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import {
  useActivities,
  useLogActivity,
  useSocialBattery,
} from "@/hooks/use-activities";
import {
  useAcceptObjective,
  useMyObjectives,
  useObjectives,
} from "@/hooks/use-objectives";
import { useAvailableSports, useProfile } from "@/hooks/use-profile";
import { useRefreshWellnessTip, useWellnessTip } from "@/hooks/use-wellness";
import { ActivityType, ObjectiveStatus } from "@/types";
import { useNavigate } from "@tanstack/react-router";
import {
  Activity,
  AlertTriangle,
  ChevronRight,
  Plus,
  User,
  Users,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function DashboardPage() {
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

  const [showLogModal, setShowLogModal] = useState(false);
  const [logSport, setLogSport] = useState("");
  const [logType, setLogType] = useState<ActivityType>(ActivityType.group);
  const [logNotes, setLogNotes] = useState("");

  const battery = batteryRaw !== undefined ? Number(batteryRaw) : null;
  const isLowBattery = battery !== null && battery < 40;

  useEffect(() => {
    if (profile && !profile.onboardingComplete) {
      navigate({ to: "/onboarding" });
    }
  }, [profile, navigate]);

  async function handleAccept(id: bigint) {
    try {
      await acceptObjective.mutateAsync(id);
      toast.success("Challenge accepted! Let's go! 🎯");
    } catch {
      toast.error("Failed to accept challenge.");
    }
  }

  async function handleRefreshTip() {
    try {
      await refreshTip.mutateAsync();
      toast.success("Wellness tip refreshed!");
    } catch {
      toast.error("Could not refresh tip.");
    }
  }

  async function handleLogActivity() {
    if (!logSport) {
      toast.error("Select a sport.");
      return;
    }
    try {
      await logActivity.mutateAsync({
        sport: logSport,
        activityType: logType,
        notes: logNotes,
      });
      toast.success("Activity logged! Social Battery updated. 🔋");
      setLogSport("");
      setLogNotes("");
      setShowLogModal(false);
    } catch {
      toast.error("Failed to log activity.");
    }
  }

  const acceptedIds = new Set(
    (myObjectives ?? []).map(([, uo]) => String(uo.objectiveId)),
  );
  const activeObjectives = (objectives ?? [])
    .filter((o) => o.status === ObjectiveStatus.active)
    .slice(0, 3);
  const recentActivities = (activities ?? []).slice(0, 5);

  return (
    <div
      className="min-h-full bg-background p-4 lg:p-6"
      data-ocid="dashboard.page"
    >
      {/* Well-being risk banner */}
      {isLowBattery && (
        <div
          data-ocid="dashboard.low_battery_alert"
          className="mb-5 flex items-start gap-3 rounded-xl border border-destructive/30 bg-destructive/8 p-4"
        >
          <AlertTriangle
            size={18}
            className="mt-0.5 flex-shrink-0 text-destructive"
          />
          <div>
            <p className="font-display text-sm font-semibold text-foreground">
              Your Social Battery is low
            </p>
            <p className="text-xs text-muted-foreground">
              Try joining a group activity this week — even a short session
              helps recharge your social energy.
            </p>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">
            {profileLoading ? (
              <Skeleton className="h-8 w-40" />
            ) : (
              <>Hey, {profile?.name?.split(" ")[0] ?? "Athlete"} 👋</>
            )}
          </h1>
          <p className="text-sm text-muted-foreground">
            Your arena at a glance
          </p>
        </div>
        <Button
          size="sm"
          onClick={() => setShowLogModal(true)}
          data-ocid="dashboard.log_activity_button"
          className="gap-2 bg-accent text-accent-foreground hover:bg-accent/90"
        >
          <Plus size={14} />
          Log Activity
        </Button>
      </div>

      {/* Log Activity Modal */}
      {showLogModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4"
          data-ocid="dashboard.log_modal"
        >
          <div className="w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-lg">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-display text-lg font-bold text-foreground">
                Log Activity
              </h2>
              <button
                type="button"
                onClick={() => setShowLogModal(false)}
                data-ocid="dashboard.log_modal_close_button"
                className="rounded-lg p-1 text-muted-foreground hover:text-foreground"
              >
                <X size={16} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <Label className="text-xs text-muted-foreground">Sport</Label>
                <select
                  value={logSport}
                  onChange={(e) => setLogSport(e.target.value)}
                  data-ocid="dashboard.log_sport_select"
                  className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="">Select sport...</option>
                  {(sports ?? []).map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <Label className="text-xs text-muted-foreground">
                  Activity Type
                </Label>
                <div className="mt-1 flex gap-2">
                  <button
                    type="button"
                    onClick={() => setLogType(ActivityType.group)}
                    data-ocid="dashboard.log_type_group_toggle"
                    className={`flex flex-1 items-center justify-center gap-1.5 rounded-lg border py-2 text-xs font-medium transition-smooth ${
                      logType === ActivityType.group
                        ? "border-accent bg-accent/15 text-accent"
                        : "border-border text-muted-foreground hover:border-accent/40"
                    }`}
                  >
                    <Users size={12} /> Group
                  </button>
                  <button
                    type="button"
                    onClick={() => setLogType(ActivityType.solo)}
                    data-ocid="dashboard.log_type_solo_toggle"
                    className={`flex flex-1 items-center justify-center gap-1.5 rounded-lg border py-2 text-xs font-medium transition-smooth ${
                      logType === ActivityType.solo
                        ? "border-primary bg-primary/15 text-primary"
                        : "border-border text-muted-foreground hover:border-primary/40"
                    }`}
                  >
                    <User size={12} /> Solo
                  </button>
                </div>
              </div>

              <div>
                <Label className="text-xs text-muted-foreground">
                  Notes (optional)
                </Label>
                <Input
                  value={logNotes}
                  onChange={(e) => setLogNotes(e.target.value)}
                  placeholder="How'd it go?"
                  data-ocid="dashboard.log_notes_input"
                  className="mt-1"
                />
              </div>

              <div className="flex gap-3 pt-1">
                <Button
                  onClick={handleLogActivity}
                  disabled={logActivity.isPending || !logSport}
                  data-ocid="dashboard.log_submit_button"
                  className="flex-1 bg-accent text-accent-foreground hover:bg-accent/90"
                >
                  {logActivity.isPending ? "Logging..." : "Save Activity"}
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => setShowLogModal(false)}
                  data-ocid="dashboard.log_cancel_button"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="grid gap-4 lg:grid-cols-3">
        {/* Social Battery */}
        <div
          className="rounded-xl border border-border bg-card p-5"
          data-ocid="dashboard.social_battery_card"
        >
          <h2 className="mb-4 font-display text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Social Battery
          </h2>
          {batteryLoading ? (
            <div className="flex justify-center py-4">
              <Skeleton className="h-44 w-44 rounded-full" />
            </div>
          ) : battery !== null ? (
            <div className="flex justify-center">
              <SocialBatteryRing value={battery} />
            </div>
          ) : (
            <div
              data-ocid="dashboard.battery.empty_state"
              className="flex flex-col items-center justify-center py-8 text-center"
            >
              <Activity size={32} className="mb-3 text-muted-foreground/40" />
              <p className="text-sm text-muted-foreground">
                Log activities to calculate your Social Battery
              </p>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowLogModal(true)}
                className="mt-2 text-accent hover:text-accent/80"
              >
                Log first activity
              </Button>
            </div>
          )}
        </div>

        {/* Team Objectives */}
        <div
          className="rounded-xl border border-border bg-card p-5"
          data-ocid="dashboard.objectives_card"
        >
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-display text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Team Objectives
            </h2>
            <button
              type="button"
              onClick={() => navigate({ to: "/objectives" })}
              data-ocid="dashboard.objectives_view_all_link"
              className="flex items-center gap-1 text-xs text-accent hover:underline"
            >
              View All <ChevronRight size={12} />
            </button>
          </div>

          {objectivesLoading ? (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-24 w-full rounded-xl" />
              ))}
            </div>
          ) : activeObjectives.length === 0 ? (
            <div
              data-ocid="dashboard.objectives.empty_state"
              className="py-8 text-center"
            >
              <p className="text-sm text-muted-foreground">
                No active objectives
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {activeObjectives.map((obj, i) => (
                <ObjectiveCard
                  key={String(obj.id)}
                  objective={obj}
                  userObjective={
                    (myObjectives ?? []).find(
                      ([, uo]) => String(uo.objectiveId) === String(obj.id),
                    )?.[1]
                  }
                  onAccept={
                    !acceptedIds.has(String(obj.id)) ? handleAccept : undefined
                  }
                  isAccepting={acceptObjective.isPending}
                  index={i}
                />
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Wellness + Activity */}
        <div className="flex flex-col gap-4">
          {/* AI Wellness Coach */}
          <div
            className="rounded-xl border border-border bg-card p-5"
            data-ocid="dashboard.wellness_card"
          >
            <h2 className="mb-3 font-display text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              AI Wellness Coach
            </h2>
            {wellnessLoading ? (
              <Skeleton className="h-32 w-full rounded-xl" />
            ) : wellnessTip ? (
              <WellnessTipCard
                tip={wellnessTip}
                onRefresh={handleRefreshTip}
                isRefreshing={refreshTip.isPending}
              />
            ) : (
              <div
                data-ocid="dashboard.wellness.empty_state"
                className="rounded-xl border border-dashed border-border p-4 text-center"
              >
                <p className="text-sm text-muted-foreground">
                  Log activities to get your AI wellness tip
                </p>
              </div>
            )}
          </div>

          {/* Recent Activity */}
          <div
            className="rounded-xl border border-border bg-card p-5"
            data-ocid="dashboard.activity_card"
          >
            <h2 className="mb-3 font-display text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Recent Activity
            </h2>
            {activitiesLoading ? (
              <div className="space-y-2">
                {[1, 2].map((i) => (
                  <Skeleton key={i} className="h-14 w-full rounded-xl" />
                ))}
              </div>
            ) : recentActivities.length === 0 ? (
              <div
                data-ocid="dashboard.activity.empty_state"
                className="rounded-xl border border-dashed border-border py-6 text-center"
              >
                <p className="text-sm text-muted-foreground">
                  No activities logged yet
                </p>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowLogModal(true)}
                  data-ocid="dashboard.first_activity_button"
                  className="mt-2 text-accent hover:text-accent/80"
                >
                  Log your first activity
                </Button>
              </div>
            ) : (
              <div className="space-y-2">
                {recentActivities.map((activity, i) => (
                  <ActivityItem
                    key={String(activity.id)}
                    activity={activity}
                    index={i}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
