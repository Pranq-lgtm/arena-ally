import { Button } from "@/components/ui/button";
import type { WellnessTip } from "@/types";
import { AlertTriangle, Brain, RefreshCw } from "lucide-react";

interface WellnessTipCardProps {
  tip: WellnessTip;
  onRefresh?: () => void;
  isRefreshing?: boolean;
}

export function WellnessTipCard({
  tip,
  onRefresh,
  isRefreshing,
}: WellnessTipCardProps) {
  return (
    <div
      data-ocid="wellness.tip_card"
      className={`rounded-xl border p-4 transition-smooth ${
        tip.isBurnoutRisk
          ? "border-destructive/30 bg-destructive/5"
          : "border-secondary/20 bg-secondary/5"
      }`}
    >
      {/* Header */}
      <div className="mb-3 flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          <div
            className={`flex h-8 w-8 items-center justify-center rounded-lg ${
              tip.isBurnoutRisk ? "bg-destructive/20" : "bg-secondary/20"
            }`}
          >
            {tip.isBurnoutRisk ? (
              <AlertTriangle size={16} className="text-destructive" />
            ) : (
              <Brain size={16} className="text-secondary" />
            )}
          </div>
          <span className="font-display text-sm font-semibold text-foreground">
            AI Wellness Coach
          </span>
        </div>
        {tip.isBurnoutRisk && (
          <span className="animate-pulse-badge rounded-full bg-destructive/20 px-2 py-0.5 text-xs font-medium text-destructive">
            ⚠ Burnout Risk
          </span>
        )}
      </div>

      {/* Tip */}
      <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
        {tip.tip}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">Social Battery:</span>
          <span
            className={`font-display text-sm font-bold ${
              Number(tip.socialBattery) >= 60
                ? "text-accent"
                : Number(tip.socialBattery) >= 30
                  ? "text-yellow-400"
                  : "text-destructive"
            }`}
          >
            {Number(tip.socialBattery)}%
          </span>
        </div>
        {onRefresh && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onRefresh}
            disabled={isRefreshing}
            data-ocid="wellness.refresh_button"
            className="gap-1.5 text-xs text-muted-foreground hover:text-foreground"
          >
            <RefreshCw
              size={12}
              className={isRefreshing ? "animate-spin" : ""}
            />
            Refresh
          </Button>
        )}
      </div>
    </div>
  );
}
