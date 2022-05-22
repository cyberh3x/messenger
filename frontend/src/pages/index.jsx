import { Route, Routes } from "react-router";
import { createTheme } from "@mui/material";
import ThemeProvider from "@mui/system/ThemeProvider";
import AuthRoute from "utils/authRoute";
import Home from "./home";
import { theme } from "constants/theme";
import { CONVERSATION, HOME, SIGN_IN, SIGN_UP } from "constants/routes";
import GuestRoute from "utils/guestRoute";
import SignIn from "./auth/signIn";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SignUp from "./auth/signUp";
import Conversation from "./conversation";

const AppRoot = () => {
  const muiTheme = createTheme(theme);
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
          path={CONVERSATION}
          element={
            <AuthRoute>
              <Conversation />
            </AuthRoute>
          }
        />
        <Route path="*" element={<h1>Not found</h1>} />
      </Routes>
      <ToastContainer position="bottom-right" theme="dark" />
    </ThemeProvider>
  );
};

export default AppRoot;
