const http = require("http");
const socketIo = require("socket.io");
const app = require("./app");
const connectDB = require("./config/db");

connectDB();

// Create the HTTP server and initialize Socket.io
const server = http.createServer(app);
const io = socketIo(server, {
  cors: { origin: "http://localhost:3000" },
  methods: ["GET", "POST"]
});


// Handle Socket.io connections
io.on("connection", (socket) => {
  console.log("User connected", socket.id);

  socket.on("joinChat", (chatId) => {
    socket.join(chatId);
  });

  socket.on("message", (chatId, message) => {
    io.to(chatId).emit("receiveMessage", message);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
