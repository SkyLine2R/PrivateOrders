import * as React from "react";
import Paper from "@mui/material/Paper";

import CustomizedSnackbars from "./base-elements/snackbar";
import AlertSlideDialog from "./dialogs/alert-dialog";
import MenuAppBar from "./menus/menu-app-bar";
import useRoutes from "./Routes/routes";
import useAuth from "./hooks/useAuth";

export default function App() {
  const routes = useRoutes();
  const { user } = useAuth();

  return (
    <Paper sx={{ height: "100vh", overflow: "hidden" }}>
      {user.accessLevel > 1 ? <MenuAppBar /> : null}
      <CustomizedSnackbars />
      <AlertSlideDialog />
      <Paper sx={{ height: "calc( 100vh - 125px )" }}>{routes}</Paper>
    </Paper>
  );
}
