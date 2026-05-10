import { createActor } from "@/backend";
import type { ActivityType } from "@/types";
import type { Activity } from "@/types";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useActivities() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Activity[]>({
    queryKey: ["activities"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getMyActivities();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSocialBattery() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<bigint>({
    queryKey: ["socialBattery"],
    queryFn: async () => {
      if (!actor) return BigInt(0);
      return actor.getMySocialBattery();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useLogActivity() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      sport,
      activityType,
      notes,
    }: {
      sport: string;
      activityType: ActivityType;
      notes: string;
    }) => {
      if (!actor) throw new Error("Actor not available");
      return actor.logActivity(sport, activityType, notes);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["activities"] });
      queryClient.invalidateQueries({ queryKey: ["socialBattery"] });
    },
  });
}
