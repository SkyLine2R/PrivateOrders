import * as React from "react";
import Grid from "@mui/material/Unstable_Grid2";

import DataGrid from "../vendor-code-table/vendor-code-table";
import dbSchema from "../../../components/items-db_schema";

export default function ReceiptOfMaterials() {
  return (
    <Grid container rowSpacing={1} spacing={2}>
      <Grid xs={6}>
        <DataGrid itemsDB={dbSchema} />
      </Grid>
      <Grid xs={6}>
        <DataGrid itemsDB={dbSchema} />
      </Grid>
    </Grid>
  );
}
