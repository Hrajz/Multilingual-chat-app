import React, { useState } from "react";
import Login from "./Components/Login";
import Register from "./Components/Register";
import FriendSearch from "./Components/FriendSearch";
import Chat from "./Components/Chat";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [chatId, setChatId] = useState(null);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 space-y-8 p-8">
      {!token ? (
        <div className="flex flex-col space-y-8">
          <Register />
          <Login setToken={setToken} />
        </div>
      ) : (
        <div className="flex flex-col space-y-8">
          <FriendSearch setChatId={setChatId} />
          {chatId && <Chat chatId={chatId} />}
        </div>
      )}
    </div>
  );
}

export default App;
