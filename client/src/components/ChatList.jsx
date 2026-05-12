import { useEffect, useState } from "react";
import { getUsersChats } from "../api/user";

function ChatList() {
    const [chats, setChats] = useState([]);
    const [userId, setUserId] = useState(null);
    const [titles, setTitles] = useState([]);

    useEffect(() => {
        const storedUserId = sessionStorage.getItem("userId");
        if (storedUserId) {
            setUserId(storedUserId);
        }
    }, []);

    useEffect(() => {
        if (userId) {
            const fetchChats = async () => {
                try {
                    const chatData = await getUsersChats(userId);
                    setChats(chatData.chat_ids);
                    setTitles(chatData.titles);
                } catch (error) {
                    console.error("Error fetching user's chats:", error);
                }
            };
            fetchChats();
        }
    }, [userId]);

    return (
        <div className="">
            <ul>
                {chats.map((chatId, index) => (
                    <li key={chatId} className="h-9 justify-content border-2 border-amber-500 rounded p-2 bg-gray-600 mb-2 hover:bg-gray-400 transition-all duration-300 scale-90 hover:scale-100">
                        <a href={`/chatopen/${chatId}`}>{titles[index] || `Chat ${chatId}`}</a>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ChatList;