import React, { useContext, useReducer } from "react";
import AuthReducer from "context/auth/authReducer";
import AuthState from "context/auth/authState";

const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {
  const contextValue = useReducer(AuthReducer, AuthState);
  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
export default AuthProvider;

export const useAuth = () => {
  const contextValue = useContext(AuthContext);
  return contextValue;
};
