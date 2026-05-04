import { useEffect, useState } from "react";
import { getUsersChats } from "../api/user";
import { createChat, getChatMessages } from "../api/chat";
import { useNavigate } from "react-router-dom";
import { newMessagetoChat } from "../api/chat";

function ChatOpen( {chatId} ) {
    const [userId, setUserId] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [title, setTitle] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const storedUserId = sessionStorage.getItem("userId");
        if (storedUserId) {
            setUserId(storedUserId);
        }
    }, []);

    useEffect(() => {
        if (userId) {
            const getChatHistory = async () => {
                try {
                    const chatData = await getChatMessages(chatId, userId);
                    setMessages(chatData.messages);
                    setTitle(chatData.title || `New Chat`);
                } catch (error) {
                    console.error("Error fetching chat history:", error);
                }
            };
            getChatHistory();
        }
    }, [userId]);

    const handleSendMessage = async (event) => {
        console.log("Handling send message event:", event);
        event.preventDefault(); // Prevent form submission
        const message = newMessage.trim();
        if (message) {
            try {
                console.log("Sending message to chat:", { userId, chatId, message });
                setMessages(prevMessages => [...prevMessages, { role: "human", content: message }]);
                setNewMessage(""); // Clear the input field
                const response = await newMessagetoChat(userId, chatId, message);
                // response.response contains the response
                setMessages(prevMessages => [...prevMessages, { role: "ai", content: response.response }]);
                console.log("Message sent and response received:", response);
                
                setTitle(response.title || `Chat ${chatId}`);
            
            } catch (error) {
                console.error("Error sending message:", error);
            }
        }
    };


    return (
        <div>
            <ul>
                <button onClick={() => navigate("/chat")}>My chats</button>
            </ul>
            <h2>{title}</h2>
            {messages.length === 0 && <p>Ask me about the weather or general knowledge!</p>}
            <ul>
                {messages.map((message, index) => (
                    <li key={index}>
                        <strong>{message.role === "human" ? "You" : "AI"}:</strong> {message.content}
                    </li>
                ))}
            </ul>
            <form onSubmit={handleSendMessage}>
                <label>
                    Enter a message:
                    <input 
                    type="text" 
                    value={newMessage} 
                    onChange={(e) => setNewMessage(e.target.value)} 
                    />
                </label>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default ChatOpen;