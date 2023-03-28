/* eslint-disable no-restricted-syntax */
import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid, ruRU } from "@mui/x-data-grid";
import { useSelector, useDispatch } from "react-redux";
import { copyPasteValue, fetchVendorCodes } from "../slice";

import itemsDB from "../../../components/items-db_schema";

// const unitForInput = itemsDB.unit.unitArr;

// Подготовка столбцов и заголовков таблицы
// eslint-disable-next-line no-unused-vars
export default function DataGridTable() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const { vendorCodesArr } = state;

  React.useEffect(
    () => dispatch(fetchVendorCodes()),
    [dispatch, state.vendorCode, state.itemName]
  );

  const columns = [
    {
      field: "number",
      headerName: "#",
      width: 40,
      editable: false,
      type: "number",
      valueGetter: (index) => index.value, // добавление номеров в первую графу
    },
  ];

  // eslint-disable-next-line guard-for-in, no-restricted-syntax
  for (const item in itemsDB) {
    console.log("перерисовка заголовков");
    itemsDB[item].table.field = item;
    columns.push(itemsDB[item].table);
  }

  const rowsName = Object.keys(itemsDB);
  let rows = [];

  if (vendorCodesArr) {
    rows = vendorCodesArr.map((item) => {
      const obj = { id: item.id };
      for (const key of rowsName) {
        obj[key] = item[key];
      }
      return obj;
    });
  }

  return (
    <Box sx={{ height: 450, width: "100%" }}>
      <DataGrid
        rows={rows.map(
          (item, index) => ({
            ...item,
            number: index + 1,
            unit: itemsDB.unit.unitArr[+item.unit],
          }),
          ""
        )}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        /* checkboxSelection */
        /* disableSelectionOnClick */
        experimentalFeatures={{ newEditingApi: true }}
        localeText={ruRU.components.MuiDataGrid.defaultProps.localeText}
        onCellClick={(gridCellParams) => {
          dispatch(
            copyPasteValue({
              id: gridCellParams.id,
              fieldId: gridCellParams.field,
            })
          );
        }}
        /* density={"compact"} */
        /* onCellClick={(GridCellParams, event, GridCallbackDetails) => {
          dispatch(action);
        }} */
      />
    </Box>
  );
}

/* function(params: GridCellParams, event: MuiEvent<React.MouseEvent>, details: GridCallbackDetails) => void
params: Со всеми свойствами из GridCellParams .
событие: объект события.
details: Дополнительные сведения об этом обратном вызове. */
