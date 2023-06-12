import * as React from "react";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

export default function IconButtonClose() {
  return (
    <IconButton>
      <CloseIcon color="action" fontSize="small" />
    </IconButton>
  );
}
