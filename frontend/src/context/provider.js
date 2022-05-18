import AppProvider from "./app/appProvider";

const ContextProvider = ({ children }) => {
  return <AppProvider>{children}</AppProvider>;
};

export default ContextProvider;
