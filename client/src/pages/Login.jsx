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
        
        <div className="bg-gray-700 min-h-screen flex flex-col items-center justify-center transition-all duration-400">
            <h1 className="text-5xl font-bold text-center text-amber-50 p-4">
                Welcome to the Weather App
            </h1>
            <Login onLoginSuccess={handleLoginSuccess} />
        </div>
    );
}

export default LoginPage;