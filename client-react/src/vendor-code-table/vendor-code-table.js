/* eslint-disable no-restricted-syntax */
import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid, ruRU } from "@mui/x-data-grid";
import { useSelector, useDispatch } from "react-redux";

import itemsDB from "../../../components/items-db_schema";
// const unitForInput = itemsDB.unit.unitArr;

// Подготовка столбцов и заголовков таблицы
// eslint-disable-next-line no-unused-vars
const testRows = [
  {
    id: 1,
    vendorCode: "010703",
    itemName: "Алюминиевый профиль закладная деталь для стойки",
    unit: "м / хл.",
    quantity: "6",
  },
  {
    id: 2,
    vendorCode: "432254",
    itemName: "Алюминиевый профиль стойка 149мм",
    unit: "м / хл.",
    quantity: "4.6",
  },
  {
    id: 3,
    vendorCode: "990117",
    itemName: "Саморез с пот. головкой 4,2*16 А2",
    unit: "шт. / уп.",
    quantity: "100",
  },
];

export default function DataGridTable() {
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

  const val = useSelector((state) => state.vendorCodesArr);

  // eslint-disable-next-line guard-for-in, no-restricted-syntax
  for (const item in itemsDB) {
    itemsDB[item].table.field = item;
    columns.push(itemsDB[item].table);
  }

  const rowsName = Object.keys(itemsDB);

  const rows = val.map((item) => {
    const obj = { id: item.id };
    for (const key of rowsName) {
      obj[key] = item[key];
    }
    return obj;
  });

  return (
    <Box sx={{ height: 450, width: "100%" }}>
      <DataGrid
        rows={rows.map((item, index) => {
          item.number = index + 1;
          return item;
        }, "")}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        /* checkboxSelection */
        /* disableSelectionOnClick */
        experimentalFeatures={{ newEditingApi: true }}
        localeText={ruRU.components.MuiDataGrid.defaultProps.localeText}
        /* density={"compact"} */
        /* onCellClick={(GridCellParams, event, GridCallbackDetails) => {
          dispatch(action);

          console.log(GridCellParams);
        }} */
      />
    </Box>
  );
}

/* function(params: GridCellParams, event: MuiEvent<React.MouseEvent>, details: GridCallbackDetails) => void
params: Со всеми свойствами из GridCellParams .
событие: объект события.
details: Дополнительные сведения об этом обратном вызове. */
