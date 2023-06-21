import * as React from "react";

import Warehouse from "@mui/icons-material/Warehouse";
import QrCode2Icon from "@mui/icons-material/QrCode2";
import ColorLensIcon from "@mui/icons-material/ColorLens";

const allMenuActions = [
  {
    icon: <Warehouse fontSize="small" />,
    name: "customers",
    tooltipTitle: "Склады",
  },
  {
    icon: <QrCode2Icon fontSize="small" />,
    name: "vendor-codes",
    tooltipTitle: "Артикулы материалов",
  },
  {
    icon: <ColorLensIcon fontSize="small" />,
    name: "colors",
    tooltipTitle: "Цвета материалов",
  },
];

export default allMenuActions;
