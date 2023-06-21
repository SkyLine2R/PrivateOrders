import * as React from "react";
import Warehouse from "@mui/icons-material/Warehouse";

import EditItemsPage from "./edit-items-page";
import EditCustomersDialog from "../dialog/edit-customer-dialog";

import allMenuActions from "../components/menu-actions-customers";
import dbSchema from "../../../components/customers-db_schema";

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
      dbSchema={dbSchema}
    />
  );
}
