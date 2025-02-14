// First, update your imports - replace Anthropic with OpenAI-compatible client
import { BaseMessage } from "@langchain/core/messages";
import { ChatOpenAI } from "@langchain/openai";

// ... keep other existing imports ...

// Replace the Anthropic initialization with DeepSeek configuration
const initialiseModel = () => {
  const model = new ChatOpenAI({
    modelName: "deepseek-chat", // Current recommended model
    openAIApiKey: process.env.DEEPSEEK_API_KEY, // Update environment variable
    configuration: {
      baseURL: "https://api.deepseek.com/v1", // DeepSeek's API endpoint
    },
    temperature: 0.7,
    maxTokens: 4096,
    streaming: true,
    callbacks: [
      {
        handleLLMStart: async () => {
          // console.log("🤖 Starting LLM call");
        },
        handleLLMEnd: async (output) => {
          console.log("🤖 End LLM call", output);
          const usage = output.llmOutput?.usage;
          if (usage) {
            // DeepSeek uses OpenAI-compatible usage format
            console.log("📊 Token Usage:", {
              input_tokens: usage.prompt_tokens,
              output_tokens: usage.completion_tokens,
              total_tokens: usage.total_tokens,
            });
          }
        },
      },
    ],
  }).bindTools(tools);

  return model;
};

// Remove Anthropic-specific caching headers
function addCachingHeaders(messages: BaseMessage[]): BaseMessage[] {
  // DeepSeek currently doesn't support prompt caching headers
  return messages; // Simply return original messages without modification
}