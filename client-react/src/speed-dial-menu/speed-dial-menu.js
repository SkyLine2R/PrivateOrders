/* eslint-disable react/prop-types */
import * as React from "react";
import Box from "@mui/material/Box";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";

export default function SpeedDialMenu({ menuParams, onClick, onMouseLeave }) {
  const { x, y, hidden, actions } = menuParams;

  return (
    <Box
      hidden={hidden}
      sx={{
        transformOrigin: "center, left",
        position: "absolute",
        left: `${x - 25}px`,
        top: `${y - 30}px`,
        zIndex: 1000,
        flexGrow: 1,
      }}
    >
      <SpeedDial
        direction="right"
        ariaLabel="SpeedDial basic"
        icon={<SpeedDialIcon />}
        onClick={onClick}
        onMouseLeave={onMouseLeave}
      >
        {actions.map(({ name, icon, tooltipTitle }) => (
          <SpeedDialAction
            key={name}
            id={name}
            pressed-button={name}
            icon={icon}
            tooltipTitle={tooltipTitle}
          />
        ))}
      </SpeedDial>
    </Box>
  );
}
