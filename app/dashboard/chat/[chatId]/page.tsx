// Import necessary components and hooks
import ChatInterface from "@/components/ChatInterface";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { getConvexClient } from "@/lib/convex";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

// Server-side logic inside the server component
interface ChatPageProps {
    chatId: Id<"chats">;
    initialMessages: any;  // Adjust this type based on what you're returning from the API
}

// Server component
export default async function ChatPage({ params }: { params: { chatId: Id<"chats"> } }) {
    const { chatId } = params;
    const { userId } = await auth();

    if (!userId) {
        redirect("/");
    }

    const convex = getConvexClient();
    const initialMessages = await convex.query(api.messages.list, { chatId });

    return (
        <div>
            <ChatInterface
                chatId={chatId}
                initialMessages={initialMessages}
            />
        </div>
    );
}
