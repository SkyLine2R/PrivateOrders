import * as React from "react";
import Warehouse from "@mui/icons-material/Warehouse";

import EditItemsPage from "./edit-items-page";
import EditCustomersDialog from "../dialogs/edit-customer-dialog";

import allMenuActions from "../components/menus-schemas/menu-actions-customers";
import tableSchema from "../components/tables-schemas/table_schema-customers";
import dbSchema from "../../../components/db_schema_for_testing/db_schema-customers";

import { setModalWindowIsOpen } from "../Store/Slices/slice-customers";

export default function EditUsersPage() {
  return (
    <EditItemsPage
      page="customers"
      headerText="Склады"
      HeaderIcon={Warehouse}
      setModalWindowIsOpen={setModalWindowIsOpen}
      allMenuActions={allMenuActions}
      EditDialog={EditCustomersDialog}
      tableSchema={tableSchema}
      dbSchema={dbSchema}
    />
  );
}
