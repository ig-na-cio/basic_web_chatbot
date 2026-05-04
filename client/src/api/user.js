const API_URL = "http://localhost:8000/users";

// Login user
// Backend expects: { nombre : "username" }
// And returns: { id: "userId", name: "username" }
export const loginUser = async (name) => {
  try {
    const response = await fetch(`${API_URL}/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify({ nombre: name })
    });
    const data = await response.json();
    return data;

  } catch (error) {
    console.error("Error logging in user:", error);
    throw error;
  }
};

// Get users chats
// Backend expects: /users/{user_id}/chats
// And returns: { chat_ids: [0, 1, ...], titles: ["Chat 1", "Chat 2", ...] }
export const getUsersChats = async (userId) => {
  try {
    const response = await fetch(`${API_URL}/${userId}/chats`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });
    const data = await response.json();
    return data;

  } catch (error) {
    console.error("Error fetching user's chats:", error);
    throw error;
  }
};