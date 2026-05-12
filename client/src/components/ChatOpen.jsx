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
                    console.log("Fetched chat history:", chatData);
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
        <div className="">
            <ul>
                <button className="block text-amber-200 mb-2 rounded p-2 hover:bg-gray-600 hover:scale-110 border-2 border-amber-500 transition-all duration-300 cursor-pointer outline-none focus:ring-2 focus:ring-amber-500 focus:ring-opacity-50"
                onClick={() => navigate("/chat")}>Back to my chats</button>
            </ul>
            {/* <h2 className="text-amber-200 text-xl underline mb-4">{title}</h2> */}
            <div className="bg-gray-600 p-4 rounded w-150 h-65 mb-4 overflow-y-auto">
            {messages.length === 0 && <p className="text-white"><strong>AI:</strong> Ask me about the weather or general knowledge!</p>}
            <ul className="text-white">
                {messages.map((message, index) => (
                    <li key={index}>
                        <strong>{message.role === "human" ? "You" : "AI"}:</strong> {message.content}
                    </li>
                ))}
            </ul>
            </div>
            <form className="bg-gray-600 p-1 rounded w-146 h-10 flex items-center" 
            onSubmit={handleSendMessage}>
                <label>
                    <input className="justify-left w-130 h-8 p-2 rounded text-white"
                    placeholder="Enter a message:" 
                    type="text" 
                    value={newMessage} 
                    onChange={(e) => setNewMessage(e.target.value)} 
                    />
                </label>
                <button 
                className="justify-right w-30 text-amber-200 rounded p-1 hover:bg-gray-600 hover:scale-110 border-2 border-amber-500 transition-all duration-300 cursor-pointer outline-none focus:ring-2 focus:ring-amber-500 focus:ring-opacity-50"
                type="submit">Submit</button>
            </form>
        </div>
    );
}

export default ChatOpen;