/* eslint-disable react/prop-types */
import * as React from "react";
import { createContext, useState } from "react";

const AuthContext = createContext({
  user: {},
  setUser: () => {},
});

export function AuthProvider({ children }) {
  const [user, setUser] = useState({ login: "", name: "", accessLevel: null });

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
