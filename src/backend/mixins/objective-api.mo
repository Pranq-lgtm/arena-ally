import AccessControl "mo:caffeineai-authorization/access-control";
import ObjectiveLib "../lib/objective";
import ObjectiveTypes "../types/objective";
import Common "../types/common";
import Time "mo:core/Time";

mixin (
  accessControlState : AccessControl.AccessControlState,
  globalObjectives : ObjectiveLib.ObjectiveStore,
  userObjectives : ObjectiveLib.UserObjectiveStore,
) {
  /// List all global Team Objectives
  public query func listTeamObjectives() : async [ObjectiveTypes.TeamObjective] {
    ObjectiveLib.listObjectives(globalObjectives);
  };

  /// Accept a Team Objective (the caller opts in and starts tracking progress)
  public shared ({ caller }) func acceptTeamObjective(objectiveId : Nat) : async () {
    ObjectiveLib.acceptObjective(globalObjectives, userObjectives, caller, objectiveId, Time.now());
  };

  /// Get objectives accepted by the caller with their individual progress
  public query ({ caller }) func getMyObjectives() : async [(ObjectiveTypes.TeamObjective, ObjectiveTypes.UserObjective)] {
    ObjectiveLib.getUserObjectives(globalObjectives, userObjectives, caller);
  };
};
