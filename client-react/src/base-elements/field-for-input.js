/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/prop-types */
import * as React from "react";
import { useDispatch } from "react-redux";

import Box from "@mui/material/Box";
import PropTypes from "prop-types";
import TextField from "@mui/material/TextField";
import textСorrectionInField from "../../../components/textCorrectionForInput";

export default function FieldForInput({
  id,
  label,
  value,
  changeValue,
  dbSchema,
  disable,
}) {
  const dispatch = useDispatch();

  const onChangeVal = ({ target }) => {
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
        label={label}
        value={value}
        onChange={onChangeVal}
        variant="outlined"
        disabled={disable}
      />
    </Box>
  );
}

FieldForInput.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  changeValue: PropTypes.func.isRequired,
  dbSchema: PropTypes.object.isRequired,
};

FieldForInput.defaultProps = {
  value: "",
};
