const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cors = require("cors");
const connectDB = require("./connectDB");
const notFound = require("./middleware/errorMiddleware");
const errorHandler = require("./middleware/errorMiddleware");
const app = express();
const server = require("http").Server(app);
// const io = require("socket.io")(server)
const { v4: uuidv4 } = require("uuid");

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
const router = require("./routes/queryRoutes");
const protect = require("./middleware/authMiddleware");
const { json } = require("express");

if (process.env.NODE_ENV === "DEVELOPMENT") {
  app.use(morgan("dev"));
}

app.use(express.json());

app.use("/api/queries", queryRoutes);
app.use("/api/user", userRoutes);
app.use("/api/teachers", teacherRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/rooms", roomRoutes);

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

const users = {
  //[key: userID]: {socketID: string}
};

io.on("connection", async (socket) => {
  // console.log(socket, "socket backend")
  socket.on("logged", ({userId, socketId}) => {
    // console.log("connection", socketId, userId);
    users[userId] =  socketId ;
  });

  // console.log("users", users)
  
  socket.on("userId", (userId, socketId) => {
    // console.log(userId, "user id from backend");
    socket.emit("user", {
      userId: userId,
      socketId: users[userId],
      // sockets: JSON.stringify(socket),
    });
    // socket.emit("me", socket.handshake.query.id);
  });


  // console.log(users,"users")



  // socket.on("me", () => {
  //   socket.broadcast.emit("me", userId);
  // });

  // const sockets = Array.from(io.sockets.sockets).map((socket) => socket[0]);

  // console.log(sockets);

  socket.on("disconnect", () => {
    socket.broadcast.emit("callEnded");
  });
  // console.log("socket io bakend trigger")
  // console.log(io.eio.clients)

  socket.on("callUser", ({ userToCall, signalData, from }) => {
    // console.log("backend user to call", userToCall);
    // console.log("backend from ", from)

    // console.log("call user", users[from])
    
    // console.log("backend data", { userToCall, signalData, from });
    io.to(users[userToCall]).emit("callUser", {    
      signal: signalData,
      from: users[from],
      userId: from
    });
  });

  socket.on("answerCall", (data) => {
    console.log("backend answer call", data);
    io.to(data.to).emit("callAccepted",  data.signal);
  });
});

server.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
