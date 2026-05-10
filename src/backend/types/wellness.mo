import Common "common";

module {
  public type WellnessTip = {
    tip : Text;
    generatedAt : Common.Timestamp;
    socialBattery : Nat; // 0-100
    isBurnoutRisk : Bool;
  };
};
