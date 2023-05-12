/* eslint-disable react/prop-types */
import * as React from "react";
import Box from "@mui/material/Box";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";

export default function SpeedDialMenu({ menuPlace, actions, onClickFunc }) {
  const { x, y, id } = menuPlace;
  return (
    <Box
      hidden={!x}
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
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.tooltipTitle}
          />
        ))}
        onClick={onClickFunc}
      </SpeedDial>
    </Box>
  );
}
