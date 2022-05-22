import AppProvider from "./app/appProvider";
import AuthProvider from "./auth/authProvider";
import MessengerProvider from "./messenger/messengerProvider";

const ContextProvider = ({ children }) => {
  return (
    <AppProvider>
      <AuthProvider>
        <MessengerProvider>{children}</MessengerProvider>
      </AuthProvider>
    </AppProvider>
  );
};

export default ContextProvider;
