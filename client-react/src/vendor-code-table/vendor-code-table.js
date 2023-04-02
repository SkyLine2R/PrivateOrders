/* eslint-disable no-param-reassign */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid, ruRU } from "@mui/x-data-grid";
import { useSelector, useDispatch } from "react-redux";
import { copyPasteValue } from "../slice";

import itemsDB from "../../../components/items-db_schema";

// нормализация данных для таблицы
function normalizeRowsData(items, vendorCodesArr) {
  const rowsName = Object.keys(items);
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
  const rowsData = rows.map(
    (item, index) => ({
      ...item,
      number: index + 1,
      unit: items.unit.unitArr[+item.unit],
    }),
    ""
  );
  return rowsData;
}

// именование столбцов
function colNaming(items) {
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
  // добавление заголовков из схемы БД
  for (const item in items) {
    items[item].table.field = item;
    columns.push(items[item].table);
  }
  return columns;
}

export default function DataGridTable() {
  const [colNameState, setColNameState] = React.useState([]); // наименования столбцов
  const [rowsDataState, setRowsDataState] = React.useState([]); // содержимое таблицы

  const dispatch = useDispatch();
  const { prevReq, vendorCodesArr } = useSelector((st) => st);

  // именовать столбцы только при монтировании
  React.useEffect(() => setColNameState(colNaming(itemsDB)), []);

  // нормализация данных, если был новый запрос на сервер
  React.useEffect(
    () => setRowsDataState(normalizeRowsData(itemsDB, vendorCodesArr)),
    [vendorCodesArr, prevReq]
  );

  return (
    <Box sx={{ height: 450, width: "100%" }}>
      <DataGrid
        rows={rowsDataState}
        columns={colNameState}
        pageSize={50}
        rowsPerPageOptions={[50]}
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
