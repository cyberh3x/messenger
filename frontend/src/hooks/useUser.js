import { useState } from "react";
import { useAuth } from "context/auth/authProvider";
import { useNavigate } from "react-router-dom";
import useHttp from "./useHttp";
import useToast from "./useToast";
import { deleteCookie, setCookie } from "utils/cookie";
import {
  AUTH,
  CONTACTS,
  CONVERSATION,
  HOME,
  IDENTITY,
  LOGIN,
  LOGOUT,
  REGISTER,
  SIGN_IN,
  USER,
} from "constants/routes";
import {
  ADD_TO_CONTACTS,
  STORE_CONTACTS,
  STORE_USER,
  TOGGLE_ADD_CONTACT_DIALOG,
} from "constants/actionsTypes";
import { TOKEN_KEY } from "constants";

const useUser = () => {
  const [pending, setPending] = useState(false),
    [{ user, isLoggedIn, addContactDialogIsOpen }, dispatch] = useAuth(),
    { _get, _put, _post } = useHttp(),
    navigate = useNavigate(),
    { generate } = useToast(),
    login = async (credentials) => {
      if (credentials) {
        setPending(true);
        await _post(`${AUTH}${LOGIN}`, credentials)
          .then(({ data: { user } }) => {
            setCookie(TOKEN_KEY, user.accessToken);
            delete user.accessToken;
            store(user);
            navigate(HOME);
          })
          .finally(() => setPending(false));
      }
    },
    register = async (credentials) => {
      if (credentials) {
        setPending(true);
        await _post(`${AUTH}${REGISTER}`, credentials)
          .then(({ data: { message } }) => {
            generate(message);
            navigate(SIGN_IN);
          })
          .finally(() => setPending(false));
      }
    },
    verifyToken = async () => {
      await _get(`${AUTH}${IDENTITY}`)
        .then(({ data }) => store(data))
        .catch(logout);
    },
    logout = async () => {
      deleteCookie(TOKEN_KEY);
      _put(`${AUTH}${LOGOUT}`).finally(() => navigate(SIGN_IN));
    },
    store = (payload) => {
      dispatch({ type: STORE_USER, payload });
    },
    addContact = async (username) => {
      setPending(true);
      await _post(`${USER}${CONTACTS}`, { username })
        .then(({ data: { contact, message } }) => {
          dispatch({ type: ADD_TO_CONTACTS, payload: contact });
          generate(message);
        })
        .finally(() => setPending(false));
    },
    getContacts = async () => {
      setPending(true);
      await _get(`${USER}${CONTACTS}`)
        .then(({ data }) => {
          data = data.map((contact) => ({
            ...contact,
            href: CONVERSATION.replace(":id", contact._id),
          }));
          dispatch({ type: STORE_CONTACTS, payload: data });
        })
        .finally(() => setPending(false));
    },
    handleToggleAddDialog = () => dispatch({ type: TOGGLE_ADD_CONTACT_DIALOG });

  return {
    login,
    register,
    verifyToken,
    addContact,
    getContacts,
    handleToggleAddDialog,
    user,
    isLoggedIn,
    pending,
    addContactDialogIsOpen,
  };
};

export default useUser;
