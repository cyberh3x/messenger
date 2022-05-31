import { useState } from "react";
import useSocket from "./useSocket";
import { useAuth } from "context/auth/authProvider";
import { useNavigate } from "react-router-dom";
import useHttp from "./useHttp";
import useToast from "./useToast";
import { deleteCookie, setCookie } from "utils/cookie";
import {
  AUTH,
  HOME,
  IDENTITY,
  LOGIN,
  LOGOUT,
  REGISTER,
  SIGN_IN,
} from "constants/routes";
import { STORE_USER, LOGOUT as LOGOUT_ACTION } from "constants/actionsTypes";
import { TOKEN_KEY } from "constants";

const useUser = () => {
  const [pending, setPending] = useState(false),
    [{ user, isLoggedIn, contacts, addContactDialogIsOpen }, dispatch] =
      useAuth(),
    { _get, _put, _post } = useHttp(),
    { socket } = useSocket(),
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
            socket.emit("user:online", { user });
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
      await _put(`${AUTH}${LOGOUT}`).finally(() => {
        deleteCookie(TOKEN_KEY);
        user.status = 0;
        socket.emit("user:offline", { user });
        dispatch({ type: LOGOUT_ACTION });
        navigate(SIGN_IN);
      });
    },
    store = (payload) => {
      dispatch({ type: STORE_USER, payload });
    };

  return {
    login,
    register,
    verifyToken,
    logout,
    user,
    isLoggedIn,
    pending,
    contacts,
    addContactDialogIsOpen,
  };
};

export default useUser;
