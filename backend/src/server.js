import express from "express";
import http from "http";
import { Server as IOServer } from "socket.io";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";

import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// connect DB
connectDB(process.env.MONGO_URI);

// create HTTP server + Socket.IO
const server = http.createServer(app);
const io = new IOServer(server, { cors: { origin: "*", methods: ["GET", "POST", "PUT", "DELETE"] } });

io.on("connection", (socket) => {
  console.log("Socket connected:", socket.id);

  // client sends { userId } to join personal room
  socket.on("join:user", (userId) => {
    if (userId) socket.join(String(userId));
  });

  // client can join project room to get project-level events
  socket.on("join:project", (projectId) => {
    if (projectId) socket.join(String(projectId));
  });

  socket.on("leave:project", (projectId) => {
    if (projectId) socket.leave(String(projectId));
  });

  socket.on("disconnect", () => {
    // console.log("Socket disconnected", socket.id);
  });
});

// attach io to req so controllers can emit
app.use((req, res, next) => {
  req.io = io;
  next();
});

// routes
app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/notifications", notificationRoutes);

// error handling
app.use(notFound);
app.use(errorHandler);

// start
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
