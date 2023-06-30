import * as React from "react";

import ControlPointIcon from "@mui/icons-material/ControlPoint";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ModeEditIcon from "@mui/icons-material/ModeEdit";

const allMenuActions = [
  {
    icon: <ModeEditIcon />,
    name: "edit",
    tooltipTitle: "Редактировать артикул",
  },
  {
    icon: <DeleteForeverIcon />,
    name: "del",
    tooltipTitle: "Удалить артикул",
  },
  {
    icon: <ControlPointIcon />,
    name: "add",
    tooltipTitle: "Добавить новый артикул",
  },
];

export default allMenuActions;
