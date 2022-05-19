import { useAuth } from "context/auth/authProvider";
import useHttp from "./useHttp";
import { useNavigate } from "react-router-dom";
import { setCookie } from "utils/cookie";
import { AUTH, HOME, IDENTITY, LOGIN, LOGOUT, SIGN_IN } from "constants/routes";
import { STORE_USER } from "constants/actionsTypes";
import { TOKEN_KEY } from "constants";
import { useState } from "react";

const useUser = () => {
  const [pending, setPending] = useState(false),
    [{ user, isLoggedIn }, dispatch] = useAuth(),
    { _get, _put, _post } = useHttp(),
    navigate = useNavigate(),
    login = async (credentials) => {
      if (credentials) {
        setPending(true);
        await _post(`${AUTH}${LOGIN}`, credentials).then(({ data }) => {
          setCookie(TOKEN_KEY, data.accessToken);
          delete data.accessToken;
          store(data);
          navigate(HOME);
        });
        setPending(false);
      }
    },
    verifyToken = async () => {
      console.count();
      await _get(`${AUTH}${IDENTITY}`)
        .then(({ data }) => store(data))
        .catch(logout);
    },
    logout = async () =>
      _put(`${AUTH}${LOGOUT}`).finally(() => navigate(SIGN_IN)),
    store = (payload) => {
      dispatch({ type: STORE_USER, payload });
    };

  return { login, verifyToken, user, isLoggedIn, pending };
};

export default useUser;
