import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";
import AppLayout from "pages/layouts/app";
import Body from "./body";
import Header from "./header";

const Conversation = () => {
  const { id } = useParams(),
    [socket, setSocket] = useState(null);
  useEffect(() => {
    const socket = io(process.env.REACT_APP_SOCKET_IO_SERVER_ENDPOINT);
    setSocket(socket);
    return () => socket.close();
  }, [setSocket]);

  return (
    <AppLayout>
      <Header />
      <Body />
    </AppLayout>
  );
};

export default Conversation;
