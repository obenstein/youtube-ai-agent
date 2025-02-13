import { Id } from "@/convex/_generated/dataModel";

interface ChatPageProps {
    params: {
        chatId: Id<"chats">;
    };
}

async function ChatPage({
    params
}:
ChatPageProps
) {
    const {chatId}= await params;

  return (
    <div>
ChatPage :{chatId}
    </div>
  );
}

export default ChatPage 
