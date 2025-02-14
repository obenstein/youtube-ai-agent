"use client";

import { Doc, Id } from "@/convex/_generated/dataModel";
import { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";
import { ChatRequestBody } from "@/lib/types";

interface ChatInterfaceProps {
  chatId: Id<"chats">;
  initialMessages: Doc<"messages">[];
}
function ChatInterface({ chatId, initialMessages }: ChatInterfaceProps) {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const [streamedResponse, setStreamedResponse] = useState("");
  const [currentTool, setCurrentTool] = useState<{
    name: string;
    input: string;
  } | null>(null);
  const messageEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, streamedResponse]);

  // const handleSubmit = async (e: React.FormEvent) => {
  //     e.preventDefault();
  //     const trimmedInput = input.trim();
  //     if (!trimmedInput || isLoading) return;

  //     // Reset UI state for new message
  //     setInput("");
  //     setStreamedResponse("");
  //     setCurrentTool(null);
  //     setIsLoading(true);

  //     // Add user's message immediately for better UX
  //     const optimisticUserMessage: Doc<"messages"> = {
  //       _id: `temp_${Date.now()}`,
  //       chatId,
  //       content: trimmedInput,
  //       role: "user",
  //       createdAt: Date.now(),
  //     } as Doc<"messages">;

  //     setMessages((prev) => [...prev, optimisticUserMessage]);

  //     // Track complete response for saving to database
  //     let fullResponse = "";

  //     try {
  //       // Prepare chat history and new message for API
  //       const requestBody: ChatRequestBody = {
  //         messages: messages.map((msg) => ({
  //           role: msg.role,
  //           content: msg.content,
  //         })),
  //         newMessage: trimmedInput,
  //         chatId,
  //       };

  //       // Initialize SSE connection
  //       const response = await fetch("/api/chat/stream", {
  //         method: "POST",
  //         headers: { "Content-Type": "application/json" },
  //         body: JSON.stringify(requestBody),
  //       });

  //       if (!response.ok) throw new Error(await response.text());
  //       if (!response.body) throw new Error("No response body available");

  //       // Create SSE parser and stream reader
  //       const parser = createSSEParser();
  //       const reader = response.body.getReader();

  //       // Process the stream chunks
  //       await processStream(reader, async (chunk) => {
  //         // Parse SSE messages from the chunk
  //         const messages = parser.parse(chunk);

  //         // Handle each message based on its type
  //         for (const message of messages) {
  //           switch (message.type) {
  //             case StreamMessageType.Token:
  //               // Handle streaming tokens (normal text response)
  //               if ("token" in message) {
  //                 fullResponse += message.token;
  //                 setStreamedResponse(fullResponse);
  //               }
  //               break;

  //             case StreamMessageType.ToolStart:
  //               // Handle start of tool execution (e.g. API calls, file operations)
  //               if ("tool" in message) {
  //                 setCurrentTool({
  //                   name: message.tool,
  //                   input: message.input,
  //                 });
  //                 fullResponse += formatTerminalOutput(
  //                   message.tool,
  //                   message.input,
  //                   "Processing..."
  //                 );
  //                 setStreamedResponse(fullResponse);
  //               }
  //               break;

  //             case StreamMessageType.ToolEnd:
  //               // Handle completion of tool execution
  //               if ("tool" in message && currentTool) {
  //                 // Replace the "Processing..." message with actual output
  //                 const lastTerminalIndex = fullResponse.lastIndexOf(
  //                   '<div class="bg-[#1e1e1e]'
  //                 );
  //                 if (lastTerminalIndex !== -1) {
  //                   fullResponse =
  //                     fullResponse.substring(0, lastTerminalIndex) +
  //                     formatTerminalOutput(
  //                       message.tool,
  //                       currentTool.input,
  //                       message.output
  //                     );
  //                   setStreamedResponse(fullResponse);
  //                 }
  //                 setCurrentTool(null);
  //               }
  //               break;

  //             case StreamMessageType.Error:
  //               // Handle error messages from the stream
  //               if ("error" in message) {
  //                 throw new Error(message.error);
  //               }
  //               break;

  //             case StreamMessageType.Done:
  //               // Handle completion of the entire response
  //               const assistantMessage: Doc<"messages"> = {
  //                 _id: `temp_assistant_${Date.now()}`,
  //                 chatId,
  //                 content: fullResponse,
  //                 role: "assistant",
  //                 createdAt: Date.now(),
  //               } as Doc<"messages">;

  //               // Save the complete message to the database
  //               const convex = getConvexClient();
  //               await convex.mutation(api.messages.store, {
  //                 chatId,
  //                 content: fullResponse,
  //                 role: "assistant",
  //               });

  //               setMessages((prev) => [...prev, assistantMessage]);
  //               setStreamedResponse("");
  //               return;
  //           }
  //         }
  //       });
  //     } catch (error) {
  //       // Handle any errors during streaming
  //       console.error("Error sending message:", error);
  //       // Remove the optimistic user message if there was an error
  //       setMessages((prev) =>
  //         prev.filter((msg) => msg._id !== optimisticUserMessage._id)
  //       );
  //       setStreamedResponse(
  //         formatTerminalOutput(
  //           "error",
  //           "Failed to process message",
  //           error instanceof Error ? error.message : "Unknown error"
  //         )
  //       );
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedInput = input.trim();
    if (!trimmedInput || isLoaded) return;
    setInput("");
    setStreamedResponse("");
    setCurrentTool(null);
    setIsLoaded(true);
    const optimisticUserMessage: Doc<"messages"> = {
      _id: `temp_${Date.now()}`,
      chatId,
      content: trimmedInput,
      role: "user",
      createdAt: Date.now(),
    } as Doc<"messages">;

    setMessages((prev) => [...prev, optimisticUserMessage]);

    let fullResponse = "";
    try {
      const requestBody: ChatRequestBody = {
        messages: messages.map((msg) => ({
          role: msg.role,
          content: msg.content,
        })),
        newMessage: trimmedInput,
        chatId,
      };

      
      const response = await fetch("/api/chat/stream", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });
      if (!response.ok) throw new Error(await response.text());
      if (!response.body) throw new Error("No response body available");
    } catch (error) {
      console.error("Error sending message:", error);

      setMessages((prev) =>
        prev.filter((msg) => msg._id !== optimisticUserMessage._id)
      );
      setStreamedResponse("error");
    } finally {
      setIsLoaded(false);
    }
  };

  return (
    <main className="flex flex-col h-[calc(100vh-theme(spacing.16))]">
      <section className="bg-red-5 flex-1">
        <div>
          <div ref={messageEndRef} />
        </div>
      </section>
      <footer>
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto relative">
          <div className="relative flex items-center">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Message AI Agent..."
              className="flex-1 py-3 px-4 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-12 bg-gray-50 placeholder:text-gray-500"
              disabled={isLoaded}
            />
            <Button
              type="submit"
              disabled={isLoaded || !input.trim()}
              className={`absolute right-1.5 rounded-xl h-9 w-9 p-0 flex items-center justify-center transition-all ${
                input.trim()
                  ? "bg-blue-600 hover:bg-blue-700 text-white shadow-sm"
                  : "bg-gray-100 text-gray-400"
              }`}
            >
              <ArrowRight />
            </Button>
          </div>
        </form>
      </footer>
    </main>
  );
}

export default ChatInterface;
