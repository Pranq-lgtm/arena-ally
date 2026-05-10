import AccessControl "mo:caffeineai-authorization/access-control";
import ActivityLib "../lib/activity";
import ObjectiveLib "../lib/objective";
import ActivityTypes "../types/activity";
import ObjectiveTypes "../types/objective";
import Common "../types/common";
import Time "mo:core/Time";

mixin (
  accessControlState : AccessControl.AccessControlState,
  activityLog : ActivityLib.ActivityLog,
  activityCounters : ActivityLib.CounterMap,
  globalObjectives : ObjectiveLib.ObjectiveStore,
  userObjectives : ObjectiveLib.UserObjectiveStore,
) {
  /// Log a new activity for the caller; auto-increments matching objective progress
  public shared ({ caller }) func logActivity(
    sport : Common.Sport,
    activityType : ActivityTypes.ActivityType,
    notes : Text,
  ) : async ActivityTypes.Activity {
    let activity = ActivityLib.logActivity(
      activityLog,
      activityCounters,
      caller,
      sport,
      activityType,
      notes,
      Time.now(),
    );
    // Auto-increment objective progress for group activities
    switch (activityType) {
      case (#group) {
        ObjectiveLib.incrementProgressBySport(globalObjectives, userObjectives, caller, sport);
      };
      case (#solo) {};
    };
    activity;
  };

  /// Get all activities for the caller
  public query ({ caller }) func getMyActivities() : async [ActivityTypes.Activity] {
    ActivityLib.getActivities(activityLog, caller);
  };

  /// Get Social Battery score (0-100) for the caller
  public query ({ caller }) func getMySocialBattery() : async Nat {
    ActivityLib.socialBattery(activityLog, caller, Time.now());
  };
};
