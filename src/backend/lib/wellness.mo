import Map "mo:core/Map";
import Common "../types/common";
import WellnessTypes "../types/wellness";

module {
  public type TipStore = Map.Map<Common.UserId, WellnessTypes.WellnessTip>;

  /// Build a rule-based fallback tip based on social battery + burnout signal
  public func fallbackTip(
    socialBattery : Nat,
    isBurnoutRisk : Bool,
    now : Common.Timestamp,
  ) : WellnessTypes.WellnessTip {
    let tip = if (isBurnoutRisk) {
      "⚠️ Your Social Battery is running low! You haven't connected with teammates in 5+ days. Try joining a pick-up game this week — even 30 minutes of group activity can boost your mood and performance by up to 40%."
    } else if (socialBattery >= 75) {
      "🔋 Your Social Battery is fully charged! You're crushing it with group activities. Keep the momentum going — your teammates thrive when you show up consistently."
    } else if (socialBattery >= 50) {
      "⚡ Good social energy! You're maintaining healthy group activity habits. Consider adding one more team session this week to keep your Social Battery in the green zone."
    } else if (socialBattery >= 25) {
      "📉 Your Social Battery is dipping below half. You've been doing more solo work lately — try reaching out to a teammate for a quick game session to recharge!"
    } else {
      "🔴 Low Social Battery alert! Prioritise group activities this week. Research shows athletes who train socially experience 60% less burnout. Find a buddy and hit the court together!"
    };
    {
      tip = tip;
      generatedAt = now;
      socialBattery = socialBattery;
      isBurnoutRisk = isBurnoutRisk;
    };
  };

  /// Store an AI-generated (or fallback) tip for a user
  public func storeTip(
    store : TipStore,
    userId : Common.UserId,
    tip : WellnessTypes.WellnessTip,
  ) : () {
    store.add(userId, tip);
  };

  /// Retrieve the latest cached tip for a user
  public func getTip(
    store : TipStore,
    userId : Common.UserId,
  ) : ?WellnessTypes.WellnessTip {
    store.get(userId);
  };

  /// Build the prompt text sent to OpenAI for wellness tip generation
  public func buildTipPrompt(
    socialBattery : Nat,
    isBurnoutRisk : Bool,
  ) : Text {
    let burnoutText = if (isBurnoutRisk) "The user has NOT had any group activity in 5+ days and is at burnout risk." else "The user has had recent group activities and is not at immediate burnout risk.";
    "You are a sports wellness coach for Arena Ally, a social sports app. Give a single, motivating wellness tip (2-3 sentences max) to an athlete based on their Social Battery score.\n\nSocial Battery: " # socialBattery.toText() # "/100 (higher = more social group activity recently)\n" # burnoutText # "\n\nBe concise, warm, action-oriented, and sports-focused. Include 1 relevant emoji. Do not add headers or bullet points — just the tip."
  };
};
