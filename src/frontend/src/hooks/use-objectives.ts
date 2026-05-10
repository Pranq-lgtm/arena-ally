import { createActor } from "@/backend";
import type { TeamObjective, UserObjective } from "@/types";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useObjectives() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<TeamObjective[]>({
    queryKey: ["objectives"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listTeamObjectives();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useMyObjectives() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<[TeamObjective, UserObjective][]>({
    queryKey: ["myObjectives"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getMyObjectives();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAcceptObjective() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (objectiveId: bigint) => {
      if (!actor) throw new Error("Actor not available");
      return actor.acceptTeamObjective(objectiveId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["objectives"] });
      queryClient.invalidateQueries({ queryKey: ["myObjectives"] });
    },
  });
}
