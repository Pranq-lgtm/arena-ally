import Map "mo:core/Map";
import List "mo:core/List";
import AccessControl "mo:caffeineai-authorization/access-control";
import MixinAuthorization "mo:caffeineai-authorization/MixinAuthorization";
import ProfileLib "lib/profile";
import ActivityLib "lib/activity";
import ObjectiveLib "lib/objective";
import WellnessLib "lib/wellness";
import ProfileMixin "mixins/profile-api";
import ActivityMixin "mixins/activity-api";
import ObjectiveMixin "mixins/objective-api";
import WellnessMixin "mixins/wellness-api";
import OpenAIAdminMixin "mixins/openai-admin-api";
import Time "mo:core/Time";

actor {
  // --- Seeding flag ---
  let initState = { var seeded = false };
  // --- Authorization ---
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // --- Profile state ---
  let profiles : ProfileLib.ProfileMap = Map.empty();

  // --- Activity state ---
  let activityLog : ActivityLib.ActivityLog = Map.empty();
  let activityCounters : ActivityLib.CounterMap = Map.empty();

  // --- Objective state ---
  let globalObjectives : ObjectiveLib.ObjectiveStore = List.empty();
  let userObjectives : ObjectiveLib.UserObjectiveStore = Map.empty();
  let objectiveCounter : ObjectiveLib.Counter = { var value = 0 };

  // --- Wellness state ---
  let tipStore : WellnessLib.TipStore = Map.empty();

  // --- OpenAI admin key ---
  let openAIApiKey = { var value : ?Text = null };

  // --- Mixins ---
  include ProfileMixin(accessControlState, profiles, activityLog, activityCounters);
  include ActivityMixin(accessControlState, activityLog, activityCounters, globalObjectives, userObjectives);
  include ObjectiveMixin(accessControlState, globalObjectives, userObjectives);
  include WellnessMixin(accessControlState, activityLog, tipStore, openAIApiKey);
  include OpenAIAdminMixin(accessControlState, openAIApiKey);

  // --- Seed demo data on first init ---
  if (not initState.seeded) {
    initState.seeded := true;
    ObjectiveLib.seedDemoObjectives(globalObjectives, objectiveCounter, Time.now());
  };
};
