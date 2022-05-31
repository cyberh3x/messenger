import { LOGOUT, STORE_USER } from "constants/actionsTypes";

const AuthReducer = (state, { type, payload }) => {
  switch (type) {
    case STORE_USER:
      return {
        ...state,
        user: payload,
        isLoggedIn: true,
      };
    case LOGOUT:
      return {
        user: {},
        isLoggedIn: false,
        addContactDialogIsOpen: false,
        contacts: [],
      };
    default:
      return {
        ...state,
      };
  }
};

export default AuthReducer;
