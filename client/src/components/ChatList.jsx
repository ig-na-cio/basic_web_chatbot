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
        <div>
            <h2>Your Chats</h2>
            <ul>
                {chats.map((chatId, index) => (
                    <li key={chatId}>
                        <a href={`/chatopen/${chatId}`}>{titles[index] || `Chat ${chatId}`}</a>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ChatList;