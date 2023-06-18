import * as React from "react";
import CustomizedSnackbars from "./snackbar/snackbar";
import MenuAppBar from "./menu-app-bar/menu-app-bar";
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
