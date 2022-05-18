import React, { useContext, useReducer } from "react";
import AppReducer from "context/app/appReducer";
import AppState from "context/app/appState";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const contextValue = useReducer(AppReducer, AppState);
  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};
export default AppProvider;

export const useApp = () => {
  const contextValue = useContext(AppContext);
  return contextValue;
};
