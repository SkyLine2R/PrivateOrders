/* eslint-disable react/prop-types */
import * as React from "react";
import QrCode2Icon from "@mui/icons-material/QrCode2";

import EditItemsPage from "./edit-items-page";
import EditVendorCodeDialog from "../dialogs/edit-vendor-code-dialog";

import allMenuActions from "../components/menus-schemas/menu-actions-vendor-codes";
import tableSchema from "../components/tables-schemas/table_schema-vendor-codes";
import dbSchema from "../../../components/db_schema_for_testing/db_schema-vendor-codes";

import { setModalWindowIsOpen } from "../Store/Slices/slice-vendor-codes";

export default function EditVendorCodePage({ headerText }) {
  return (
    <EditItemsPage
      page="vendorCodes"
      headerText={headerText ?? "Редактирование артикулов"}
      HeaderIcon={QrCode2Icon}
      setModalWindowIsOpen={setModalWindowIsOpen}
      allMenuActions={allMenuActions}
      EditDialog={EditVendorCodeDialog}
      tableSchema={tableSchema}
      dbSchema={dbSchema}
    />
  );
}
