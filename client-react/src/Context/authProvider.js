/* eslint-disable react/prop-types */
import * as React from "react";
import { createContext, useState } from "react";
import { getSession } from "../components/session";

const AuthContext = createContext({
  user: {},
  /*   isAuthenticated: false,
  setAuth: () => {}, */
  setUser: () => {},
});

export function AuthProvider({ children }) {
  const { login, name, accessLevel } = getSession();

  const [user, setUser] = useState({
    login: "",
    name: "",
    accessLevel: 1,
  });
  const [isAuthenticated, setAuth] = useState(false);

  React.useEffect(() => {
    setUser({ login, name, accessLevel });
    setAuth(!!login);
  }, [accessLevel, login, name]);

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <AuthContext.Provider value={{ isAuthenticated, setAuth, user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
