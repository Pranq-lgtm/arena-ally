import Map "mo:core/Map";
import List "mo:core/List";
import Common "../types/common";
import ActivityTypes "../types/activity";
import Time "mo:core/Time";

module {
  public type ActivityLog = Map.Map<Common.UserId, List.List<ActivityTypes.Activity>>;
  public type CounterMap = Map.Map<Common.UserId, Nat>; // per-user next activity id

  /// Log a new activity for a user; returns the saved activity
  public func logActivity(
    log : ActivityLog,
    counters : CounterMap,
    userId : Common.UserId,
    sport : Common.Sport,
    activityType : ActivityTypes.ActivityType,
    notes : Text,
    timestamp : Common.Timestamp,
  ) : ActivityTypes.Activity {
    let id = switch (counters.get(userId)) {
      case (?n) n;
      case null 0;
    };
    counters.add(userId, id + 1);
    let activity : ActivityTypes.Activity = {
      id = id;
      sport = sport;
      activityType = activityType;
      notes = notes;
      timestamp = timestamp;
    };
    let userList = switch (log.get(userId)) {
      case (?lst) lst;
      case null {
        let lst = List.empty<ActivityTypes.Activity>();
        log.add(userId, lst);
        lst;
      };
    };
    userList.add(activity);
    activity;
  };

  /// Get all activities for a user
  public func getActivities(
    log : ActivityLog,
    userId : Common.UserId,
  ) : [ActivityTypes.Activity] {
    switch (log.get(userId)) {
      case (?lst) lst.toArray();
      case null [];
    };
  };

  /// Compute Social Battery score (0-100) from the last 7 days of activities
  public func socialBattery(
    log : ActivityLog,
    userId : Common.UserId,
    now : Common.Timestamp,
  ) : Nat {
    let sevenDaysNs : Int = 7 * 24 * 60 * 60 * 1_000_000_000;
    let cutoff = now - sevenDaysNs;
    let activities = switch (log.get(userId)) {
      case (?lst) lst;
      case null return 50; // neutral default
    };
    var groupCount = 0;
    var soloCount = 0;
    activities.forEach(func(a) {
      if (a.timestamp >= cutoff) {
        switch (a.activityType) {
          case (#group) groupCount += 1;
          case (#solo) soloCount += 1;
        };
      };
    });
    let total = groupCount + soloCount;
    if (total == 0) return 50;
    // Scale: group activities push battery up, solo push it down
    let raw = (groupCount * 100) / total;
    // Clamp to 0-100
    if (raw > 100) 100 else raw;
  };

  /// True when user has had no group activity in the last 5+ days
  public func isBurnoutRisk(
    log : ActivityLog,
    userId : Common.UserId,
    now : Common.Timestamp,
  ) : Bool {
    let fiveDaysNs : Int = 5 * 24 * 60 * 60 * 1_000_000_000;
    let cutoff = now - fiveDaysNs;
    let activities = switch (log.get(userId)) {
      case (?lst) lst;
      case null return true; // no activities at all = burnout risk
    };
    // Find any group activity in last 5 days
    let recentGroup = activities.find(func(a) {
      a.timestamp >= cutoff and a.activityType == #group
    });
    recentGroup == null;
  };

  /// Seed demo activities for a new user
  public func seedDemoActivities(
    log : ActivityLog,
    counters : CounterMap,
    userId : Common.UserId,
    now : Common.Timestamp,
  ) : () {
    let dayNs : Int = 24 * 60 * 60 * 1_000_000_000;
    let demos : [(Common.Sport, ActivityTypes.ActivityType, Text, Int)] = [
      ("basketball", #group, "Pick-up game at the park — great energy!", now - (1 * dayNs)),
      ("soccer", #group, "5v5 match with the crew. We won!", now - (3 * dayNs)),
      ("tennis", #solo, "Morning practice session — working on serve.", now - (5 * dayNs)),
      ("running", #solo, "5K morning run. Personal best!", now - (6 * dayNs)),
      ("basketball", #group, "Team scrimmage — bonding time.", now - (8 * dayNs)),
    ];
    for ((sport, actType, notes, ts) in demos.values()) {
      ignore logActivity(log, counters, userId, sport, actType, notes, ts);
    };
  };
};
