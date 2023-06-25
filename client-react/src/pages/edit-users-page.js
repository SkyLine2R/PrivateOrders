import * as React from "react";
import GroupIcon from "@mui/icons-material/Group";

import EditItemsPage from "./edit-items-page";
import EditUsersDialog from "../dialogs/edit-users-dialog";

import allMenuActions from "../components/menus-schemas/menu-actions-users";
import tableSchema from "../components/tables-schemas/table_schema-users";
import dbSchema from "../../../components/db_schema_for_testing/db_schema-users";

import { setModalWindowIsOpen } from "../Store/Slices/slice-users";

export default function EditUsersPage() {
  return (
    <EditItemsPage
      page="users"
      headerText="Пользователи базы данных"
      HeaderIcon={GroupIcon}
      setModalWindowIsOpen={setModalWindowIsOpen}
      allMenuActions={allMenuActions}
      EditDialog={EditUsersDialog}
      tableSchema={tableSchema}
      dbSchema={dbSchema}
    />
  );
}
