/* import * as React from "react";

import DataGrid from "../base-elements/data-grid-table";
import tableSchema from "../components/tables-schemas/table_schema-stock-material";

import dbSchemaDocument from "../../../components/db_schema_for_testing/db_schema-document";

export default function Stock() {
  return <DataGrid dbSchema={dbSchemaDocument} tableSchema={tableSchema} />;
} */

import * as React from "react";
import StorageIcon from "@mui/icons-material/Storage";

import EditItemsPage from "./edit-items-page";
import EditVendorCodeDialog from "../dialogs/edit-vendor-code-dialog";

import allMenuActions from "../components/menus-schemas/menu-actions-vendor-codes";
import tableSchema from "../components/tables-schemas/table_schema-stock-material";
import dbSchema from "../../../components/db_schema_for_testing/db_schema-stock-material";

import { setModalWindowIsOpen } from "../Store/Slices/slice-vendor-codes";

export default function EditVendorCodePage() {
  return (
    <EditItemsPage
      page="stock"
      headerText="Материал на складе"
      HeaderIcon={StorageIcon}
      setModalWindowIsOpen={setModalWindowIsOpen}
      allMenuActions={allMenuActions}
      EditDialog={EditVendorCodeDialog}
      tableSchema={tableSchema}
      dbSchema={dbSchema}
    />
  );
}
