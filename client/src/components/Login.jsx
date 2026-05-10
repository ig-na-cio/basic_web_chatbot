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
            <h2 className="text-3xl font-bold text-center text-amber-200 pb-4 animate-pulse hover:animate-spin cursor-pointer">☀️</h2>
            <form onSubmit={(e) => e.preventDefault()}>
                <label className="block text-amber-200 mb-2 rounded p-2 hover:bg-gray-600 hover:scale-110 border-2 border-amber-500 transition-all duration-300 cursor-pointer">
                    <input
                        type="text"
                        placeholder="Enter your name"
                        autoFocus
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </label>
                <button onClick={handleLogin} className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 px-4 rounded center block mx-auto mt-1 transition-all duration-500 hover:scale-90 scale-80 cursor-pointer">
                    Login
                </button>
            </form>
            
        </div>
    );
}

export default Login;