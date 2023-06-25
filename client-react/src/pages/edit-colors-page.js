import * as React from "react";
import ColorLensIcon from "@mui/icons-material/ColorLens";

import EditItemsPage from "./edit-items-page";
import EditDialog from "../dialogs/edit-colors-dialog";

import allMenuActions from "../components/menus-schemas/menu-actions-colors";
import dbSchema from "../../../components/db_schema_for_testing/db_schema-colors";
import tableSchema from "../components/tables-schemas/table_schema-colors";

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
      tableSchema={tableSchema}
      dbSchema={dbSchema}
    />
  );
}
