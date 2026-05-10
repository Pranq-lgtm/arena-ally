import Common "common";

module {
  public type ObjectiveStatus = { #active; #completed };

  public type TeamObjective = {
    id : Nat;
    title : Text;
    description : Text;
    sport : Common.Sport;
    targetCount : Nat;
    currentProgress : Nat;
    rewardText : Text;
    rewardBadge : Text;
    status : ObjectiveStatus;
    createdAt : Common.Timestamp;
  };

  // Per-user accepted objective, tracking individual progress
  public type UserObjective = {
    objectiveId : Nat;
    progress : Nat;
    acceptedAt : Common.Timestamp;
  };
};
