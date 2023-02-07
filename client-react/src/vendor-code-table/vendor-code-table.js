import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid, ruRU } from "@mui/x-data-grid";
import itemsDB from "../../../components/items-db_schema.js";

const columns = [
  { field: "number", headerName: "#", width: 50, editable: false },
];
for (let item in itemsDB) {
  itemsDB[item].table["field"] = "" + item;

  columns.push(itemsDB[item].table);
}

/* const columns = [
  {
    field: "age",
    headerName: "Age",
    type: "number",
    width: 110,
    editable: true,
  },
  {
    field: "fullName",
    headerName: "Full name",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
    valueGetter: (params) =>
      `${params.row.firstName || ""} ${params.row.lastName || ""}`,
  },
]; */

const rows = [
  {
    id: 1,
    vendorCode: "010703",
    itemName: "Алюминиевый профиль закладная деталь для стойки",
    unit: "1",
    quantity: "6",
  },
  {
    id: 2,
    vendorCode: "432254",
    itemName: "Алюминиевый профиль стойка 149мм",
    unit: "1",
    quantity: "4.6",
  },
  {
    id: 3,
    vendorCode: "990117",
    itemName: "Саморез с пот. головкой 4,2*16 А2",
    unit: "2",
    quantity: "100",
  },
];

export default function DataGridTable() {
  return (
    <Box sx={{ height: 450, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[10]}
        /* checkboxSelection */
        /* disableSelectionOnClick */
        experimentalFeatures={{ newEditingApi: true }}
        localeText={ruRU.components.MuiDataGrid.defaultProps.localeText}
        /* density={"compact"} */
        onCellClick={(GridCellParams) => {
          alert(GridCellParams);
        }}
      />
    </Box>
  );
}

/* function(params: GridCellParams, event: MuiEvent<React.MouseEvent>, details: GridCallbackDetails) => void
params: Со всеми свойствами из GridCellParams .
событие: объект события.
details: Дополнительные сведения об этом обратном вызове. */
