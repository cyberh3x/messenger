import {
  ADD_TO_CONTACTS,
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
    default:
      return {
        ...state,
      };
  }
};

export default AuthReducer;
