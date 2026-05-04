import { useState } from "react";
import ChatList from "../components/ChatList";
import { useNavigate, useParams } from "react-router-dom";
import { createChat } from "../api/chat";
import ChatOpen from "../components/ChatOpen";

function ChatOpenPage() {
    const navigate = useNavigate();
    const [activeChatId, setActiveChatId] = useState(null);
    const [activeChatTitle, setActiveChatTitle] = useState("");
    // const handleLoginSuccess = () => {
    //     // After successful login, navigate to the chat page
    //     console.log("Login successful, navigating to chat...");
    //     navigate("/chat");
    // };
    const userId = sessionStorage.getItem("userId");
    const chatId = useParams().chatId;

    return (
        <div>
            {userId ? <ChatOpen chatId={chatId} /> : <p><a href="/">Please log in.</a></p>}
        </div>
    );
}

export default ChatOpenPage;