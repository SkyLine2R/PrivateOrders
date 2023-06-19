import * as React from "react";
import GroupIcon from "@mui/icons-material/Group";

import EditItemsPage from "../edit-items-page/edit-items-page";
import EditUsersDialog from "../edit-users-dialog/edit-users-dialog";

import allMenuActions from "../components/menu-actions-users";
import dbSchema from "../../../components/users-db_schema";

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
      dbSchema={dbSchema}
    />
  );
}
