const { createServer } = require("http"),
  { Server } = require("socket.io"),
  RoomsRepository = require("./repositories/Rooms/RoomsRepository"),
  ConversationsRepository = require("./repositories/Conversations/ConversationsRepository"),
  { _ENV } = require("./constants");

const httpServer = createServer();
httpServer.listen(_ENV.SOCKET_IO_PORT);
const io = new Server(httpServer, {
  cors: {
    origin: _ENV.CLIENT_URL,
  },
});

io.on("connection", (socket) => {
  console.log("Socket.io connected");
  socket.on("get:room", async ({ roomId, contactId }) => {
    const repository = RoomsRepository;
    await repository
      .get(roomId, contactId)
      .then(({ room, contact }) => {
        socket.emit("room:ready", {
          message: "Room is ready for conversation.",
          room,
          contact,
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

  socket.on("user:online", ({ user }) => {
    socket.broadcast.emit("user:online", { user });
  });

  socket.on("user:offline", ({ user }) => {
    socket.broadcast.emit("user:offline", { user });
  });

  socket.on("contact:removed", () => socket.broadcast.emit("contacts:update"));
  socket.on("contact:added", () => socket.broadcast.emit("contacts:update"));

  socket.on("disconnect", () => {
    console.log("Socket.io disconnected");
    socket.emit("user-disconnected");
  });
});

module.exports = {
  io,
};
