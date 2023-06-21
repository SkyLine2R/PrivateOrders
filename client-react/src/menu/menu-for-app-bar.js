/* eslint-disable react/prop-types */
import * as React from "react";
import Menu from "@mui/material/Menu";

export default function MainMenu({
  onClose,
  onClick,
  anchorEl,
  children,
  arrowSide,
}) {
  const open = Boolean(anchorEl);
  const arrow = arrowSide === "left" ? { left: 14 } : { right: 14 };

  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
      onClick={onClick}
      PaperProps={{
        elevation: 0,
        sx: {
          overflow: "visible",
          filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
          mt: 1.5,
          "& .MuiAvatar-root": {
            width: 32,
            height: 32,
            ml: -0.5,
            mr: 1,
          },
          "&:before": {
            ...{
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
            ...arrow,
          },
        },
      }}
      transformOrigin={{ horizontal: "right", vertical: "top" }}
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
    >
      {children}
    </Menu>
  );
}
