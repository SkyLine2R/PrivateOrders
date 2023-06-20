import * as React from "react";
import CustomizedSnackbars from "./base-elements/snackbar";
import MenuAppBar from "./menu/menu-app-bar";
import useRoutes from "./Routes/routes";

export default function App() {
  const routes = useRoutes();
  return (
    <>
      <CustomizedSnackbars />
      <MenuAppBar />
      {routes}
    </>
  );
}
