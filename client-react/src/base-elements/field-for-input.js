import * as React from "react";
import { useDispatch } from "react-redux";

import Box from "@mui/material/Box";
import PropTypes from "prop-types";
import TextField from "@mui/material/TextField";
import textСorrectionInField from "../components/textCorrectionForInput";

export default function FieldForInput({
  id,
  label,
  value,
  changeValue,
  dbSchema,
  disable,
  variant,
  type,
  InputProps,
}) {
  const dispatch = useDispatch();

  const onChangeVal = ({ target }) => {
    if (!changeValue) return;
    dispatch(
      changeValue({
        value: textСorrectionInField(dbSchema[target.id], target.value),
        fieldId: target.id,
      })
    );
  };

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
        type={type}
        label={label}
        value={value}
        onChange={onChangeVal}
        variant={variant}
        disabled={disable}
        InputProps={InputProps}
      />
    </Box>
  );
}

FieldForInput.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  variant: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  changeValue: PropTypes.func,
  dbSchema: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]).isRequired,
  disable: PropTypes.bool,
  type: PropTypes.string,
  InputProps: PropTypes.oneOfType([PropTypes.node, PropTypes.object]),
};

FieldForInput.defaultProps = {
  changeValue: null,
  value: "",
  disable: false,
  variant: "outlined",
  type: "text",
  InputProps: undefined,
};
