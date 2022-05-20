import axios from "axios";
import { TOKEN_KEY } from "constants";
import { HOME, SIGN_IN } from "constants/routes";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { deleteCookie, getCookie } from "utils/cookie";
import useToast from "./useToast";

const useHttp = () => {
  const navigate = useNavigate(),
    { pathname } = useLocation(),
    { generate } = useToast(),
    _get = async (url, config = {}) => await axios.get(url, config),
    _post = async (url, data = [], config = {}) =>
      await axios.post(url, data, config),
    _put = async (url, data = [], config = {}) =>
      await axios.put(url, data, config),
    _delete = async (url, config = {}) => await axios.delete(url, config);

  useEffect(() => {
    return () => {
      axios.interceptors.request.use(function (config) {
        config.baseURL = process.env.REACT_APP_DEV_API_ENDPOINT;
        const token = getCookie(TOKEN_KEY);
        if (token) config.withCredentials = true;
        return config;
      });

      axios.interceptors.response.use(
        (response) => {
          return response;
        },
        (error) => {
          const { status } = error.response;
          if (status === 401 && pathname !== SIGN_IN) {
            generate("Unauthorized, Please log in again.", "error");
            deleteCookie(TOKEN_KEY);
            navigate(HOME);
            return Promise.reject(error);
          } else if (status >= 500) {
            generate("Server error! Please try again later.", "error");
            return Promise.reject(error);
          }
          return Promise.reject(error);
        }
      );
    };
  }, []);

  return {
    _get,
    _post,
    _put,
    _delete,
  };
};

export default useHttp;
