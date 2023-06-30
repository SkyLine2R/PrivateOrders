import * as React from "react";

import EditIcon from "@mui/icons-material/Edit";
import AddHomeIcon from "@mui/icons-material/AddHome";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

const allMenuActions = [
  {
    icon: <EditIcon />,
    name: "edit",
    tooltipTitle: "Изменить данные склада",
  },
  {
    icon: <DeleteForeverIcon />,
    name: "del",
    tooltipTitle: "Удалить склад заказчика",
  },
  {
    icon: <AddHomeIcon />,
    name: "add",
    tooltipTitle: "Добавить новый склад",
  },
];

export default allMenuActions;
