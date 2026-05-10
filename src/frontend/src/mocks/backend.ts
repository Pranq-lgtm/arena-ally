import type { backendInterface, ActivityType, ObjectiveStatus, UserRole } from "../backend";

const now = BigInt(Date.now()) * BigInt(1_000_000);

export const mockBackend: backendInterface = {
  acceptTeamObjective: async (_objectiveId: bigint) => undefined,

  assignCallerUserRole: async (_user: any, _role: UserRole) => undefined,

  getAvailableSports: async () => ["Basketball", "Soccer", "Running", "Tennis", "Cycling", "Swimming"],

  getCallerUserProfile: async () => ({
    id: { toText: () => "user-123" } as any,
    name: "Jordan Rivera",
    onboardingComplete: true,
    sports: ["Basketball", "Running"],
  }),

  getCallerUserRole: async () => "user" as unknown as UserRole,

  getMyActivities: async () => [
    {
      id: BigInt(1),
      activityType: "group" as unknown as ActivityType,
      sport: "Basketball",
      notes: "Great pickup game at the community court",
      timestamp: now - BigInt(86400) * BigInt(1_000_000_000),
    },
    {
      id: BigInt(2),
      activityType: "solo" as unknown as ActivityType,
      sport: "Running",
      notes: "Morning 5K along the waterfront",
      timestamp: now - BigInt(172800) * BigInt(1_000_000_000),
    },
    {
      id: BigInt(3),
      activityType: "group" as unknown as ActivityType,
      sport: "Soccer",
      notes: "Sunday league match",
      timestamp: now - BigInt(259200) * BigInt(1_000_000_000),
    },
  ],

  getMyObjectives: async () => [
    [
      {
        id: BigInt(1),
        status: "active" as unknown as ObjectiveStatus,
        title: "Score 5 Goals Combined",
        createdAt: now,
        currentProgress: BigInt(3),
        description: "Team up and score 5 goals combined in soccer to unlock a local cafe discount",
        sport: "Soccer",
        rewardText: "Free coffee at Brew & Kick Cafe",
        rewardBadge: "⚽",
        targetCount: BigInt(5),
      },
      {
        progress: BigInt(3),
        objectiveId: BigInt(1),
        acceptedAt: now - BigInt(86400) * BigInt(1_000_000_000),
      },
    ],
    [
      {
        id: BigInt(2),
        status: "active" as unknown as ObjectiveStatus,
        title: "Run 20km as a Team",
        createdAt: now,
        currentProgress: BigInt(12),
        description: "Combine your running distances to reach 20km and earn a gym pass",
        sport: "Running",
        rewardText: "1-Day Gym Pass at FitZone",
        rewardBadge: "🏃",
        targetCount: BigInt(20),
      },
      {
        progress: BigInt(8),
        objectiveId: BigInt(2),
        acceptedAt: now - BigInt(172800) * BigInt(1_000_000_000),
      },
    ],
  ],

  getMySocialBattery: async () => BigInt(78),

  getMyWellnessTip: async () => ({
    tip: "You've been crushing group workouts lately! Your social battery is thriving. Keep building those team bonds — they're your greatest asset on and off the field.",
    socialBattery: BigInt(78),
    generatedAt: now,
    isBurnoutRisk: false,
  }),

  getUserProfile: async (_user: any) => ({
    id: { toText: () => "user-456" } as any,
    name: "Alex Chen",
    onboardingComplete: true,
    sports: ["Tennis", "Swimming"],
  }),

  isCallerAdmin: async () => false,

  isOpenAIConfigured: async () => true,

  listTeamObjectives: async () => [
    {
      id: BigInt(1),
      status: "active" as unknown as ObjectiveStatus,
      title: "Score 5 Goals Combined",
      createdAt: now,
      currentProgress: BigInt(3),
      description: "Team up and score 5 goals combined in soccer to unlock a local cafe discount",
      sport: "Soccer",
      rewardText: "Free coffee at Brew & Kick Cafe",
      rewardBadge: "⚽",
      targetCount: BigInt(5),
    },
    {
      id: BigInt(2),
      status: "active" as unknown as ObjectiveStatus,
      title: "Run 20km as a Team",
      createdAt: now,
      currentProgress: BigInt(12),
      description: "Combine your running distances to reach 20km and earn a gym pass",
      sport: "Running",
      rewardText: "1-Day Gym Pass at FitZone",
      rewardBadge: "🏃",
      targetCount: BigInt(20),
    },
    {
      id: BigInt(3),
      status: "active" as unknown as ObjectiveStatus,
      title: "Complete 10 Group Sessions",
      createdAt: now,
      currentProgress: BigInt(4),
      description: "Attend 10 group training sessions together to unlock a sports store voucher",
      sport: "Basketball",
      rewardText: "$20 Voucher at SportsPro",
      rewardBadge: "🏀",
      targetCount: BigInt(10),
    },
    {
      id: BigInt(4),
      status: "completed" as unknown as ObjectiveStatus,
      title: "Win 3 Matches Together",
      createdAt: now - BigInt(604800) * BigInt(1_000_000_000),
      currentProgress: BigInt(3),
      description: "Win 3 tennis doubles matches as a pair",
      sport: "Tennis",
      rewardText: "Arena Ally Gold Badge",
      rewardBadge: "🎾",
      targetCount: BigInt(3),
    },
  ],

  logActivity: async (sport: string, activityType: ActivityType, notes: string) => ({
    id: BigInt(99),
    activityType,
    sport,
    notes,
    timestamp: now,
  }),

  refreshMyWellnessTip: async () => ({
    tip: "Your recent activity patterns show strong social engagement. Consider adding a mindfulness session before your next group workout to maximize performance.",
    socialBattery: BigInt(78),
    generatedAt: now,
    isBurnoutRisk: false,
  }),

  saveCallerUserProfile: async (_name: string, _sports: string[], _onboardingComplete: boolean) => undefined,

  setOpenAIApiKey: async (_key: string) => undefined,

  _initializeAccessControl: async () => undefined,
};
