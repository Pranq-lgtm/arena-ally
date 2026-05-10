import { defaultConfig; type Config } "mo:openai-client/Config";
import ChatApi "mo:openai-client/Apis/ChatApi";
import CreateChatCompletionRequest "mo:openai-client/Models/CreateChatCompletionRequest";
import ChatCompletionRequestUserMessage "mo:openai-client/Models/ChatCompletionRequestUserMessage";
import Runtime "mo:core/Runtime";

module {
  /// Build a Config bound to the given bearer. `is_replicated = ?false` is REQUIRED.
  public func configForKey(key : Text) : Config {
    {
      defaultConfig with
      auth = ?#bearer key;
      is_replicated = ?false;
    };
  };

  /// Call OpenAI ChatCompletion with a plain text prompt; returns the response text.
  public func runChatCompletion(config : Config, prompt : Text) : async* Text {
    let userMessage = ChatCompletionRequestUserMessage.JSON.init({
      content = #string prompt;
      role = #user;
    });
    let req = CreateChatCompletionRequest.JSON.init({
      messages = [#user userMessage];
      model = "gpt-4o-mini";
    });
    let resp = await* ChatApi.createChatCompletion(config, req);
    if (resp.choices.size() == 0) {
      Runtime.trap("OpenAI returned no choices");
    };
    switch (resp.choices[0].message.content) {
      case (?text) text;
      case null Runtime.trap("OpenAI returned no text content");
    };
  };
};
