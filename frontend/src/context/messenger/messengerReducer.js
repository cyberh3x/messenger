import { CHANGE_TAB, STORE_CONTACTS } from "constants/actionsTypes";

const MessengerProvider = (state, { type, payload }) => {
  switch (type) {
    case CHANGE_TAB:
      return {
        ...state,
        tab: payload,
      };
    case STORE_CONTACTS:
      return {
        ...state,
        contacts: payload,
      };
    default:
      return {
        ...state,
      };
  }
};

export default MessengerProvider;
