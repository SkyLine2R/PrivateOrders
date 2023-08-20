/* eslint-disable react/prop-types */
import * as React from "react";
import Grid from "@mui/material/Unstable_Grid2";
import Box from "@mui/material/Box";

import EditVendorCodePage from "./edit-vendor-code-page";
import StockOfMaterialPage from "./stock-of-materials-page";
import InStockOfMaterialPage from "./inStock-of-materials-page";
import QuickSearchForm from "../forms/quick-search-vendor-code-and-material-form";
import {
  selectTablesInStock,
  selectTablesOutStock,
  selectColumns,
} from "../components/quickSearchFilterArr";

export default function EditDocumentsPage({ type }) {
  const heightFullPage = "calc(100vh - 294px)";
  const heightHalfPage = "calc((100vh - 344px) / 2)";

  return (
    <Grid container spacing={1} p="0">
      <Grid xs={6}>
        {type === "documentsInStock" ? (
          <Box pb="45px" sx={{ height: heightHalfPage }}>
            <EditVendorCodePage headerText="Номенклатура" />
          </Box>
        ) : null}
        <Box p="0 16px 5px 16px" /* sx={{ height: heightHalfPage }} */>
          <QuickSearchForm
            selectTables={
              type === "documentsInStock"
                ? selectTablesInStock
                : selectTablesOutStock
            }
            selectColumns={selectColumns}
          />
        </Box>
        <Box
          sx={{
            height:
              type === "documentsInStock" ? heightHalfPage : heightFullPage,
          }}
        >
          <StockOfMaterialPage headerText="Материал на складе" />
        </Box>
      </Grid>
      <Grid xs={6}>
        <InStockOfMaterialPage />
      </Grid>
    </Grid>
  );
}
