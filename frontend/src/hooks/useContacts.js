import { useState } from "react";
import { useMessenger } from "context/messenger/messengerProvider";
import useHttp from "./useHttp";
import { CONTACTS, CONVERSATION, USER } from "constants/routes";
import useToast from "./useToast";
import {
  STORE_CONTACTS,
  TOGGLE_ADD_CONTACT_DIALOG,
} from "constants/actionsTypes";

const useContacts = () => {
  const [pending, setPending] = useState(false),
    { _get, _post } = useHttp(),
    { generate } = useToast(),
    [{ contacts, addContactDialogIsOpen }, dispatch] = useMessenger();
  return {};
};

export default useContacts;
