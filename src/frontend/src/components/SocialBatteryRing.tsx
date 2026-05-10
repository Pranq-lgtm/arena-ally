interface SocialBatteryRingProps {
  value: number; // 0–100
  size?: number;
  strokeWidth?: number;
  showLabel?: boolean;
}

function getBatteryColor(value: number): string {
  if (value >= 70) return "oklch(0.75 0.26 45)"; // accent orange = fully charged
  if (value >= 40) return "oklch(0.75 0.22 80)"; // amber = moderate
  return "oklch(0.65 0.22 25)"; // red = low
}

function getBatteryLabel(value: number): string {
  if (value >= 80) return "Fully Charged";
  if (value >= 60) return "Feeling Social";
  if (value >= 40) return "Recharging";
  if (value >= 20) return "Low Energy";
  return "Burnout Risk";
}

function getBatteryMessage(value: number): string {
  if (value >= 80) return "Connect with your team.";
  if (value >= 60) return "Great time to join group sessions.";
  if (value >= 40) return "Mix solo and group activities.";
  if (value >= 20) return "Prioritize recovery & rest.";
  return "Seek support — you need connection.";
}

export function SocialBatteryRing({
  value,
  size = 180,
  strokeWidth = 14,
  showLabel = true,
}: SocialBatteryRingProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  // Use 270° arc (3/4 of circle), starting from bottom-left
  const arcLength = circumference * 0.75;
  const progress = (value / 100) * arcLength;
  const color = getBatteryColor(value);
  const center = size / 2;

  // Rotation: start at 135° (bottom-left)
  const rotation = 135;

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative" style={{ width: size, height: size }}>
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          aria-label={`Social Battery: ${value}%`}
          role="img"
        >
          <defs>
            <linearGradient
              id="battery-gradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="oklch(0.65 0.22 25)" />
              <stop offset="50%" stopColor="oklch(0.75 0.22 80)" />
              <stop offset="100%" stopColor="oklch(0.75 0.26 45)" />
            </linearGradient>
          </defs>

          {/* Track */}
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke="oklch(0.22 0 0)"
            strokeWidth={strokeWidth}
            strokeDasharray={`${arcLength} ${circumference - arcLength}`}
            strokeLinecap="round"
            transform={`rotate(${rotation} ${center} ${center})`}
          />

          {/* Progress */}
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeDasharray={`${progress} ${circumference}`}
            strokeLinecap="round"
            transform={`rotate(${rotation} ${center} ${center})`}
            style={{
              transition: "stroke-dasharray 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          />
        </svg>

        {/* Center text */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center"
          style={{ top: strokeWidth }}
        >
          <span className="font-display text-3xl font-bold" style={{ color }}>
            {value}%
          </span>
        </div>
      </div>

      {showLabel && (
        <div className="text-center">
          <p className="font-display text-lg font-semibold text-foreground">
            {getBatteryLabel(value)}
          </p>
          <p className="text-sm text-muted-foreground">
            {getBatteryMessage(value)}
          </p>
        </div>
      )}
    </div>
  );
}
