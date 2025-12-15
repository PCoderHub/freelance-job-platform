require("dotenv").config();
const express = require("express");
const { DBConnect } = require("./config/db");
const errorHandler = require("./middleware/errorHandler");
const app = express();
const port = process.env.PORT || 3000;
const cookieParser = require("cookie-parser");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const freelancerRoutes = require("./routes/freelancerRoutes");
const clientRoutes = require("./routes/clientRoutes");
const jobRoutes = require("./routes/jobRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const imageRoutes = require("./routes/imageRoutes");
const adminRoutes = require("./routes/adminRoutes");
const chatRoutes = require("./routes/chatRoutes");
const http = require("http");
const { Server } = require("socket.io");
const server = http.createServer(app);
const paymentRoutes = require("./routes/paymentRoutes");

const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";

DBConnect();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: FRONTEND_URL,
    credentials: true,
  })
);

app.use("/api/auth", userRoutes);
app.use("/api/freelancer", freelancerRoutes);
app.use("/api/client", clientRoutes);
app.use("/api/job", jobRoutes);
app.use("/api/review", reviewRoutes);
app.use("/api/upload", imageRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/payment", paymentRoutes);

app.use(errorHandler);

const io = new Server(server, {
  cors: {
    origin: FRONTEND_URL,
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("Socket connected: ", socket.id);

  socket.on("joinChat", (jobId) => {
    socket.join(jobId);
  });

  socket.on("sendMessage", ({ jobId, text }) => {
    socket.to(jobId).emit("receiveMessage", text);
  });

  socket.on("disconnect", () => {
    console.log("Socket disconnected: ", socket.id);
  });
});

server.listen(port, () => {
  console.log(`Server and SocketIO listening on port ${port}`);
});
