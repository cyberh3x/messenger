import { CHANGE_TAB } from "constants/actionsTypes";

const MessengerProvider = (state, { type, payload }) => {
  switch (type) {
    case CHANGE_TAB:
      return {
        ...state,
        tab: payload,
      };
    default:
      return {
        ...state,
      };
  }
};

export default MessengerProvider;
