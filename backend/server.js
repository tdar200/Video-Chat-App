const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cors = require("cors");
const connectDB = require("./connectDB");
const notFound = require("./middleware/errorMiddleware");
const errorHandler = require("./middleware/errorMiddleware");
const app = express();
const server = require("http").Server(app);
const path = require("path");
// const bodyParser = require('body-parser');
// const io = require("socket.io")(server)
// const { v4: uuidv4 } = require("uuid");

dotenv.config();
connectDB();

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.use(cors());
app.options("*", cors());

const queryRoutes = require("./routes/queryRoutes");
const userRoutes = require("./routes/userRoutes");
const teacherRoutes = require("./routes/teacherRoutes");
const studentRoutes = require("./routes/studentRoutes");
const roomRoutes = require("./routes/roomRoutes");
const sessionRoutes = require("./routes/sessionRoutes");
const router = require("./routes/queryRoutes");
const protect = require("./middleware/authMiddleware");
const { json } = require("express");

if (process.env.NODE_ENV === "DEVELOPMENT") {
  app.use(morgan("dev"));
}

app.use(express.json({ limit: "10mb" }));

app.use(express.urlencoded({ limit: "10mb" }));

app.use("/api/queries", queryRoutes);
app.use("/api/user", userRoutes);
app.use("/api/teachers", teacherRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/rooms", roomRoutes);
app.use("/api/session", sessionRoutes);

app.use("/uploads", express.static("uploads"));

if (process.env.NODE_ENV === "PRODUCTION") {
  app.use(express.static(path.join(__dirname, "../frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "../frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running....");
  });
}

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const users = {};

io.on("connection", async (socket) => {
  // console.log(socket, "socket backend")

  // var clients = io.sockets

  // console.log(clients)

  const id = socket.handshake.query.id;
  socket.join(id);

  // console.log("users", users)

  socket.on("userId", (userId, socketId) => {
    // console.log(userId, "user id from backend");
    socket.emit("user", {
      userId: userId,
      socketId: users[userId],
    });

    // socket.emit("me", socket.handshake.query.id);
  });

  socket.on("disconnect", () => {
    socket.broadcast.emit("callEnded");
  });

  socket.on("callUser", ({ userToCall, signalData, from }) => {
    // console.log({userToCall, from})

    io.to(userToCall).emit("callUser", {
      signal: signalData,
      from: from,
      userId: from,
      otherUserId: userToCall,
    });

    io.to(from).emit("callUser", {
      from: userToCall,
      userId: userToCall,
      otherUserId: from,
    });
  });

  // });

  socket.on("answerCall", (data) => {
    // console.log("backend answer call", data.from);
    io.to(data.to).emit("callAccepted", data.signal);
    io.to(data.from).emit("call-accecpted-teacher");
    io.to(data.to).emit("call-accecpted-teacher");
  });

  socket.on("send-message", ({ recipients, text }) => {
    recipients.forEach((recipient) => {
      const newRecipients = recipients.filter((r) => r !== recipient);
      newRecipients.push(id);
      socket.broadcast.to(recipient).emit("receive-message", {
        recipients: newRecipients,
        sender: id,
        text,
      });
    });
  });
});

server.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
