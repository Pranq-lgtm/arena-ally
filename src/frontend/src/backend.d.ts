import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type UserId = Principal;
export type Timestamp = bigint;
export interface TeamObjective {
    id: bigint;
    status: ObjectiveStatus;
    title: string;
    createdAt: Timestamp;
    currentProgress: bigint;
    description: string;
    sport: Sport;
    rewardText: string;
    rewardBadge: string;
    targetCount: bigint;
}
export type Sport = string;
export interface Activity {
    id: bigint;
    activityType: ActivityType;
    sport: Sport;
    notes: string;
    timestamp: Timestamp;
}
export interface WellnessTip {
    tip: string;
    socialBattery: bigint;
    generatedAt: Timestamp;
    isBurnoutRisk: boolean;
}
export interface UserObjective {
    progress: bigint;
    objectiveId: bigint;
    acceptedAt: Timestamp;
}
export interface UserProfile {
    id: UserId;
    name: string;
    onboardingComplete: boolean;
    sports: Array<Sport>;
}
export enum ActivityType {
    solo = "solo",
    group = "group"
}
export enum ObjectiveStatus {
    active = "active",
    completed = "completed"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    acceptTeamObjective(objectiveId: bigint): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    getAvailableSports(): Promise<Array<Sport>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getMyActivities(): Promise<Array<Activity>>;
    getMyObjectives(): Promise<Array<[TeamObjective, UserObjective]>>;
    getMySocialBattery(): Promise<bigint>;
    getMyWellnessTip(): Promise<WellnessTip | null>;
    getUserProfile(user: UserId): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    isOpenAIConfigured(): Promise<boolean>;
    listTeamObjectives(): Promise<Array<TeamObjective>>;
    logActivity(sport: Sport, activityType: ActivityType, notes: string): Promise<Activity>;
    refreshMyWellnessTip(): Promise<WellnessTip>;
    saveCallerUserProfile(name: string, sports: Array<Sport>, onboardingComplete: boolean): Promise<void>;
    setOpenAIApiKey(key: string): Promise<void>;
}
