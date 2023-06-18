import * as React from "react";

import ManageAccounts from "@mui/icons-material/ManageAccounts";
import PersonAdd from "@mui/icons-material/PersonAdd";

const allMenuActions = [
  {
    icon: <ManageAccounts />,
    name: "edit",
    tooltipTitle: "Изменить данные склада",
  },
  {
    icon: <PersonAdd />,
    name: "add",
    tooltipTitle: "Добавить новый склад",
  },
];

export default allMenuActions;
