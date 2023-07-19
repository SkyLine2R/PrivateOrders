import * as React from "react";
import QrCode2Icon from "@mui/icons-material/QrCode2";
import Grid from "@mui/material/Unstable_Grid2";

import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
// eslint-disable-next-line no-unused-vars
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

import EditItemsPage from "./edit-items-page";
import EditDialog from "../dialogs/edit-vendor-code-dialog";

import EditVendorCodePage from "./edit-vendor-code-page";
import DataGrid from "../base-elements/data-grid-table";

import allMenuActions from "../components/menus-schemas/menu-actions-documents";
import tableSchema from "../components/tables-schemas/table_schema-vendor-codes";
import dbSchemaVendorCodes from "../../../components/db_schema_for_testing/db_schema-vendor-codes";

import dbSchemaStock from "../../../components/db_schema_for_testing/db_schema-stock-material";

import tableSchemaStock from "../components/tables-schemas/table_schema-stock-material";
import StockOfMaterialPage from "./stock-of-materials-page";
import InStockOfMaterialPage from "./inStock-of-materials-page";

import { setModalWindowIsOpen } from "../Store/Slices/slice-instock-documents";

export default function EditDocumentsPage() {
  return (
    <Grid container spacing={1}>
      <Grid xs={6} sx={{ height: "45vh" }}>
        <EditItemsPage
          sx={{ padding: 0, margin: 0 }}
          page="vendorCodes"
          headerText="Артикулы в базе"
          HeaderIcon={QrCode2Icon}
          setModalWindowIsOpen={setModalWindowIsOpen}
          allMenuActions={allMenuActions}
          EditDialog={EditDialog}
          tableSchema={tableSchema}
          dbSchema={dbSchemaVendorCodes}
        />
        <StockOfMaterialPage sx={{ height: "45vh" }} />
        {/*         <DataGrid dbSchema={dbSchemaStock} tableSchema={tableSchemaStock} />
         */}{" "}
      </Grid>
      <Grid xs={6}>
        <InStockOfMaterialPage sx={{ height: "95vh" }} />
      </Grid>
    </Grid>
  );
}
