import { useState, useEffect } from "react";
import API from "../api.js";

const FriendList = ({ setChatWithFriend }) => {
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const userId = localStorage.getItem("userId");
        const { data } = await API.get("/user/friends", { params: { userId } });
        setFriends(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchFriends();
  }, []);

  return (
    <div>
      <h2>Friends</h2>
      <ul>
        {friends.map((friend) => (
          <li key={friend._id}>
            <button onClick={() => setChatWithFriend(friend._id)}>
              {friend.username}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FriendList;
