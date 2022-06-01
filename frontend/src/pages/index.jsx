import { useEffect, useState } from "react";
import { Route, Routes } from "react-router";
import { createTheme } from "@mui/material";
import { io } from "socket.io-client";
import useSocket from "hooks/useSocket";
import useToast from "hooks/useToast";
import ThemeProvider from "@mui/system/ThemeProvider";
import AuthRoute from "utils/authRoute";
import Home from "./home";
import GuestRoute from "utils/guestRoute";
import SignIn from "./auth/signIn";
import SignUp from "./auth/signUp";
import Conversation from "./conversation";
import Contacts from "./contacts";
import {
  CONTACTS,
  CONVERSATION,
  HOME,
  SIGN_IN,
  SIGN_UP,
} from "constants/routes";
import { theme } from "constants/theme";

const AppRoot = () => {
  const muiTheme = createTheme(theme),
    [socket, setSocket] = useState({}),
    { updateConversations, updateContactStatus, getContacts } = useSocket(),
    { generate } = useToast();

  useEffect(() => {
    const socketIo = io(process.env.REACT_APP_SOCKET_IO_SERVER_ENDPOINT);
    setSocket(socketIo);
    return () => {
      setSocket({});
      socketIo.close();
    };
  }, [setSocket]);

  useEffect(() => {
    if (socket && socket.connected) {
      socket.on("message:saved", ({ room }) => {
        updateConversations(room.conversations);
      });

      socket.on("message:sent", ({ room }) => {
        updateConversations(room.conversations);
      });

      socket.on("user:online", ({ user }) => updateContactStatus(user));

      socket.on("user:offline", ({ user }) => updateContactStatus(user));

      socket.on("contacts:update", getContacts);

      socket.on("message:failed", ({ error }) => {
        console.error(error);
        generate("Failed to send message");
      });
    }
  }, [socket]);

  return (
    <ThemeProvider theme={muiTheme}>
      <Routes>
        <Route
          index
          path={HOME}
          element={
            <AuthRoute>
              <Home />
            </AuthRoute>
          }
        />
        <Route
          path={SIGN_IN}
          element={
            <GuestRoute>
              <SignIn />
            </GuestRoute>
          }
        />
        <Route
          path={SIGN_UP}
          element={
            <GuestRoute>
              <SignUp />
            </GuestRoute>
          }
        />
        <Route
          path={CONTACTS}
          element={
            <AuthRoute>
              <Contacts />
            </AuthRoute>
          }
        />
        <Route
          path={CONVERSATION}
          element={
            <AuthRoute>
              <Conversation />
            </AuthRoute>
          }
        />
        <Route path="*" element={<h1>Not found</h1>} />
      </Routes>
    </ThemeProvider>
  );
};

export default AppRoot;
