import Common "common";

module {
  public type UserProfile = {
    id : Common.UserId;
    name : Text;
    sports : [Common.Sport]; // 1-3 selected sports
    onboardingComplete : Bool;
  };
};
