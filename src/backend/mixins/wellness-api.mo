import AccessControl "mo:caffeineai-authorization/access-control";
import WellnessLib "../lib/wellness";
import ActivityLib "../lib/activity";
import OpenAILib "../lib/openai";
import WellnessTypes "../types/wellness";
import Common "../types/common";
import Time "mo:core/Time";

mixin (
  accessControlState : AccessControl.AccessControlState,
  activityLog : ActivityLib.ActivityLog,
  tipStore : WellnessLib.TipStore,
  openAIApiKey : { var value : ?Text },
) {
  /// Get the latest cached wellness tip for the caller
  public query ({ caller }) func getMyWellnessTip() : async ?WellnessTypes.WellnessTip {
    WellnessLib.getTip(tipStore, caller);
  };

  /// Generate (or refresh) a wellness tip for the caller using AI or rule-based fallback
  public shared ({ caller }) func refreshMyWellnessTip() : async WellnessTypes.WellnessTip {
    let now = Time.now();
    let battery = ActivityLib.socialBattery(activityLog, caller, now);
    let burnout = ActivityLib.isBurnoutRisk(activityLog, caller, now);
    let tip : WellnessTypes.WellnessTip = switch (openAIApiKey.value) {
      case (?key) {
        let prompt = WellnessLib.buildTipPrompt(battery, burnout);
        let config = OpenAILib.configForKey(key);
        try {
          let text = await* OpenAILib.runChatCompletion(config, prompt);
          { tip = text; generatedAt = now; socialBattery = battery; isBurnoutRisk = burnout };
        } catch (_) {
          WellnessLib.fallbackTip(battery, burnout, now);
        };
      };
      case null WellnessLib.fallbackTip(battery, burnout, now);
    };
    WellnessLib.storeTip(tipStore, caller, tip);
    tip;
  };
};
