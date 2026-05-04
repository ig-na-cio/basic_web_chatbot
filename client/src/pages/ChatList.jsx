import { useState } from "react";
import ChatList from "../components/ChatList";
import { useNavigate } from "react-router-dom";
import { createChat } from "../api/chat";
import ChatOpen from "../components/ChatOpen";

function ChatListPage() {
    const navigate = useNavigate();
    const [activeChatId, setActiveChatId] = useState(null);
    const [activeChatTitle, setActiveChatTitle] = useState("");

    // const handleLoginSuccess = () => {
    //     // After successful login, navigate to the chat page
    //     console.log("Login successful, navigating to chat...");
    //     navigate("/chat");
    // };
    const userId = sessionStorage.getItem("userId");

    const handleNewChat = async () => {
        try {
            const chatData = await createChat(userId);
            console.log("Chat created with ID:", chatData.chat_id);
            // We need to refresh the chat list after creating a new chat
            // For now we will
            // navigate("/chat");
            // We will have to correct it later, to getChats again
            setActiveChatId(chatData.chat_id);
            setActiveChatTitle(chatData.title || `Chat ${chatData.chat_id}`);
            navigate(`/chatopen/${chatData.chat_id}`);
        }
        catch (error) {
            console.error("Failed to create chat:", error);
        }
    };

    return (
        <div>
            <h1>Your chats: </h1>
            <ChatList />
            <h1>New Chat: </h1>
            <button onClick={() => handleNewChat()}>New Chat</button>
        </div>
    );
}

export default ChatListPage;