import ChatInterface from "@/components/ChatInterface";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { getConvexClient } from "@/lib/convex";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

interface ChatPageProps {
    params: {
        chatId: Id<"chats">;
    };
}

async function ChatPage({
    params,
}: ChatPageProps) {
    const { chatId } =await params;
    const { userId } = await auth();

    if (!userId) {
        redirect("/");
    }
    const convex=getConvexClient();

    // Convert chatId to Id<"chats"> type as needed
    const initialMessages = await convex.query(api.messages.list, { chatId: chatId as Id<"chats"> });

    return (
        <div>
<ChatInterface
 chatId={chatId}
 initialMessages={initialMessages}
 /> 
        </div>
    );
}

export default ChatPage 
