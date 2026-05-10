import { j as jsxRuntimeExports, g as cn, h as useActor, i as useQuery, k as useQueryClient, l as useMutation, m as createActor } from "./index-fRB1Ra1u.js";
var ActivityType = /* @__PURE__ */ ((ActivityType2) => {
  ActivityType2["solo"] = "solo";
  ActivityType2["group"] = "group";
  return ActivityType2;
})(ActivityType || {});
var ObjectiveStatus = /* @__PURE__ */ ((ObjectiveStatus2) => {
  ObjectiveStatus2["active"] = "active";
  ObjectiveStatus2["completed"] = "completed";
  return ObjectiveStatus2;
})(ObjectiveStatus || {});
function Skeleton({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "skeleton",
      className: cn("bg-accent animate-pulse rounded-md", className),
      ...props
    }
  );
}
function useActivities() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["activities"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getMyActivities();
    },
    enabled: !!actor && !isFetching
  });
}
function useSocialBattery() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["socialBattery"],
    queryFn: async () => {
      if (!actor) return BigInt(0);
      return actor.getMySocialBattery();
    },
    enabled: !!actor && !isFetching
  });
}
function useLogActivity() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      sport,
      activityType,
      notes
    }) => {
      if (!actor) throw new Error("Actor not available");
      return actor.logActivity(sport, activityType, notes);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["activities"] });
      queryClient.invalidateQueries({ queryKey: ["socialBattery"] });
    }
  });
}
function useObjectives() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["objectives"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listTeamObjectives();
    },
    enabled: !!actor && !isFetching
  });
}
function useMyObjectives() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["myObjectives"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getMyObjectives();
    },
    enabled: !!actor && !isFetching
  });
}
function useAcceptObjective() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (objectiveId) => {
      if (!actor) throw new Error("Actor not available");
      return actor.acceptTeamObjective(objectiveId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["objectives"] });
      queryClient.invalidateQueries({ queryKey: ["myObjectives"] });
    }
  });
}
export {
  ActivityType as A,
  ObjectiveStatus as O,
  Skeleton as S,
  useActivities as a,
  useObjectives as b,
  useMyObjectives as c,
  useAcceptObjective as d,
  useLogActivity as e,
  useSocialBattery as u
};
