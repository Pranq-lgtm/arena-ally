import { ActivityItem } from "@/components/ActivityItem";
import { ObjectiveCard } from "@/components/ObjectiveCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { useActivities, useLogActivity } from "@/hooks/use-activities";
import {
  useAcceptObjective,
  useMyObjectives,
  useObjectives,
} from "@/hooks/use-objectives";
import { useAvailableSports } from "@/hooks/use-profile";
import { ActivityType, ObjectiveStatus } from "@/types";
import { Plus, User, Users } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function ObjectivesPage() {
  const { data: objectives, isLoading: objectivesLoading } = useObjectives();
  const { data: myObjectives, isLoading: myObjectivesLoading } =
    useMyObjectives();
  const { data: activities, isLoading: activitiesLoading } = useActivities();
  const { data: sports } = useAvailableSports();
  const acceptObjective = useAcceptObjective();
  const logActivity = useLogActivity();

  const [tab, setTab] = useState<"available" | "my">("available");
  const [logSport, setLogSport] = useState("");
  const [logType, setLogType] = useState<ActivityType>(ActivityType.group);
  const [logNotes, setLogNotes] = useState("");
  const [showLogForm, setShowLogForm] = useState(false);

  const acceptedIds = new Set(
    (myObjectives ?? []).map(([, uo]) => String(uo.objectiveId)),
  );

  const availableObjectives = (objectives ?? []).filter(
    (obj) => obj.status === ObjectiveStatus.active,
  );

  const myAcceptedObjectives = myObjectives ?? [];

  async function handleAccept(id: bigint) {
    try {
      await acceptObjective.mutateAsync(id);
      toast.success("Challenge accepted! 🎯");
    } catch {
      toast.error("Failed to accept challenge.");
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
      toast.success("Activity logged! Social Battery updated.");
      setLogSport("");
      setLogNotes("");
      setShowLogForm(false);
    } catch {
      toast.error("Failed to log activity.");
    }
  }

  return (
    <div
      className="min-h-full bg-background p-4 lg:p-6"
      data-ocid="objectives.page"
    >
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">
            Team Objectives
          </h1>
          <p className="text-sm text-muted-foreground">
            Complete challenges, earn rewards
          </p>
        </div>
        <Button
          size="sm"
          onClick={() => setShowLogForm((v) => !v)}
          data-ocid="objectives.log_activity_button"
          className="gap-2 bg-accent text-accent-foreground hover:bg-accent/90"
        >
          <Plus size={14} />
          Log Activity
        </Button>
      </div>

      {/* Log Activity Form */}
      {showLogForm && (
        <div
          className="mb-6 rounded-xl border border-accent/20 bg-card p-5"
          data-ocid="objectives.log_form"
        >
          <h2 className="mb-4 font-display text-sm font-semibold text-foreground">
            Log New Activity
          </h2>
          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <Label className="text-xs text-muted-foreground">Sport</Label>
              <select
                value={logSport}
                onChange={(e) => setLogSport(e.target.value)}
                data-ocid="objectives.sport_select"
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
              <Label className="text-xs text-muted-foreground">Type</Label>
              <div className="mt-1 flex gap-2">
                <button
                  type="button"
                  onClick={() => setLogType(ActivityType.group)}
                  data-ocid="objectives.type_group_toggle"
                  className={`flex flex-1 items-center justify-center gap-1.5 rounded-lg border py-2 text-xs font-medium transition-smooth ${
                    logType === ActivityType.group
                      ? "border-accent bg-accent/15 text-accent"
                      : "border-border text-muted-foreground"
                  }`}
                >
                  <Users size={12} /> Group
                </button>
                <button
                  type="button"
                  onClick={() => setLogType(ActivityType.solo)}
                  data-ocid="objectives.type_solo_toggle"
                  className={`flex flex-1 items-center justify-center gap-1.5 rounded-lg border py-2 text-xs font-medium transition-smooth ${
                    logType === ActivityType.solo
                      ? "border-primary bg-primary/15 text-primary"
                      : "border-border text-muted-foreground"
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
                data-ocid="objectives.notes_input"
                className="mt-1"
              />
            </div>
          </div>
          <div className="mt-4 flex gap-3">
            <Button
              onClick={handleLogActivity}
              disabled={logActivity.isPending || !logSport}
              data-ocid="objectives.submit_log_button"
              className="bg-accent text-accent-foreground hover:bg-accent/90"
            >
              {logActivity.isPending ? "Logging..." : "Save Activity"}
            </Button>
            <Button
              variant="ghost"
              onClick={() => setShowLogForm(false)}
              data-ocid="objectives.cancel_log_button"
            >
              Cancel
            </Button>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="mb-5 flex gap-1 rounded-xl border border-border bg-muted/30 p-1">
        {(["available", "my"] as const).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            data-ocid={`objectives.${t}.tab`}
            className={`flex-1 rounded-lg py-2 text-sm font-semibold transition-smooth ${
              tab === t
                ? "bg-card text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {t === "available"
              ? "Available"
              : `My Objectives (${myAcceptedObjectives.length})`}
          </button>
        ))}
      </div>

      {/* Available Tab */}
      {tab === "available" &&
        (objectivesLoading ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-48 w-full rounded-xl" />
            ))}
          </div>
        ) : availableObjectives.length === 0 ? (
          <div
            data-ocid="objectives.available.empty_state"
            className="flex flex-col items-center justify-center py-20 text-center"
          >
            <p className="font-display text-lg font-semibold text-foreground">
              No active objectives
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Check back soon for new challenges.
            </p>
          </div>
        ) : (
          <div
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
            data-ocid="objectives.available.list"
          >
            {availableObjectives.map((obj, i) => (
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
        ))}

      {/* My Objectives Tab */}
      {tab === "my" &&
        (myObjectivesLoading ? (
          <div className="space-y-3">
            {[1, 2].map((i) => (
              <Skeleton key={i} className="h-32 w-full rounded-xl" />
            ))}
          </div>
        ) : myAcceptedObjectives.length === 0 ? (
          <div
            data-ocid="objectives.my.empty_state"
            className="flex flex-col items-center justify-center py-20 text-center"
          >
            <p className="font-display text-lg font-semibold text-foreground">
              No challenges accepted yet
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Browse Available tab to accept your first challenge!
            </p>
            <Button
              size="sm"
              onClick={() => setTab("available")}
              data-ocid="objectives.my.browse_button"
              className="mt-4 bg-accent text-accent-foreground hover:bg-accent/90"
            >
              Browse Challenges
            </Button>
          </div>
        ) : (
          <div className="space-y-3" data-ocid="objectives.my.list">
            {myAcceptedObjectives.map(([teamObj, userObj], i) => (
              <div
                key={String(userObj.objectiveId)}
                data-ocid={`objectives.my.item.${i + 1}`}
                className={`rounded-xl border p-4 transition-smooth ${
                  teamObj.status === ObjectiveStatus.completed
                    ? "border-accent/30 bg-accent/5"
                    : "border-border bg-card"
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="mb-1 flex items-center gap-2">
                      <span className="rounded bg-primary/20 px-2 py-0.5 text-xs font-medium text-primary">
                        {teamObj.sport}
                      </span>
                      {teamObj.status === ObjectiveStatus.completed && (
                        <span className="flex items-center gap-1 text-xs font-medium text-accent">
                          🎉 Completed!
                        </span>
                      )}
                    </div>
                    <h3 className="font-display text-sm font-bold text-foreground">
                      {teamObj.title}
                    </h3>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      {teamObj.description}
                    </p>

                    {/* Per-user progress */}
                    <div className="mt-3">
                      <div className="mb-1 flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">
                          Your progress: {Number(userObj.progress)} /{" "}
                          {Number(teamObj.targetCount)}
                        </span>
                        <span
                          className={`font-semibold ${
                            Number(userObj.progress) >=
                            Number(teamObj.targetCount)
                              ? "text-accent"
                              : "text-muted-foreground"
                          }`}
                        >
                          {Math.round(
                            Math.min(
                              100,
                              (Number(userObj.progress) /
                                Number(teamObj.targetCount)) *
                                100,
                            ),
                          )}
                          %
                        </span>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-muted">
                        <div
                          className={`h-full rounded-full transition-all duration-700 ${
                            Number(userObj.progress) >=
                            Number(teamObj.targetCount)
                              ? "bg-accent"
                              : "bg-gradient-to-r from-primary to-accent"
                          }`}
                          style={{
                            width: `${Math.min(100, (Number(userObj.progress) / Number(teamObj.targetCount)) * 100)}%`,
                          }}
                        />
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-muted">
                        <div
                          className="h-full rounded-full transition-all duration-700"
                          style={{
                            width: `${Math.min(100, (Number(userObj.progress) / Number(teamObj.targetCount)) * 100)}%`,
                            background:
                              Number(userObj.progress) >=
                              Number(teamObj.targetCount)
                                ? "oklch(0.75 0.26 45)"
                                : "linear-gradient(90deg, oklch(0.55 0.18 250), oklch(0.65 0.25 45))",
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-center gap-1">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10">
                      <span className="text-2xl" role="img" aria-label="badge">
                        {teamObj.rewardBadge}
                      </span>
                    </div>
                    {teamObj.status === ObjectiveStatus.completed && (
                      <span className="text-xs font-medium text-accent">
                        Earned!
                      </span>
                    )}
                  </div>
                </div>

                {teamObj.status === ObjectiveStatus.completed && (
                  <div className="mt-3 rounded-lg bg-accent/10 px-3 py-2 text-center">
                    <p className="font-display text-xs font-semibold text-accent">
                      🏆 {teamObj.rewardText}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        ))}

      {/* Recent Activities */}
      <div className="mt-10">
        <h2 className="mb-4 font-display text-lg font-bold text-foreground">
          Activity History
        </h2>
        {activitiesLoading ? (
          <div className="space-y-2">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-14 w-full rounded-xl" />
            ))}
          </div>
        ) : (activities ?? []).length === 0 ? (
          <div
            data-ocid="objectives.activities.empty_state"
            className="rounded-xl border border-dashed border-border py-10 text-center"
          >
            <p className="text-sm text-muted-foreground">
              No activities yet. Log your first!
            </p>
          </div>
        ) : (
          <div className="space-y-2" data-ocid="objectives.activities.list">
            {(activities ?? []).map((activity, i) => (
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
  );
}
