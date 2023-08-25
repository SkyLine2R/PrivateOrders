/* eslint-disable react/prop-types */
import * as React from "react";
import Grid from "@mui/material/Unstable_Grid2";
import Box from "@mui/material/Box";
import { useSelector } from "react-redux";

import EditVendorCodePage from "./edit-vendor-code-page";
import StockPage from "./stock-page";
import EditStockMatarialsPage from "./edit-stock-materials-page";
import QuickSearchForm from "../forms/quick-search-vendor-code-and-material-form";
import { setModalWindowIsOpen } from "../Store/Slices/slice-inStock";

import {
  selectTables,
  selectColumns,
} from "../components/quickSearchFilterArr";

export default function EditDocumentsPage({ page }) {
  const height =
    page === "documentsInStock"
      ? "calc((100vh - 344px) / 2)"
      : "calc(100vh - 294px)";

  const selectTablesForFilter =
    page === "documentsInStock" ? selectTables : [selectTables[1]];

  const materialPage = page === "documentsInStock" ? "inStock" : "outStock";

  return (
    <Grid container spacing={1} p="0">
      <Grid xs={6}>
        {page === "documentsInStock" ? (
          <Box pb="45px" sx={{ height }}>
            <EditVendorCodePage
              headerText="Номенклатура"
              setModalWindowAddingItemsIsOpen={setModalWindowIsOpen}
            />
          </Box>
        ) : null}
        <Box p="0 16px 5px 16px">
          <QuickSearchForm
            selectTables={selectTablesForFilter}
            selectColumns={selectColumns}
          />
        </Box>
        <Box sx={{ height }}>
          <StockPage headerText="Материал на складе" />
        </Box>
      </Grid>
      <Grid xs={6}>
        <EditStockMatarialsPage page={materialPage} />
      </Grid>
    </Grid>
  );
}
