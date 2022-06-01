import { useState } from "react";
import { useMessenger } from "context/messenger/messengerProvider";
import useHttp from "./useHttp";
import useToast from "./useToast";
import {
  ADD_TO_CONTACTS,
  REMOVE_CONTACT,
  STORE_CONTACTS,
  STORE_ROOM,
  STORE_SOCKET,
  TOGGLE_ADD_CONTACT_DIALOG,
  TOGGLE_REMOVE_CONTACT_DIALOG,
  UPDATE_CONTACT_STATUS,
  UPDATE_CONVERSATIONS,
} from "constants/actionsTypes";
import { CONTACTS, CONVERSATION, USER } from "constants/routes";

const useSocket = () => {
  const [pending, setPending] = useState(false),
    [
      {
        room,
        socket,
        contact,
        contacts,
        addContactDialogIsOpen,
        removeContactDialogIsOpen,
        selectedContactForRemove,
      },
      dispatch,
    ] = useMessenger(),
    { _post, _get, _delete } = useHttp(),
    { generate } = useToast(),
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
          contact.menu = () => generateContactMenu(contact._id);
          dispatch({ type: ADD_TO_CONTACTS, payload: contact });
          generate(message);
          socket.emit("contact:added");
        })
        .catch((error) =>
          handleError("Failed to add contact, Try again later.", error)
        )
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
            menu: () => generateContactMenu(contact._id),
          }));
          dispatch({ type: STORE_CONTACTS, payload: data });
        })
        .catch((error) =>
          handleError("Failed to load contacts, Try again later.", error)
        )
        .finally(() => setPending(false));
    },
    generateContactMenu = (contactId) => [
      {
        id: 1,
        label: "Delete contact",
        props: {
          onClick: () => handleToggleRemoveContactDialog(contactId),
        },
      },
    ],
    removeContact = async () => {
      setPending(true);
      await _delete(`${USER}${CONTACTS}`, { id: selectedContactForRemove })
        .then(({ data: { message } }) => {
          generate(message);
          removeContactFromStore(selectedContactForRemove);
          handleToggleRemoveContactDialog();
          socket.emit("contact:removed");
        })
        .catch((error) =>
          handleError("Failed to rmeove contact, Try again later!", error)
        )
        .finally(() => setPending(false));
    },
    removeContactFromStore = (contactId) =>
      dispatch({ type: REMOVE_CONTACT, payload: contactId }),
    handleError = (
      message,
      {
        response: {
          data: { message: serverMessage },
          status,
        },
      }
    ) => {
      console.error({ message: serverMessage, status });
      generate(serverMessage ? serverMessage : message, "error");
    },
    handleToggleAddContactDialog = () =>
      dispatch({ type: TOGGLE_ADD_CONTACT_DIALOG }),
    handleToggleRemoveContactDialog = (contactId) =>
      dispatch({ type: TOGGLE_REMOVE_CONTACT_DIALOG, payload: contactId });

  return {
    room,
    socket,
    contact,
    contacts,
    pending,
    addContactDialogIsOpen,
    removeContactDialogIsOpen,
    selectedContactForRemove,
    storeRoom,
    updateConversations,
    updateContactStatus,
    addContact,
    removeContact,
    getContacts,
    handleToggleAddContactDialog,
    handleToggleRemoveContactDialog,
    removeContactFromStore,
  };
};

export default useSocket;
