import * as React from "react";
import ColorLensIcon from "@mui/icons-material/ColorLens";

import EditItemsPage from "./edit-items-page";
import EditDialog from "../dialog/edit-colors-dialog";

import allMenuActions from "../components/menu-actions-colors";
import dbSchema from "../../../components/colors-db_schema";

import { setModalWindowIsOpen } from "../Store/Slices/slice-colors";

export default function EditUsersPage() {
  return (
    <EditItemsPage
      page="colors"
      headerText="Каталог цветов"
      HeaderIcon={ColorLensIcon}
      setModalWindowIsOpen={setModalWindowIsOpen}
      allMenuActions={allMenuActions}
      EditDialog={EditDialog}
      dbSchema={dbSchema}
    />
  );
}
