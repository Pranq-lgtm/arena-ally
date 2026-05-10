import AccessControl "mo:caffeineai-authorization/access-control";
import Runtime "mo:core/Runtime";

mixin (
  accessControlState : AccessControl.AccessControlState,
  openAIApiKey : { var value : ?Text },
) {
  /// Admin only: set the shared OpenAI API key
  public shared ({ caller }) func setOpenAIApiKey(key : Text) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can set the OpenAI API key");
    };
    openAIApiKey.value := ?key;
  };

  /// Public: check whether the OpenAI API key is configured
  public query func isOpenAIConfigured() : async Bool {
    openAIApiKey.value != null;
  };
};
