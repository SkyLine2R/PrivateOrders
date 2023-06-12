import * as React from "react";
import EditIcon from "@mui/icons-material/Edit";

import EditItemsPage from "../edit-items-page/edit-items-page";
import EditVendorCodeDialog from "../edit-vendor-code-dialog/edit-vendor-code-dialog";

import allMenuActions from "../components/menu-actions-vendor-codes";
import dbSchema from "../../../components/vendor-codes-db_schema";

import { setModalWindowIsOpen } from "../Store/Slices/slice-vendor-codes";

export default function EditVendorCodePage() {
  return (
    <EditItemsPage
      page="vendorCodes"
      headerText="Редактирование артикулов"
      HeaderIcon={EditIcon}
      setModalWindowIsOpen={setModalWindowIsOpen}
      allMenuActions={allMenuActions}
      EditDialog={EditVendorCodeDialog}
      dbSchema={dbSchema}
    />
  );
}
