import { STORE_ROOM, UPDATE_CONVERSATIONS } from "constants/actionsTypes";
import { useMessenger } from "context/messenger/messengerProvider";

const useConversations = () => {
  const [{ room }, dispatch] = useMessenger(),
    storeRoom = (room = []) => {
      dispatch({ type: STORE_ROOM, payload: room });
    },
    updateConversations = (converastions) =>
      dispatch({ type: UPDATE_CONVERSATIONS, payload: converastions });
  return {
    room,
    storeRoom,
    updateConversations,
  };
};

export default useConversations;
