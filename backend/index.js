if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express"),
  app = express(),
  mongoose = require("mongoose"),
  authRoutes = require("./routes/auth"),
  userRoutes = require("./routes/user"),
  createError = require("http-errors"),
  path = require("path"),
  cookieParser = require("cookie-parser"),
  logger = require("morgan"),
  cors = require("cors"),
  { createServer } = require("http"),
  { Server } = require("socket.io"),
  { API, AUTH, USER } = require("./constants/routes"),
  RoomsRepository = require("./repositories/Rooms/RoomsRepository"),
  ConversationsRepository = require("./repositories/Conversations/ConversationsRepository"),
  _env = process.env;

mongoose
  .connect(_env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB Connection successfully!"))
  .catch((error) => console.log(error));

var corsOptions = {
  origin: _env.CLIENT_URL,
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(
  cors({ credentials: true, origin: _env.CLIENT_URL }),
  function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", _env.CLIENT_URL);
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.setHeader("Access-Control-Allow-Credentials", true);
    next();
  }
);
app.use(logger("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(`${API}${AUTH}`, authRoutes);
app.use(`${API}${USER}`, userRoutes);
app.use((req, res, next) => {
  next(createError(404));
});
app.use((err, req, res) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status(err.status || 500);
  res.render("error");
});

// Socket.io
const httpServer = createServer();
httpServer.listen(_env.SOCKET_IO_PORT);
const io = new Server(httpServer, {
  cors: {
    origin: _env.CLIENT_URL,
  },
});

io.on("connection", (socket) => {
  console.log("connected");
  socket.on("get:room", async (roomId) => {
    const repository = RoomsRepository;
    await repository
      .get(roomId)
      .then((room) => {
        socket.emit("room:ready", {
          message: "Room is ready for conversation.",
          room,
          status: 200,
        });
      })
      .catch((error) =>
        socket.emit("room:notReady", {
          message: "Room is not ready for conversation.",
          status: 422,
          error,
        })
      );
  });
  socket.on("new:message", async ({ room, message, user }) => {
    const repository = ConversationsRepository;
    await repository
      .create(room, message, user)
      .then((room) => {
        socket.broadcast.emit("message:saved", { room });
        socket.emit("message:sent", { room });
      })
      .catch((error) => socket.emit("message:failed", { error }));
  });

  socket.on("typing:start", () => socket.broadcast.emit("typing:start"));
  socket.on("typing:stop", () => socket.broadcast.emit("typing:stop"));

  socket.on("disconnect", () => {
    console.log("disconnected");
    socket.emit("user-disconnected");
  });
});

app.listen(_env.PORT || 5000, () => {
  console.log("Backend server is running!");
});
