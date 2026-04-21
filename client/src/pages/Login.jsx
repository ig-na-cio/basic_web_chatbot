import { useState } from "react";
import Login from "../components/Login";
import { useNavigate } from "react-router-dom";

// For now, we only call the Login component
function LoginPage() {
    const navigate = useNavigate();

    const handleLoginSuccess = () => {
        // After successful login, navigate to the chat page
        console.log("Login successful, navigating to chat...");
        navigate("/chat");
    };

    return (
        <div>
            <h1>Welcome to the Chat App</h1>
            <Login onLoginSuccess={handleLoginSuccess} />
        </div>
    );
}

export default LoginPage;