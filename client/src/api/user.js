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
    return data.id;

  } catch (error) {
    console.error("Error logging in user:", error);
    throw error;
  }
};

