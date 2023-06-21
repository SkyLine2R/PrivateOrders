/* eslint-disable react/prop-types */
import * as React from "react";
import { createContext, useState } from "react";
import { getSession } from "../components/session";

const AuthContext = createContext({
  user: {},
  setUser: () => {},
});

export function AuthProvider({ children }) {
  const [user, setUser] = useState({ login: "", name: "", accessLevel: null });

  const { token, login, ...userSession } = getSession();
  console.log("rendering context");

  console.log("reading userSession");
  console.log(userSession);

  React.useEffect(() => {
    console.log("setting context");

    setUser({ login, ...userSession });
  });

  /*   console.log("user");
  console.log(user); */
  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
