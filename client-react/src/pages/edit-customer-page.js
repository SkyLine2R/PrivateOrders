import * as React from "react";
import GroupIcon from "@mui/icons-material/Group";

import EditItemsPage from "../edit-items-page/edit-items-page";
import EditCustomersDialog from "../dialog/edit-customer-dialog";

import allMenuActions from "../components/menu-actions-customers";
import dbSchema from "../../../components/customers-db_schema";

import { setModalWindowIsOpen } from "../Store/Slices/slice-customers";

export default function EditUsersPage() {
  return (
    <EditItemsPage
      page="customers"
      headerText="Склады"
      HeaderIcon={GroupIcon}
      setModalWindowIsOpen={setModalWindowIsOpen}
      allMenuActions={allMenuActions}
      EditDialog={EditCustomersDialog}
      dbSchema={dbSchema}
    />
  );
}
