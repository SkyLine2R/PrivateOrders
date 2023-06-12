import { useContext } from "react";
import AuthContext from "../Context/authProvider";

export default function useAuth() {
  return useContext(AuthContext);
}
