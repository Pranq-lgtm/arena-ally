import { ActivityType } from "@/types";
import type { Activity } from "@/types";
import { User, Users } from "lucide-react";

interface ActivityItemProps {
  activity: Activity;
  index?: number;
}

const SPORT_EMOJI: Record<string, string> = {
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
  default: "🏅",
};

function formatTimestamp(timestamp: bigint): string {
  const ms = Number(timestamp) / 1_000_000;
  const date = new Date(ms);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffHours = diffMs / (1000 * 60 * 60);
  const diffDays = diffHours / 24;

  if (diffHours < 1) return "Just now";
  if (diffHours < 24) return `${Math.floor(diffHours)}h ago`;
  if (diffDays < 7) return `${Math.floor(diffDays)}d ago`;
  return date.toLocaleDateString();
}

export function ActivityItem({ activity, index = 0 }: ActivityItemProps) {
  const emoji = SPORT_EMOJI[activity.sport] ?? SPORT_EMOJI.default;
  const isGroup = activity.activityType === ActivityType.group;

  return (
    <div
      data-ocid={`activity.item.${index + 1}`}
      className="flex items-center gap-3 rounded-xl border border-border bg-card/60 p-3 transition-smooth hover:bg-card"
    >
      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-muted text-xl">
        {emoji}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="font-display text-sm font-semibold text-foreground">
            {activity.sport}
          </span>
          <span
            className={`flex items-center gap-1 rounded px-1.5 py-0.5 text-xs font-medium ${
              isGroup
                ? "bg-primary/20 text-primary"
                : "bg-muted text-muted-foreground"
            }`}
          >
            {isGroup ? <Users size={10} /> : <User size={10} />}
            {isGroup ? "Group" : "Solo"}
          </span>
        </div>
        {activity.notes && (
          <p className="mt-0.5 truncate text-xs text-muted-foreground">
            {activity.notes}
          </p>
        )}
      </div>

      <span className="flex-shrink-0 text-xs text-muted-foreground">
        {formatTimestamp(activity.timestamp)}
      </span>
    </div>
  );
}
