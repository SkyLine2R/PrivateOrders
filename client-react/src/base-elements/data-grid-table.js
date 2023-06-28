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
      field: "serialNumber",
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
    items[item].field = item;
    if (+items[item].width !== 0) columns.push(items[item]);
  }
  return columns;
}

// нормализация данных для таблицы
function normalizeRowsData(items, catalog) {
  const rowsName = Object.keys(items);

  let rows = [];
  if (catalog?.length) {
    rows = catalog.map((item) => {
      const obj = { id: item.id };
      for (const key of rowsName) {
        obj[key] = item[key];
      }
      return obj;
    });
  }

  const rowsData = rows.map((item, index) => {
    // заменим, если необходимо, цифровые значения на текстовые (м / хл., уровень доступа...)
    const tempObj = {};
    if (items?.unit?.unitArr) tempObj.unit = items.unit.unitArr[+item.unit];
    if (items?.accessLevel?.labels)
      tempObj.accessLevel = items.accessLevel.labels[+item.accessLevel];
    // конвертация timestamp в локальное время
    if (item?.createdAt)
      tempObj.createdAt = new Date(item.createdAt).toLocaleDateString();
    if (item?.date) tempObj.date = new Date(item.date).toLocaleDateString();

    return {
      ...item,
      ...tempObj,
      serialNumber: index + 1,
    };
  });

  return rowsData;
}

function DataGridTable({ tableSchema, catalog, onCellClick }) {
  const [rowsDataState, setRowsDataState] = React.useState([]); // содержимое таблицы
  // при монтировании озаглавить столбцы
  const colNameRef = React.useRef(null);
  if (colNameRef.current === null) {
    colNameRef.current = colNaming(tableSchema);
  }

  // нормализация данных, если был новый запрос на сервер
  React.useEffect(
    () => setRowsDataState(normalizeRowsData(tableSchema, catalog)),
    [catalog, tableSchema]
  );

  return (
    <Box sx={{ height: "82vh", width: "100%" }}>
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
