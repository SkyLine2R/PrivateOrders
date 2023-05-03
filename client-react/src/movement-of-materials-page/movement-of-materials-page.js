import * as React from "react";
import Grid from "@mui/material/Unstable_Grid2";

import Tabs from "../tabs/tabs";
import DataGrid from "../vendor-code-table/vendor-code-table";
import dbSchemaDocument from "../../../components/document-db_schema";
import EditVendorCodeDialog from "../edit-vendor-code-dialog/edit-vendor-code-dialog";

export default function ReceiptOfMaterials() {
  return (
    <Grid container rowSpacing={1} spacing={2}>
      <Tabs
        tabLabel1="Поступления на склад"
        tabLabel2="Документ...584"
        tab1={<DataGrid itemsDB={dbSchemaDocument} />}
        tab2={<EditVendorCodeDialog />}
      />
    </Grid>
  );
}
