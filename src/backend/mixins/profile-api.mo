import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import ProfileLib "../lib/profile";
import ActivityLib "../lib/activity";
import ProfileTypes "../types/profile";
import Common "../types/common";
import Time "mo:core/Time";

mixin (
  accessControlState : AccessControl.AccessControlState,
  profiles : ProfileLib.ProfileMap,
  activityLog : ActivityLib.ActivityLog,
  activityCounters : ActivityLib.CounterMap,
) {
  /// Return the caller's profile, null if not yet created
  public query ({ caller }) func getCallerUserProfile() : async ?ProfileTypes.UserProfile {
    ProfileLib.getProfile(profiles, caller);
  };

  /// Upsert the caller's profile (name + sport selections).
  /// On first save, seeds demo activities so the dashboard feels alive immediately.
  public shared ({ caller }) func saveCallerUserProfile(
    name : Text,
    sports : [Common.Sport],
    onboardingComplete : Bool,
  ) : async () {
    let isNew = ProfileLib.getProfile(profiles, caller) == null;
    ignore ProfileLib.saveProfile(profiles, caller, name, sports, onboardingComplete);
    if (isNew) {
      ActivityLib.seedDemoActivities(activityLog, activityCounters, caller, Time.now());
    };
  };

  /// Get another user's profile (admin or self only)
  public query ({ caller }) func getUserProfile(user : Common.UserId) : async ?ProfileTypes.UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    ProfileLib.getProfile(profiles, user);
  };

  /// Return list of predefined sports
  public query func getAvailableSports() : async [Common.Sport] {
    ProfileLib.availableSports();
  };
};
