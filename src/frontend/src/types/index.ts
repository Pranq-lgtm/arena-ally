import type { Principal } from "@icp-sdk/core/principal";

export type { Principal };

export type Sport = string;
export type Timestamp = bigint;

export interface UserProfile {
  id: Principal;
  name: string;
  sports: string[];
  onboardingComplete: boolean;
}

export interface Activity {
  id: bigint;
  sport: string;
  activityType: ActivityType;
  notes: string;
  timestamp: bigint;
}

export enum ActivityType {
  solo = "solo",
  group = "group",
}

export enum ObjectiveStatus {
  active = "active",
  completed = "completed",
}

export enum UserRole {
  admin = "admin",
  user = "user",
  guest = "guest",
}

export interface TeamObjective {
  id: bigint;
  title: string;
  description: string;
  sport: string;
  targetCount: bigint;
  currentProgress: bigint;
  rewardText: string;
  rewardBadge: string;
  status: ObjectiveStatus;
  createdAt: bigint;
}

export interface UserObjective {
  objectiveId: bigint;
  progress: bigint;
  acceptedAt: bigint;
}

export interface WellnessTip {
  tip: string;
  generatedAt: bigint;
  socialBattery: bigint;
  isBurnoutRisk: boolean;
}

export type SocialBattery = number; // 0–100
