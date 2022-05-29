import { useState } from "react";
import { useMessenger } from "context/messenger/messengerProvider";
import useHttp from "./useHttp";
import useToast from "./useToast";
import {
  ADD_TO_CONTACTS,
  STORE_CONTACTS,
  STORE_ROOM,
  STORE_SOCKET,
  TOGGLE_ADD_CONTACT_DIALOG,
  UPDATE_CONTACT_STATUS,
  UPDATE_CONVERSATIONS,
} from "constants/actionsTypes";
import { CONTACTS, CONVERSATION, USER } from "constants/routes";

const useSocket = () => {
  const [pending, setPending] = useState(false),
    [{ room, socket, contact, contacts, addContactDialogIsOpen }, dispatch] =
      useMessenger(),
    { _post, _get } = useHttp(),
    { generate } = useToast(),
    storeSocket = (socketIo) =>
      dispatch({ type: STORE_SOCKET, payload: socketIo }),
    storeRoom = (room = [], contact = {}) => {
      dispatch({ type: STORE_ROOM, payload: { room, contact } });
    },
    updateConversations = (converastions) =>
      dispatch({ type: UPDATE_CONVERSATIONS, payload: converastions }),
    updateContactStatus = (user) =>
      dispatch({ type: UPDATE_CONTACT_STATUS, payload: user }),
    addContact = async (username) => {
      setPending(true);
      await _post(`${USER}${CONTACTS}`, { username })
        .then(({ data: { contact, message, roomId }, status }) => {
          if (status === 201) {
            generate(message, "warning");
            return false;
          }
          contact.roomId = roomId;
          contact.href = {
            url: CONVERSATION.replace(":id", contact.roomId),
            state: contact._id,
          };
          dispatch({ type: ADD_TO_CONTACTS, payload: contact });
          generate(message);
        })
        .finally(() => setPending(false));
    },
    getContacts = async () => {
      setPending(true);
      await _get(`${USER}${CONTACTS}`)
        .then(({ data }) => {
          data = data.map((contact) => ({
            ...contact,
            href: {
              url: CONVERSATION.replace(":id", contact.roomId),
              state: contact._id,
            },
          }));
          dispatch({ type: STORE_CONTACTS, payload: data });
        })
        .finally(() => setPending(false));
    },
    handleToggleAddDialog = () => dispatch({ type: TOGGLE_ADD_CONTACT_DIALOG });
  return {
    room,
    socket,
    contact,
    contacts,
    pending,
    addContactDialogIsOpen,
    storeSocket,
    storeRoom,
    updateConversations,
    updateContactStatus,
    addContact,
    getContacts,
    handleToggleAddDialog,
  };
};

export default useSocket;
