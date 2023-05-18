/* eslint-disable react/prop-types */
import * as React from "react";
import Box from "@mui/material/Box";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";

export default function SpeedDialMenu({ menuParams, onClickFunc }) {
  const { x, y, hidden, actions } = menuParams;
  return (
    <Box
      hidden={hidden}
      sx={{
        position: "fixed",
        left: `${x + 45}px`,
        top: `${y >= 280 ? y - 280 : y - 40}px`,
        zIndex: 1000,
        height: 320,
        transform: "translateZ(0px)",
        flexGrow: 1,
      }}
    >
      <SpeedDial
        direction={y >= 280 ? "up" : "down"}
        ariaLabel="SpeedDial basic"
        sx={{ position: "absolute", bottom: 16, right: 16 }}
        icon={<SpeedDialIcon />}
        onClick={onClickFunc}
      >
        {actions.map(({ name, icon, tooltipTitle }) => (
          <SpeedDialAction
            key={name}
            id={name}
            icon={icon}
            tooltipTitle={tooltipTitle}
          />
        ))}
      </SpeedDial>
    </Box>
  );
}
