const API_URL = "http://localhost:8000/chat";

// Create chat
// Backend expects: user_id via query
// And returns: { chatId: "chatId" }
export const createChat = async (userId) => {
    try {
        const response = await fetch(`${API_URL}/create?user_id=${userId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ nombre: userId })
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error creating chat:", error);
        throw error;
    }
};

// Add a message to the chat
// Backend expects: /chat with {"user_id": int, "chat_id": int, "message": string}
export const newMessagetoChat = async (userId, chatId, message) => {
    try {
        const response = await fetch(`${API_URL}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ user_id: userId, chat_id: chatId, message: message })
        });
        const data = await response.json();
        console.log("Response from adding message to chat:", data);
        return data;
    } catch (error) {
        console.error("Error adding message to chat:", error);
        throw error;
    }
};

// Backend expects: /chat/{chat_id} GET, chat_id via path, user_id via query
// And returns: { messages: [{ role: "human" | "ai", content: "message text" }, ...] }
// We also need userId via query
export const getChatMessages = async (chatId, userId) => {
    try {
        const response = await fetch(`${API_URL}/${chatId}?user_id=${userId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching chat messages:", error);
        throw error;
    }
};
