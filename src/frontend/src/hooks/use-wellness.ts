import { createActor } from "@/backend";
import type { WellnessTip } from "@/types";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useWellnessTip() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<WellnessTip | null>({
    queryKey: ["wellnessTip"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getMyWellnessTip();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useRefreshWellnessTip() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("Actor not available");
      return actor.refreshMyWellnessTip();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wellnessTip"] });
    },
  });
}

export function useOpenAIConfig() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<boolean>({
    queryKey: ["openaiConfigured"],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isOpenAIConfigured();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSetOpenAIKey() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (key: string) => {
      if (!actor) throw new Error("Actor not available");
      return actor.setOpenAIApiKey(key);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["openaiConfigured"] });
    },
  });
}
