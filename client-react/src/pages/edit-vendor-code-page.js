import * as React from "react";
import QrCode2Icon from "@mui/icons-material/QrCode2";

import EditItemsPage from "./edit-items-page";
import EditVendorCodeDialog from "../dialog/edit-vendor-code-dialog";

import allMenuActions from "../components/menu-actions-vendor-codes";
import dbSchema from "../../../components/vendor-codes-db_schema";

import { setModalWindowIsOpen } from "../Store/Slices/slice-vendor-codes";

export default function EditVendorCodePage() {
  return (
    <EditItemsPage
      page="vendorCodes"
      headerText="Редактирование артикулов"
      HeaderIcon={QrCode2Icon}
      setModalWindowIsOpen={setModalWindowIsOpen}
      allMenuActions={allMenuActions}
      EditDialog={EditVendorCodeDialog}
      dbSchema={dbSchema}
    />
  );
}
