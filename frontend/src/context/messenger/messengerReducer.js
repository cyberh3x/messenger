import {
  ADD_TO_CONTACTS,
  CHANGE_TAB,
  STORE_CONTACTS,
  STORE_ROOM,
  STORE_SOCKET,
  TOGGLE_ADD_CONTACT_DIALOG,
  UPDATE_CONTACT_STATUS,
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
        room: payload.room,
        contact: payload.contact,
      };
    case UPDATE_CONVERSATIONS:
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
    case UPDATE_CONTACT_STATUS:
      const contact = state.contact,
        contacts = state.contacts;
      if (contact) contact.status = payload.status;
      if (contacts.length) {
        const contactIndex = contacts.findIndex(
          (user) => user._id == payload._id
        );
        if (contactIndex in contacts)
          contacts[contactIndex].status = payload.status;
      }
      return {
        ...state,
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
    default:
      return {
        ...state,
      };
  }
};

export default MessengerProvider;
