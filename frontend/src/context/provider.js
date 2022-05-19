import AppProvider from "./app/appProvider";
import AuthProvider from "./auth/authProvider";

const ContextProvider = ({ children }) => {
  return (
    <AppProvider>
      <AuthProvider>{children}</AuthProvider>
    </AppProvider>
  );
};

export default ContextProvider;
