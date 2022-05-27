import { useParams } from "react-router-dom";
import AppLayout from "pages/layouts/app";
import Body from "./body";
import Header from "./header";
import { useEffect } from "react";
import useSocket from "hooks/useSocket";

const Conversation = () => {
  const { id } = useParams(),
    { socket, storeRoom } = useSocket(),
    getMessages = () => socket.emit("get:room", id),
    onGetMessageList = () =>
      socket.on("room:ready", ({ room }) => storeRoom(room));

  useEffect(() => {
    if (socket) {
      getMessages();
      onGetMessageList();
    }
  }, [socket]);

  return (
    <AppLayout>
      {socket ? (
        <>
          <Header />
          <Body />
        </>
      ) : (
        <h1>Loading...</h1>
      )}
    </AppLayout>
  );
};

export default Conversation;
