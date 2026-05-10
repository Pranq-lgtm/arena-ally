import { c as createLucideIcon, h as useActor, i as useQuery, k as useQueryClient, l as useMutation, m as createActor } from "./index-fRB1Ra1u.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",
      key: "wmoenq"
    }
  ],
  ["path", { d: "M12 9v4", key: "juzpu7" }],
  ["path", { d: "M12 17h.01", key: "p32p05" }]
];
const TriangleAlert = createLucideIcon("triangle-alert", __iconNode);
function useWellnessTip() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["wellnessTip"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getMyWellnessTip();
    },
    enabled: !!actor && !isFetching
  });
}
function useRefreshWellnessTip() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("Actor not available");
      return actor.refreshMyWellnessTip();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wellnessTip"] });
    }
  });
}
function useOpenAIConfig() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["openaiConfigured"],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isOpenAIConfigured();
    },
    enabled: !!actor && !isFetching
  });
}
function useSetOpenAIKey() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (key) => {
      if (!actor) throw new Error("Actor not available");
      return actor.setOpenAIApiKey(key);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["openaiConfigured"] });
    }
  });
}
export {
  TriangleAlert as T,
  useRefreshWellnessTip as a,
  useOpenAIConfig as b,
  useSetOpenAIKey as c,
  useWellnessTip as u
};
