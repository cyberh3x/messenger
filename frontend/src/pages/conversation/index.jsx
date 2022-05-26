import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";
import AppLayout from "pages/layouts/app";
import Body from "./body";
import Header from "./header";
import useRoom from "hooks/useConversations";

const Conversation = () => {
  const { id } = useParams(),
    [socket, setSocket] = useState(null),
    { storeRoom } = useRoom(),
    getMessages = () => socket.emit("get:room", id),
    onGetMessageList = () =>
      socket.on("room:ready", ({ room }) => storeRoom(room));

  useEffect(() => {
    const socketIo = io(process.env.REACT_APP_SOCKET_IO_SERVER_ENDPOINT);
    setSocket(socketIo);
    return () => socketIo.close();
  }, []);

  useEffect(() => {
    if (socket) {
      getMessages();
      onGetMessageList();
    }
  }, [socket]);

  return (
    <AppLayout>
      <Header socket={socket} />
      <Body socket={socket} />
    </AppLayout>
  );
};

export default Conversation;
