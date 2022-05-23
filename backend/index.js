const RoomsRepository = require("./repositories/Rooms/RoomsRepository");

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
  { API, AUTH, USER } = require("./constants/routes");

const _env = process.env;

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

app.use(cors());
app.use(logger("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});
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
    console.log(roomId);
    const repository = RoomsRepository;
    await repository
      .get(roomId)
      .then((room) =>
        socket.emit("room:ready", {
          id: roomId,
          room,
        })
      )
      .catch((error) => console.log(error));
  });
  socket.on("new:message", (message) => {
    socket.emit("chat-message", { message });
  });
  socket.on("disconnect", () => {
    console.log("disconnected");
    socket.emit("user-disconnected");
  });
});

app.listen(_env.PORT || 5000, () => {
  console.log("Backend server is running!");
});
