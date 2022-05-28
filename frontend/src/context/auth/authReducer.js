import {
  ADD_TO_CONTACTS,
  CHANGE_CONTACT_STATUS,
  LOGOUT,
  STORE_CONTACTS,
  STORE_USER,
  TOGGLE_ADD_CONTACT_DIALOG,
} from "constants/actionsTypes";

const AuthReducer = (state, { type, payload }) => {
  switch (type) {
    case STORE_USER:
      return {
        ...state,
        user: payload,
        isLoggedIn: true,
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
    case LOGOUT:
      return {
        user: {},
        isLoggedIn: false,
        addContactDialogIsOpen: false,
        contacts: [],
      };
    case CHANGE_CONTACT_STATUS:
      const contacts = state.contacts;
      if (contacts.length) {
        const contactIndex = contacts.findIndex(({ _id }) => {
          return _id == payload._id;
        });
        if (contactIndex in contacts)
          contacts[contactIndex].status = payload.status;
      }
      return {
        ...state,
      };
    default:
      return {
        ...state,
      };
  }
};

export default AuthReducer;
