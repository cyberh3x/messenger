import cookie from "js-cookie";

const getCookie = (key) => {
  const readCookie = cookie.get(key);
  if (readCookie) return readCookie;
  return false;
};

const setCookie = (key, value, expires = null) => {
  cookie.set(key, value, { expires: expires });
};

const deleteCookie = (key) => {
  cookie.remove(key);
};

export { getCookie, setCookie, deleteCookie };
