/* eslint-disable react/prop-types */
import * as React from "react";
import { createContext, useState } from "react";
import { getSession } from "../components/session";

const AuthContext = createContext({
  user: {},
  setUser: () => {},
});

export function AuthProvider({ children }) {
  const [user, setUser] = useState({
    login: "",
    name: "",
    accessLevel: 1,
  });

  React.useEffect(() => {
    const { login, name, accessLevel } = getSession();
    setUser({ login, name, accessLevel });
  }, []);

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
