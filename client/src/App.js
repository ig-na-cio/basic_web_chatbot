import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/Login";
import ChatListPage from "./pages/ChatList";
import ChatOpenPage from "./pages/ChatOpen";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/chat" element={<ChatListPage />} />
        <Route path="/chatopen/:chatId" element={<ChatOpenPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;