import useHttp from "./useHttp";
import { useMessenger } from "context/messenger/messengerProvider";
import { CONTACTS, USER } from "constants/routes";
import { STORE_CONTACTS } from "constants/actionsTypes";
import { useState } from "react";

const useContacts = () => {
  const [pending, setPending] = useState(false),
    { _get } = useHttp(),
    [{ contacts }, dispatch] = useMessenger(),
    get = async () => {
      setPending(true);
      await _get(`${USER}${CONTACTS}`)
        .then(({ data }) => dispatch({ type: STORE_CONTACTS, payload: data }))
        .finally(() => setPending(false));
    };
  return {
    get,
    contacts,
    pending,
  };
};

export default useContacts;
