const express = require("express");
const logger = require("./middlewares/logger.js");
const { errorHandler, notFound } = require("./middlewares/errors.js");
const dotenv = require("dotenv");
dotenv.config();
const connectToDB = require("./config/db.js");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const cors = require("cors");

// routes Path
const userRoutes = require("./routers/user-routes.js");
const authRoutes = require("./routers/authentication-routes.js");
const postsRoutes = require("./routers/post-routes.js");
const chatRoute = require("./routers/chat-routes");
const messageRoute = require("./routers/messageRoute");

// connection to DB
connectToDB();

// Init App
const app = express();

// Apply middlewares
app.use(express.json());
app.use(cors());
app.use(logger); // To see the URL, req methode/protocol in console
app.use(bodyParser.json());

// helmet
app.use(helmet());

// route
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/posts", postsRoutes);
app.use("/api/chat", chatRoute);
app.use("/api/message", messageRoute);

// // Error handler middlewares
app.use(notFound);
app.use(errorHandler);

// create server
const PORT = process.env.PORT || 8000;
const server = app.listen(PORT, () =>
  console.log(
    `server is running in ${process.env.NODE_ENV} mode on port ${PORT}`
  )
);

const io = require("socket.io")(server, {
  pingTimeOut: 60000,
  cors: {
    origin: "http://localhost:3000",
  },
});

io.on("connection", (socket) => {
  console.log("Connected to the socket.io");

  socket.on("setup", (userData) => {
    socket.join(userData._id);
    socket.emit("connected");
  });

  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("User Joined Room : " + room);
  });

  socket.on("new message", (newMessageRecieved) => {
    let chat = newMessageRecieved.chat;

    if (!chat.users) return console.log("chat.users not defined");

    chat.users.forEach((user) => {
      if (user._id == newMessageRecieved.sender._id) return;

      socket.in(user._id).emit("message recieved", newMessageRecieved);
    });
  });
});
