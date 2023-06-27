/* eslint-disable no-nested-ternary */
/* eslint-disable react/prop-types */
import * as React from "react";

import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";

export default function TitleDialog({
  menuEditType,
  IconNew,
  IconEdit,
  IconPass = null,
  titleNew,
  titleEdit,
  titlePass = null,
}) {
  return (
    <DialogTitle>
      {menuEditType === "add" ? (
        <Box
          sx={{
            display: "flex",
            alignItems: "end",
          }}
        >
          <IconNew fontSize="large" sx={{ color: "primary.dark", pr: 2 }} />
          {titleNew}
        </Box>
      ) : menuEditType === "edit" ? (
        <Box
          sx={{
            display: "flex",
            alignItems: "end",
          }}
        >
          <IconEdit fontSize="large" sx={{ color: "primary.dark", pr: 2 }} />
          {titleEdit}
        </Box>
      ) : menuEditType === "changePass" ? (
        <Box
          sx={{
            display: "flex",
            alignItems: "end",
          }}
        >
          <IconPass fontSize="large" sx={{ color: "primary.dark", pr: 2 }} />
          {titlePass}
        </Box>
      ) : null}
    </DialogTitle>
  );
}
