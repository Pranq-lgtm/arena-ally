import Map "mo:core/Map";
import Common "../types/common";
import ProfileTypes "../types/profile";

module {
  public type ProfileMap = Map.Map<Common.UserId, ProfileTypes.UserProfile>;

  /// Get a user's profile; returns null if not found
  public func getProfile(profiles : ProfileMap, userId : Common.UserId) : ?ProfileTypes.UserProfile {
    profiles.get(userId);
  };

  /// Upsert the caller's profile
  public func saveProfile(
    profiles : ProfileMap,
    userId : Common.UserId,
    name : Text,
    sports : [Common.Sport],
    onboardingComplete : Bool,
  ) : ProfileTypes.UserProfile {
    let profile : ProfileTypes.UserProfile = {
      id = userId;
      name = name;
      sports = sports;
      onboardingComplete = onboardingComplete;
    };
    profiles.add(userId, profile);
    profile;
  };

  /// Return a list of predefined sports the user can select from
  public func availableSports() : [Common.Sport] {
    ["basketball", "soccer", "tennis", "volleyball", "baseball", "running", "cycling", "swimming", "yoga", "golf"];
  };
};
