import { Route, Routes } from "react-router";
import { createTheme } from "@mui/material";
import ThemeProvider from "@mui/system/ThemeProvider";
import AuthRoute from "utils/authRoute";
import Home from "./home";
import { theme } from "constants/theme";
import { HOME, SIGN_IN } from "constants/routes";
import GuestRoute from "utils/guestRoute";
import SignIn from "./auth/signIn";

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
          index
          path={SIGN_IN}
          element={
            <GuestRoute>
              <SignIn />
            </GuestRoute>
          }
        />
        <Route path="*" element={<h1>Not found</h1>} />
      </Routes>
    </ThemeProvider>
  );
};

export default AppRoot;
