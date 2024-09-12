import React, { useState } from "react";
import { loginUser } from "../api";

const Login = ({ setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await loginUser({ email, password });
      setToken(data.token);
      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", data.username);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center space-y-4"
    >
      <h2 className="text-2xl font-bold">Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2 rounded w-full max-w-md"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border p-2 rounded w-full max-w-md"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white p-2 rounded w-full max-w-md"
      >
        Login
      </button>
    </form>
  );
};

export default Login;
