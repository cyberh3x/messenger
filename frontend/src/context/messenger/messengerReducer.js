import {
  ADD_TO_CONTACTS,
  CHANGE_TAB,
  STORE_CONTACTS,
  TOGGLE_ADD_CONTACT_DIALOG,
} from "constants/actionsTypes";
import { CONVERSATION } from "constants/routes";

const MessengerProvider = (state, { type, payload }) => {
  switch (type) {
    case CHANGE_TAB:
      return {
        ...state,
        tab: payload,
      };
    case STORE_CONTACTS:
      payload = payload.map((contact) => ({
        ...contact,
        href: CONVERSATION.replace(":id", contact._id),
      }));
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
    default:
      return {
        ...state,
      };
  }
};

export default MessengerProvider;
