/* eslint-disable react/prop-types */
import * as React from "react";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";

export default function ArrowTooltips({ value, id, title }) {
  return (
    <Tooltip title={title} arrow>
      <Button id={id} value={value}>
        {value}
      </Button>
    </Tooltip>
  );
}
