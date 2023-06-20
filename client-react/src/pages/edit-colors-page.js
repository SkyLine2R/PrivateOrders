import * as React from "react";
import ColorLensIcon from "@mui/icons-material/ColorLens";

import EditItemsPage from "./edit-items-page";
import EditCustomersDialog from "../dialog/edit-customer-dialog";

import allMenuActions from "../components/menu-actions-customers";
import dbSchema from "../../../components/customers-db_schema";

import { setModalWindowIsOpen } from "../Store/Slices/slice-customers";

export default function EditUsersPage() {
  return (
    <EditItemsPage
      page="colors"
      headerText="Каталог цветов"
      HeaderIcon={ColorLensIcon}
      setModalWindowIsOpen={setModalWindowIsOpen}
      allMenuActions={allMenuActions}
      EditDialog={EditCustomersDialog}
      dbSchema={dbSchema}
    />
  );
}
