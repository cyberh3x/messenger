import axios from "axios";
import { TOKEN_KEY } from "constants";
import { getCookie } from "utils/cookie";

axios.interceptors.request.use(function (config) {
  config.baseURL = process.env.REACT_APP_DEV_API_ENDPOINT;
  const token = getCookie(TOKEN_KEY);
  if (token) config.withCredentials = true;
  return config;
});

const useHttp = () => {
  const _get = async (url, config = {}) => await axios.get(url, config),
    _post = async (url, data = [], config = {}) =>
      await axios.post(url, data, config),
    _put = async (url, data = [], config = {}) =>
      await axios.put(url, data, config),
    _delete = async (url, config = {}) => await axios.delete(url, config);
  return {
    _get,
    _post,
    _put,
    _delete,
  };
};

export default useHttp;
