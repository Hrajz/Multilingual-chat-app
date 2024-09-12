import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { sendMessage } from "../api";

const socket = io("http://localhost:5000");

const Chat = ({ chatId }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.emit("joinChat", chatId);
    socket.on("receiveMessage", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });
  }, [chatId]);

  const handleSend = async () => {
    await sendMessage({
      chatId,
      sender: localStorage.getItem("userId"),
      message,
    });
    socket.emit("message", chatId, message);
    setMessage("");
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <h2 className="text-2xl font-bold">Chat</h2>
      <div className="border p-4 rounded w-full max-w-lg space-y-2">
        {messages.map((msg, index) => (
          <p key={index} className="bg-gray-100 p-2 rounded">
            {msg}
          </p>
        ))}
      </div>
      <input
        type="text"
        placeholder="Type a message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="border p-2 rounded w-full max-w-lg"
      />
      <button
        onClick={handleSend}
        className="bg-blue-500 text-white p-2 rounded w-full max-w-lg"
      >
        Send
      </button>
    </div>
  );
};

export default Chat;
