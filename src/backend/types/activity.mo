import Common "common";

module {
  public type ActivityType = { #group; #solo };

  public type Activity = {
    id : Nat;
    sport : Common.Sport;
    activityType : ActivityType;
    notes : Text;
    timestamp : Common.Timestamp;
  };
};
