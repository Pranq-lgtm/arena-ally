interface BadgeIconProps {
  emoji: string;
  label: string;
  size?: "sm" | "md" | "lg";
  glow?: boolean;
  earned?: boolean;
}

const sizeMap = {
  sm: { outer: "h-8 w-8", text: "text-base" },
  md: { outer: "h-12 w-12", text: "text-2xl" },
  lg: { outer: "h-16 w-16", text: "text-3xl" },
};

export function BadgeIcon({
  emoji,
  label,
  size = "md",
  glow = false,
  earned = true,
}: BadgeIconProps) {
  const { outer, text } = sizeMap[size];

  return (
    <div
      className="relative flex flex-col items-center gap-1"
      title={label}
      aria-label={label}
    >
      <div
        className={`${outer} flex items-center justify-center rounded-xl transition-smooth ${
          earned ? "bg-accent/15" : "bg-muted/40 opacity-40 grayscale"
        } ${
          glow && earned
            ? "ring-2 ring-accent/40 ring-offset-1 ring-offset-background"
            : ""
        }`}
      >
        <span className={text} role="img" aria-hidden>
          {emoji}
        </span>
        {glow && earned && (
          <div className="absolute inset-0 rounded-xl animate-pulse-badge bg-accent/10" />
        )}
      </div>
      <span className="max-w-[60px] text-center text-xs text-muted-foreground truncate">
        {label}
      </span>
    </div>
  );
}
