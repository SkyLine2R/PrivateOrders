/* eslint-disable react/prop-types */
/* eslint-disable no-restricted-syntax */
import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid, ruRU } from "@mui/x-data-grid";

// Столбец с нумерацией
function colNaming(items) {
  const columns = [
    {
      field: "number",
      headerName: "#",
      width: 40,
      editable: false,
      type: "number",
    },
  ];
  // добавление заголовков из схемы БД
  // eslint-disable-next-line guard-for-in
  for (const item in items) {
    // eslint-disable-next-line no-param-reassign
    items[item].table.field = item;
    if (+items[item].table.width !== 0) columns.push(items[item].table);
  }
  return columns;
}

// нормализация данных для таблицы
function normalizeRowsData(items, dataArr) {
  const rowsName = Object.keys(items);

  let rows = [];
  if (dataArr) {
    rows = dataArr.map((item) => {
      const obj = { id: item.id };
      for (const key of rowsName) {
        obj[key] = item[key];
      }
      return obj;
    });
  }

  const rowsData = rows.map((item, index) => ({
    ...item,
    number: index + 1,
    unit: items.unit?.unitArr[+item.unit],
  }));

  return rowsData;
}

function DataGridTable({ dbSchema, dataArr, onCellClick }) {
  const [colNameState, setColNameState] = React.useState([]); // наименования столбцов
  const [rowsDataState, setRowsDataState] = React.useState([]); // содержимое таблицы

  // при монтировании озаглавить столбцы
  React.useEffect(() => setColNameState(colNaming(dbSchema)), [dbSchema]);

  // нормализация данных, если был новый запрос на сервер
  React.useEffect(
    () => setRowsDataState(normalizeRowsData(dbSchema, dataArr)),
    [dataArr, dbSchema]
  );

  return (
    <Box sx={{ height: "82vh", width: "100%" }}>
      <DataGrid
        rows={rowsDataState}
        columns={colNameState}
        pageSize={50}
        rowsPerPageOptions={[50]}
        /* checkboxSelection */
        /* disableSelectionOnClick */
        experimentalFeatures={{ newEditingApi: true }}
        localeText={ruRU.components.MuiDataGrid.defaultProps.localeText}
        density="compact"
        /* onCellClick={(GridCellParams, event, GridCallbackDetails) => {
          dispatch(action);
        }} */
        onCellClick={onCellClick}
      />
    </Box>
  );
}

export default React.memo(DataGridTable);
/* function(params: GridCellParams, event: MuiEvent<React.MouseEvent>, details: GridCallbackDetails) => void
params: Со всеми свойствами из GridCellParams .
событие: объект события.
details: Дополнительные сведения об этом обратном вызове. */
