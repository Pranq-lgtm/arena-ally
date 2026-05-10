import Map "mo:core/Map";
import List "mo:core/List";
import Common "../types/common";
import ObjectiveTypes "../types/objective";

module {
  public type ObjectiveStore = List.List<ObjectiveTypes.TeamObjective>;
  public type UserObjectiveStore = Map.Map<Common.UserId, List.List<ObjectiveTypes.UserObjective>>;
  public type Counter = { var value : Nat };

  /// Return all global Team Objectives
  public func listObjectives(store : ObjectiveStore) : [ObjectiveTypes.TeamObjective] {
    store.toArray();
  };

  /// Get a single global objective by id
  public func getObjective(
    store : ObjectiveStore,
    id : Nat,
  ) : ?ObjectiveTypes.TeamObjective {
    store.find(func(o) { o.id == id });
  };

  /// Accept an objective on behalf of a user
  public func acceptObjective(
    store : ObjectiveStore,
    userStore : UserObjectiveStore,
    userId : Common.UserId,
    objectiveId : Nat,
    now : Common.Timestamp,
  ) : () {
    // Check objective exists
    switch (store.find(func(o) { o.id == objectiveId })) {
      case null return; // no-op if objective doesn't exist
      case (?_) {};
    };
    let userList = switch (userStore.get(userId)) {
      case (?lst) lst;
      case null {
        let lst = List.empty<ObjectiveTypes.UserObjective>();
        userStore.add(userId, lst);
        lst;
      };
    };
    // Idempotent: only add if not already accepted
    let alreadyAccepted = userList.find(func(uo) { uo.objectiveId == objectiveId });
    if (alreadyAccepted == null) {
      userList.add({ objectiveId = objectiveId; progress = 0; acceptedAt = now });
    };
  };

  /// Get all objectives accepted by a user, with their individual progress
  public func getUserObjectives(
    store : ObjectiveStore,
    userStore : UserObjectiveStore,
    userId : Common.UserId,
  ) : [(ObjectiveTypes.TeamObjective, ObjectiveTypes.UserObjective)] {
    let userList = switch (userStore.get(userId)) {
      case (?lst) lst;
      case null return [];
    };
    userList.filterMap<ObjectiveTypes.UserObjective, (ObjectiveTypes.TeamObjective, ObjectiveTypes.UserObjective)>(func(uo) {
      switch (store.find(func(o) { o.id == uo.objectiveId })) {
        case (?obj) ?(obj, uo);
        case null null;
      };
    }).toArray();
  };

  /// Increment per-user progress on any accepted objectives matching sport;
  /// also increments global objective progress.
  public func incrementProgressBySport(
    store : ObjectiveStore,
    userStore : UserObjectiveStore,
    userId : Common.UserId,
    sport : Common.Sport,
  ) : () {
    let userList = switch (userStore.get(userId)) {
      case (?lst) lst;
      case null return;
    };
    // For each accepted objective matching the sport, increment user + global progress
    userList.mapInPlace(func(uo) {
      switch (store.find(func(o) { o.id == uo.objectiveId and o.sport == sport })) {
        case (?_) { { uo with progress = uo.progress + 1 } };
        case null uo;
      };
    });
    // Increment global objective progress
    store.mapInPlace(func(obj) {
      if (obj.sport == sport) {
        let newProgress = obj.currentProgress + 1;
        let newStatus : ObjectiveTypes.ObjectiveStatus = if (newProgress >= obj.targetCount) #completed else #active;
        { obj with currentProgress = newProgress; status = newStatus };
      } else obj;
    });
  };

  /// Seed demo objectives (basketball, soccer, tennis)
  public func seedDemoObjectives(
    store : ObjectiveStore,
    counter : Counter,
    now : Common.Timestamp,
  ) : () {
    let demos : [(Text, Text, Common.Sport, Nat, Text, Text)] = [
      (
        "Hoop Dreams",
        "Score 5 combined goals in pick-up basketball games to unlock a local cafe discount!",
        "basketball",
        5,
        "10% off at Arena Cafe",
        "🏀",
      ),
      (
        "Beautiful Game",
        "Play 3 group soccer sessions together. Build your team chemistry and earn a reward!",
        "soccer",
        3,
        "Free post-match smoothie",
        "⚽",
      ),
      (
        "Ace the Court",
        "Complete 4 doubles tennis matches with new partners to earn the Social Athlete badge!",
        "tennis",
        4,
        "Social Athlete badge",
        "🎾",
      ),
    ];
    for ((title, description, sport, targetCount, rewardText, rewardBadge) in demos.values()) {
      let id = counter.value;
      counter.value += 1;
      store.add({
        id = id;
        title = title;
        description = description;
        sport = sport;
        targetCount = targetCount;
        currentProgress = 0;
        rewardText = rewardText;
        rewardBadge = rewardBadge;
        status = #active;
        createdAt = now;
      });
    };
  };
};
