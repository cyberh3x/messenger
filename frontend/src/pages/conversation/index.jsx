import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";
import AppLayout from "pages/layouts/app";
import Body from "./body";
import Header from "./header";
import useUser from "hooks/useUser";
import useRoom from "hooks/useConversations";

const Conversation = () => {
  const { id } = useParams(),
    {
      user: { _id },
    } = useUser(),
    { storeRoom, storeSocket, closeSocket, socket } = useRoom(),
    getMessages = () =>
      socket.emit("get:room", { userId: _id, audienceId: id }),
    onGetMessageList = () =>
      socket.on("room:ready", ({ room }) => storeRoom(room));

  useEffect(() => {
    const socketIo = io(process.env.REACT_APP_SOCKET_IO_SERVER_ENDPOINT);
    storeSocket(socketIo);
    return closeSocket;
  }, []);

  useEffect(() => {
    if (socket) {
      onGetMessageList();
    }
  }, [socket]);

  return (
    <AppLayout>
      <Header />
      <Body />
    </AppLayout>
  );
};

export default Conversation;
