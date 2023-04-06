import * as React from "react";

import DataGrid from "../vendor-code-table/vendor-code-table";
import SearchAppBar from "../../search-app-bar/search-app-bar";
import Grid from "@mui/material/Unstable_Grid2";

export default function ReceiptOfMaterials() {
  return (
    <Grid container rowSpacing={1} spacing={2}>
      <Grid xs={5}>
        <Grid>
          <DataGrid />
        </Grid>

        <Grid>
          <SearchAppBar />
        </Grid>
      </Grid>

      <Grid xs={7}>
        <DataGrid />
      </Grid>
    </Grid>
  );
}
