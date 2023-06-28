import * as React from "react";

import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import PostAddIcon from "@mui/icons-material/PostAdd";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

const allMenuActions = [
  {
    icon: <AddShoppingCartIcon />,
    name: "openForFill",
    tooltipTitle: "Открыть для редактирования",
  },
  {
    icon: <DriveFileRenameOutlineIcon />,
    name: "edit",
    tooltipTitle: "Изменить реквизиты документа",
  },
  {
    icon: <DeleteForeverIcon />,
    name: "delete",
    tooltipTitle: "Удалить документ",
  },
  {
    icon: <PostAddIcon />,
    name: "add",
    tooltipTitle: "Добавить новый документ",
  },
];

export default allMenuActions;
