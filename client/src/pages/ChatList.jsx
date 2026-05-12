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
        <div className="bg-gray-700 min-h-screen grid grid-cols-5 rounded transition-all duration-400">
            <div className="col-span-1 text-amber-400 p-4 border-2 border-gray-500 rounded">
            <h1 className="font-bold text-xl">Your chats: </h1>
            <div className="max-h-screen mt-8">
            <ChatList />
            </div>
            </div>
            <div className="col-span-4 flex flex-col items-center center-justify bg-gray-600 text-amber-500 p-4 border-5 border-gray-500 rounded">
            <h1 className="block font-base text-lg center-justify border-2 border-amber-300 p-2 mt-40 rounded">Click the chat you want to open from the chat list or create a new one!</h1>
            <br />
            <button className="block text-amber-200 mb-2 rounded p-2 hover:bg-gray-600 hover:scale-110 border-2 border-amber-500 transition-all duration-300 cursor-pointer outline-none focus:ring-2 focus:ring-amber-500 focus:ring-opacity-50"
                         onClick={() => handleNewChat()}>New Chat</button>
            </div>
        </div>
    );
}

export default ChatListPage;