import { Button } from "@/components/ui/button";
import { ObjectiveStatus } from "@/types";
import type { TeamObjective, UserObjective } from "@/types";
import { CheckCircle2, Trophy, Zap } from "lucide-react";

interface ObjectiveCardProps {
  objective: TeamObjective;
  userObjective?: UserObjective;
  onAccept?: (id: bigint) => void;
  isAccepting?: boolean;
  index?: number;
}

export function ObjectiveCard({
  objective,
  userObjective,
  onAccept,
  isAccepting,
  index = 0,
}: ObjectiveCardProps) {
  const isAccepted = !!userObjective;
  const isCompleted = objective.status === ObjectiveStatus.completed;
  const target = Number(objective.targetCount);
  const current = isAccepted
    ? Number(userObjective.progress)
    : Number(objective.currentProgress);
  const progressPct = target > 0 ? Math.min(100, (current / target) * 100) : 0;

  return (
    <div
      data-ocid={`objective.card.${index + 1}`}
      className={`rounded-xl border p-4 transition-smooth ${
        isCompleted
          ? "border-accent/30 bg-accent/5"
          : "border-border bg-card hover:border-border/80 hover:bg-card/80"
      }`}
    >
      <div className="mb-3 flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="mb-1 flex items-center gap-2">
            <span className="rounded bg-primary/20 px-2 py-0.5 text-xs font-medium text-primary">
              {objective.sport}
            </span>
            {isCompleted && (
              <span className="flex items-center gap-1 text-xs font-medium text-accent">
                <CheckCircle2 size={12} />
                Completed
              </span>
            )}
          </div>
          <h3 className="truncate font-display text-sm font-semibold text-foreground">
            {objective.title}
          </h3>
          <p className="mt-0.5 text-xs text-muted-foreground line-clamp-2">
            {objective.description}
          </p>
        </div>

        <div className="flex flex-shrink-0 flex-col items-center gap-1">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
            <span className="text-xl" role="img" aria-label="reward badge">
              {objective.rewardBadge}
            </span>
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="mb-3">
        <div className="mb-1 flex items-center justify-between text-xs">
          <span className="text-muted-foreground">
            {current} / {target}
          </span>
          <span
            className={`font-medium ${progressPct >= 100 ? "text-accent" : "text-muted-foreground"}`}
          >
            {Math.round(progressPct)}%
          </span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-muted">
          <div
            className={`h-full rounded-full transition-all duration-700 ${progressPct >= 100 ? "bg-accent" : "bg-gradient-to-r from-primary to-accent"}`}
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </div>

      {/* Reward */}
      <div className="mb-3 flex items-center gap-2 rounded-lg bg-muted/40 px-3 py-2">
        <Trophy size={14} className="text-accent flex-shrink-0" />
        <span className="text-xs text-muted-foreground">
          {objective.rewardText}
        </span>
      </div>

      {/* Action */}
      {!isCompleted && !isAccepted && onAccept && (
        <Button
          size="sm"
          onClick={() => onAccept(objective.id)}
          disabled={isAccepting}
          data-ocid={`objective.accept_button.${index + 1}`}
          className="w-full gap-2 bg-accent text-accent-foreground hover:bg-accent/90"
        >
          <Zap size={14} />
          {isAccepting ? "Joining..." : "Accept Challenge"}
        </Button>
      )}
      {isAccepted && !isCompleted && (
        <div
          className="flex items-center justify-center gap-2 rounded-lg bg-primary/10 py-2 text-xs font-medium text-primary"
          data-ocid={`objective.accepted_badge.${index + 1}`}
        >
          <Zap size={12} />
          In Progress
        </div>
      )}
    </div>
  );
}
