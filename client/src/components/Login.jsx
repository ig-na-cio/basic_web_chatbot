import { useEffect, useState } from "react";
import { loginUser } from "../api/user";

function Login() {
    const [name, setName] = useState("");
    const [userId, setUserId] = useState(null);

    const handleLogin = async () => {
        try {
            const id = await loginUser(name);
            setUserId(id);
        } catch (error) {
            console.error("Login failed:", error);
        }
    };

    useEffect(() => {
        if (userId && name) {
            // Store user ID in localStorage for session persistence
            // sessionstorage or localStorage
            sessionStorage.setItem("userId", userId);
            sessionStorage.setItem("userName", name);
        }
    }, [userId, name]);

    return (
        <div>
            <h2>Login</h2>
            <input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <button onClick={handleLogin}>Login</button>
        </div>
    );
}

export default Login;