import React, { useContext, useReducer } from "react";
import MessengerReducer from "context/messenger/messengerReducer";
import MessengerState from "context/messenger/messengerState";

const MessengerContext = React.createContext();

const MessengerProvider = ({ children }) => {
  const contextValue = useReducer(MessengerReducer, MessengerState);
  return (
    <MessengerContext.Provider value={contextValue}>
      {children}
    </MessengerContext.Provider>
  );
};
export default MessengerProvider;

export const useMessenger = () => {
  const contextValue = useContext(MessengerContext);
  return contextValue;
};
