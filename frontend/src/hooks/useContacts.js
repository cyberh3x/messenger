import { useState } from "react";
import { useMessenger } from "context/messenger/messengerProvider";
import useHttp from "./useHttp";
import { CONTACTS, USER } from "constants/routes";
import {
  ADD_TO_CONTACTS,
  STORE_CONTACTS,
  TOGGLE_ADD_CONTACT_DIALOG,
} from "constants/actionsTypes";
import useToast from "./useToast";

const useContacts = () => {
  const [pending, setPending] = useState(false),
    { _get, _post } = useHttp(),
    { generate } = useToast(),
    [{ contacts, addContactDialogIsOpen }, dispatch] = useMessenger(),
    get = async () => {
      setPending(true);
      await _get(`${USER}${CONTACTS}`)
        .then(({ data }) => dispatch({ type: STORE_CONTACTS, payload: data }))
        .finally(() => setPending(false));
    },
    create = async (username) => {
      setPending(true);
      await _post(`${USER}${CONTACTS}`, { username })
        .then(({ data: { contact, message } }) => {
          dispatch({ type: ADD_TO_CONTACTS, payload: contact });
          generate(message);
        })
        .finally(() => setPending(false));
    },
    handleToggleAddDialog = () => dispatch({ type: TOGGLE_ADD_CONTACT_DIALOG });
  return {
    get,
    create,
    contacts,
    addContactDialogIsOpen,
    pending,
    handleToggleAddDialog,
  };
};

export default useContacts;
