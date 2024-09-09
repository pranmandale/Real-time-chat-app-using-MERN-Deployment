

import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    // origin: "http://localhost:5173", // Update to match your frontend origin
    origin: "https://real-time-chat-app-using-mern-deployment.onrender.com",
    methods: ["GET", "POST"],
  },
});

// Your existing real-time message code
export const getReceiverSocketId = (receiverId) => {
  return users[receiverId];
};

const users = {};

// Handle connection and disconnection
io.on("connection", (socket) => {
  console.log("a user connected", socket.id);
  const userId = socket.handshake.query.userId;
  if (userId) {
    users[userId] = socket.id;
    console.log("Hello ", users);
  }
  // Notify all connected users of online users
  io.emit("getOnlineUsers", Object.keys(users));

  // Handle disconnection
  socket.on("disconnect", () => {
    console.log("a user disconnected", socket.id);
    delete users[userId];
    io.emit("getOnlineUsers", Object.keys(users));
  });
});

export { app, io, server };
