/* eslint-disable no-console */
import * as React from "react";
import Box from "@mui/material/Box";
import PropTypes from "prop-types";
import TextField from "@mui/material/TextField";

export default function FieldForInput({ id, label, value, onChangeVal }) {
  return (
    <Box
      component="form"
      sx={{
        "& > :not(style)": { mt: 1, width: "auto", minWidth: "100%" },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        id={id}
        label={label}
        value={value}
        onChange={onChangeVal}
        variant="outlined"
      />
    </Box>
  );
}

FieldForInput.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChangeVal: PropTypes.func.isRequired,
};

FieldForInput.defaultProps = {
  value: "",
};
