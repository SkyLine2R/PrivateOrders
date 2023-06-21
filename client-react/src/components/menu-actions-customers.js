import * as React from "react";

import EditIcon from "@mui/icons-material/Edit";
import AddHomeIcon from "@mui/icons-material/AddHome";

const allMenuActions = [
  {
    icon: <EditIcon />,
    name: "edit",
    tooltipTitle: "Изменить данные склада",
  },
  {
    icon: <AddHomeIcon />,
    name: "add",
    tooltipTitle: "Добавить новый склад",
  },
];

export default allMenuActions;
