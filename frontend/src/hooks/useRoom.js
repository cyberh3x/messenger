import { STORE_ROOM, UPDATE_CONVERSATIONS } from "constants/actionsTypes";
import { useMessenger } from "context/messenger/messengerProvider";

const useRoom = () => {
  const [{ room }, dispatch] = useMessenger(),
    store = (room = []) => {
      dispatch({ type: STORE_ROOM, payload: room });
    },
    updateConversations = (converastions) =>
      dispatch({ type: UPDATE_CONVERSATIONS, payload: converastions });
  return {
    room,
    store,
    updateConversations,
  };
};

export default useRoom;
