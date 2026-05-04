import { useEffect, useState } from "react";
import { loginUser } from "../api/user";

function Login({onLoginSuccess}) {
    const [name, setName] = useState("");
    const [userId, setUserId] = useState(null);

    const handleLogin = async () => {
        try {
            const userData = await loginUser(name);
            setUserId(userData.id);
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
            onLoginSuccess();
        }
    }, [userId, name]);


    return (
        <div>
            <h2>Login</h2>

            <form onSubmit={(e) => e.preventDefault()}>
                <label>
                    <input
                        type="text"
                        placeholder="Enter your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </label>
                <button onClick={handleLogin}>Login</button>
            </form>
            
        </div>
    );
}

export default Login;