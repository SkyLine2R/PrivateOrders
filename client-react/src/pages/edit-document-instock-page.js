import * as React from "react";
import Grid from "@mui/material/Unstable_Grid2";
import Box from "@mui/material/Box";

import EditVendorCodePage from "./edit-vendor-code-page";
import StockOfMaterialPage from "./stock-of-materials-page";
import InStockOfMaterialPage from "./inStock-of-materials-page";
import QuickSearchForm from "../forms/quick-search-vendor-code-and-material-form";

export default function EditDocumentsPage() {
  const heightHalfPage = "calc((100vh - 120px - 64px - 80px) / 2)";

  return (
    <Grid container spacing={1} p="0">
      <Grid xs={6}>
        <Box pb="45px" sx={{ height: heightHalfPage }}>
          <EditVendorCodePage headerText="Номенклатура" />
        </Box>
        <Box p="0 16px 5px 16px" /* sx={{ height: heightHalfPage }} */>
          <QuickSearchForm />
        </Box>
        <Box sx={{ height: heightHalfPage }}>
          <StockOfMaterialPage headerText="Материал" />
        </Box>
      </Grid>
      <Grid xs={6}>
        <InStockOfMaterialPage />
      </Grid>
    </Grid>
  );
}
