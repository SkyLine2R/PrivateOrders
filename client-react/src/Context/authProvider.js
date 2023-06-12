/* eslint-disable react/prop-types */
import * as React from "react";
import { createContext, useState } from "react";

const AuthContext = createContext({
  isAuthenticated: false,
  setAuth: () => {},
});

export function AuthProvider({ children }) {
  const [isAuthenticated, setAuth] = useState(false);

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <AuthContext.Provider value={{ isAuthenticated, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
