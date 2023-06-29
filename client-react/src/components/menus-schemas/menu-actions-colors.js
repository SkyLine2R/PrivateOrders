import * as React from "react";

import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import InvertColorsIcon from "@mui/icons-material/InvertColors";

const allMenuActions = [
  {
    icon: <BorderColorIcon />,
    name: "edit",
    tooltipTitle: "Изменить выбранный цвет",
  },
  {
    icon: <DeleteForeverIcon />,
    name: "delete",
    tooltipTitle: "Удалить цвет из каталога",
  },
  {
    icon: <InvertColorsIcon />,
    name: "add",
    tooltipTitle: "Добавить новый цвет",
  },
];

export default allMenuActions;
