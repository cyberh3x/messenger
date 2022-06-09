import { useEffect } from "react";
import axios from "axios";
import { deleteCookie, getCookie } from "utils/cookie";
import { SIGN_IN } from "constants/routes";
import { TOKEN_KEY } from "constants";

axios.interceptors.request.use((config) => {
  config.baseURL = process.env.REACT_APP_API_ENDPOINT;
  const token = getCookie(TOKEN_KEY);
  if (token) config.withCredentials = true;
  return config;
});

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const {
      status,
      data: { message },
    } = error.response;
    if (status === 401 && window.location.pathname !== SIGN_IN) {
      deleteCookie(TOKEN_KEY);
      alert(message ?? "Your session has expired. Please sign in again.");
      window.location.replace(SIGN_IN);
      return Promise.reject(error);
    } else if (status >= 500) {
      alert("Server error! Please try again later.");
      return Promise.reject(error);
    }
    return Promise.reject(error);
  }
);

const useHttp = () => {
  const _get = async (url, config = {}) => await axios.get(url, config),
    _post = async (url, data = [], config = {}) =>
      await axios.post(url, data, config),
    _put = async (url, data = [], config = {}) =>
      await axios.put(url, data, config),
    _delete = async (url, data, config = {}) =>
      await axios.delete(url, { ...config, data });

  return {
    _get,
    _post,
    _put,
    _delete,
  };
};

export default useHttp;
