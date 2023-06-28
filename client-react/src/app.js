import * as React from "react";

import CustomizedSnackbars from "./base-elements/snackbar";
import AlertSlideDialog from "./dialogs/alert-slide-dialog";
import MenuAppBar from "./menus/menu-app-bar";
import useRoutes from "./Routes/routes";
import useAuth from "./hooks/useAuth";

export default function App() {
  const routes = useRoutes();
  const { user } = useAuth();

  return (
    <>
      {user.accessLevel > 1 ? <MenuAppBar /> : null}
      <CustomizedSnackbars />
      <AlertSlideDialog />
      {routes}
    </>
  );
}
