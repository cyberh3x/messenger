import {
  STORE_ROOM,
  STORE_SOCKET,
  UPDATE_CONVERSATIONS,
} from "constants/actionsTypes";
import { useMessenger } from "context/messenger/messengerProvider";

const useSocket = () => {
  const [{ room, socket }, dispatch] = useMessenger(),
    storeSocket = (socketIo) =>
      dispatch({ type: STORE_SOCKET, payload: socketIo }),
    storeRoom = (room = []) => {
      dispatch({ type: STORE_ROOM, payload: room });
    },
    updateConversations = (converastions) =>
      dispatch({ type: UPDATE_CONVERSATIONS, payload: converastions });
  return {
    room,
    socket,
    storeSocket,
    storeRoom,
    updateConversations,
  };
};

export default useSocket;
