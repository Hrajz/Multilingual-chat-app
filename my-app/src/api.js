import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

export const registerUser = (data) => API.post("/auth/register", data);
export const loginUser = (data) => API.post("/auth/login", data);
export const startChat = (data) => API.post("/chat/start", data);
export const sendMessage = (data) => API.post("/chat/send", data);

export default API;
