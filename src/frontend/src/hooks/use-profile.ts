import { createActor } from "@/backend";
import type { UserProfile } from "@/types";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useProfile() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<UserProfile | null>({
    queryKey: ["profile"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getCallerUserProfile();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSaveProfile() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      name,
      sports,
      onboardingComplete,
    }: {
      name: string;
      sports: string[];
      onboardingComplete: boolean;
    }) => {
      if (!actor) throw new Error("Actor not available");
      return actor.saveCallerUserProfile(name, sports, onboardingComplete);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
  });
}

export function useAvailableSports() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<string[]>({
    queryKey: ["sports"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAvailableSports();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useIsAdmin() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<boolean>({
    queryKey: ["isAdmin"],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isCallerAdmin();
    },
    enabled: !!actor && !isFetching,
  });
}
