/* eslint-disable react/prop-types */
/* eslint-disable no-restricted-syntax */
import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid, ruRU } from "@mui/x-data-grid";

// Столбец с нумерацией
function colNaming(items) {
  // добавить нумерацию
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
function normalizeRowsData(items, catalog) {
  const rowsName = Object.keys(items);

  let rows = [];
  if (catalog) {
    rows = catalog.map((item) => {
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
    accessLevel: items.accessLevel?.labels[+item.accessLevel],
  }));

  return rowsData;
}

function DataGridTable({ dbSchema, catalog, onCellClick }) {
  const [rowsDataState, setRowsDataState] = React.useState([]); // содержимое таблицы
  console.log("Рендеринг...");
  // при монтировании озаглавить столбцы
  const colNameRef = React.useRef(null);
  if (colNameRef.current === null) {
    console.log("Заглавия столбцов...");
    colNameRef.current = colNaming(dbSchema);
  }

  // нормализация данных, если был новый запрос на сервер
  React.useEffect(
    () => setRowsDataState(normalizeRowsData(dbSchema, catalog)),
    [catalog, dbSchema]
  );

  return (
    <Box
      sx={{ height: "82vh", width: "100%" }}
      /*       onContextMenu={(e) => {
        e.cancelBubble = true;

        e.preventDefault();
        console.log("e.currentTarget");
        console.log(e.currentTarget);

        console.log(e);
        console.log("e.target");
        console.log(e.target);
      }} */
    >
      <DataGrid
        rows={rowsDataState}
        columns={colNameRef.current}
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
