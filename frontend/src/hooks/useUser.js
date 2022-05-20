import { useState } from "react";
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
import { STORE_USER } from "constants/actionsTypes";
import { TOKEN_KEY } from "constants";

const useUser = () => {
  const [pending, setPending] = useState(false),
    [{ user, isLoggedIn }, dispatch] = useAuth(),
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
    };

  return { login, register, verifyToken, user, isLoggedIn, pending };
};

export default useUser;
