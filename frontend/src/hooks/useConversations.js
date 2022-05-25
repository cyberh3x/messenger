import {
  STORE_ROOM,
  STORE_SOCKET,
  UPDATE_CONVERSATIONS,
} from "constants/actionsTypes";
import { useMessenger } from "context/messenger/messengerProvider";

const useConversations = () => {
  const [{ room, socket }, dispatch] = useMessenger(),
    storeSocket = (socket) => dispatch({ type: STORE_SOCKET, payload: socket }),
    closeSocket = () => socket.close(),
    storeRoom = (room = []) => {
      dispatch({ type: STORE_ROOM, payload: room });
    },
    updateConversations = (converastions) =>
      dispatch({ type: UPDATE_CONVERSATIONS, payload: converastions });
  return {
    room,
    storeRoom,
    updateConversations,
    storeSocket,
    closeSocket,
    socket,
  };
};

export default useConversations;
