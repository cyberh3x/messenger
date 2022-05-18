import { createTheme } from "@mui/material";
import ThemeProvider from "@mui/system/ThemeProvider";
import { theme } from "constants/theme";

const AppRoot = () => {
  const muiTheme = createTheme(theme);
  return <ThemeProvider theme={muiTheme}></ThemeProvider>;
};

export default AppRoot;
