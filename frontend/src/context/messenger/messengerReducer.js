import {
  CHANGE_TAB,
  STORE_ROOM,
  STORE_SOCKET,
  UPDATE_CONVERSATIONS,
} from "constants/actionsTypes";

const MessengerProvider = (state, { type, payload }) => {
  switch (type) {
    case CHANGE_TAB:
      return {
        ...state,
        tab: payload,
      };
    case STORE_ROOM:
      return {
        ...state,
        room: payload,
      };
    case UPDATE_CONVERSATIONS:
      console.log(payload);
      return {
        ...state,
        room: {
          ...state.room,
          conversations: payload,
        },
      };
    case STORE_SOCKET:
      return {
        ...state,
        socket: payload,
      };
    default:
      return {
        ...state,
      };
  }
};

export default MessengerProvider;
