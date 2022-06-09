import AuthProvider from "./auth/authProvider";
import MessengerProvider from "./messenger/messengerProvider";

const ContextProvider = ({ children }) => {
  return (
    <AuthProvider>
      <MessengerProvider>{children}</MessengerProvider>
    </AuthProvider>
  );
};

export default ContextProvider;
