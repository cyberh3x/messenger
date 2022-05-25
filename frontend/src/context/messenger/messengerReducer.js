import {
  ADD_TO_CONTACTS,
  CHANGE_TAB,
  STORE_CONTACTS,
  STORE_ROOM,
  TOGGLE_ADD_CONTACT_DIALOG,
  UPDATE_CONVERSATIONS,
} from "constants/actionsTypes";

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
    case ADD_TO_CONTACTS:
      return {
        ...state,
        contacts: [...state.contacts, payload],
      };
    case TOGGLE_ADD_CONTACT_DIALOG:
      return {
        ...state,
        addContactDialogIsOpen: !state.addContactDialogIsOpen,
      };
    case STORE_ROOM:
      return {
        ...state,
        room: payload,
      };
    case UPDATE_CONVERSATIONS:
      return {
        ...state,
        room: {
          ...state.room,
          conversations: payload,
        },
      };
    default:
      return {
        ...state,
      };
  }
};

export default MessengerProvider;
