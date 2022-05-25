import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";
import AppLayout from "pages/layouts/app";
import Body from "./body";
import Header from "./header";
import useUser from "hooks/useUser";
import useRoom from "hooks/useRoom";

const Conversation = () => {
  const { id } = useParams(),
    [socket, setSocket] = useState(),
    {
      user: { _id },
    } = useUser(),
    { store } = useRoom(),
    getMessages = () =>
      socket.emit("get:room", { userId: _id, audienceId: id }),
    onGetMessageList = () => socket.on("room:ready", ({ room }) => store(room));

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
      <Header />
      <Body socket={socket} userId={_id} audienceId={id} />
    </AppLayout>
  );
};

export default Conversation;
