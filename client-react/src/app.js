import * as React from "react";
import Box from "@mui/material/Paper";

import CustomizedSnackbars from "./base-elements/snackbar";
import AlertSlideDialog from "./dialogs/alert-dialog";
import MenuAppBar from "./menus/menu-app-bar";
import useRoutes from "./Routes/routes";
import useAuth from "./hooks/useAuth";
import ResetStoreParts from "./Store/loadAndResetStoreParts";

export default function App() {
  const routes = useRoutes();
  const { user } = useAuth();

  return (
    <Box sx={{ height: "100vh", overflow: "hidden" }}>
      {user.accessLevel > 1 ? <MenuAppBar /> : null}
      <ResetStoreParts />
      <CustomizedSnackbars />
      <AlertSlideDialog />
      <Box
        sx={{
          height: "calc(100vh - 124px)",
          boxShadow: "none",
          /* background: "#388e3c", */
        }}
      >
        {routes}
      </Box>
    </Box>
  );
}
