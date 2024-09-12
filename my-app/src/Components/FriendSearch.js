import React, { useState } from "react";
import API from "../api.js";

const FriendSearch = ({ setChatId }) => {
  const [username, setUsername] = useState("");

const handleSearch = async () => {
  try {
    const { data } = await API.post("/auth/search", { query : username });
    console.log(data);

    if (!data || data.length === 0) {
      console.log("No user found");
      return; // Exit early if no user is found
    }

    const userId1 = localStorage.getItem("userId");
    const userId2 = data._id; // Assuming you get a single user from the search result

    const chat = await API.post("/chat/start", { userId1, userId2 });

    setChatId(chat.data._id);
  } catch (err) {
    console.error(err);
  }
};


  return (
    <div className="flex flex-col items-center space-y-4">
      <h2 className="text-2xl font-bold">Search Friends</h2>
      <input
        type="text"
        placeholder="Enter username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="border p-2 rounded w-full max-w-md"
      />
      <button
        onClick={handleSearch}
        className="bg-blue-500 text-white p-2 rounded w-full max-w-md"
      >
        Start Chat
      </button>
    </div>
  );
};

export default FriendSearch;
