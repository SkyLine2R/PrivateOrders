/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-unused-vars */
import * as React from "react";
import Box from "@mui/material/Box";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import TextField from "@mui/material/TextField";
import { changeValue } from "../slice";
// import itemsDB from "../../../components/items-db_schema.js";
// import "./../edit-vendor-code-dialog/edit-vendor-code-dialog.js";
// import * as constant from "../edit-vendor-code-dialog/edit-vendor-code-dialog.js";

export default function FieldForInput(props) {
  const dispatch = useDispatch();
  const val = useSelector((state) => state[props.id]);
  // Убираем "запрещённые" символы и обрезаем строку
  const textСorrectionInField = (refObj, fieldValue) =>
    fieldValue
      .replace("ё", "е")
      .replace("Ё", "Е")
      .replace(new RegExp(`[^${refObj.regularExp}]`, "gi"), "")
      .substring(0, refObj.maxlength);
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
        id={props.id}
        label={props.label}
        variant="outlined"
        value={val}
        onChange={(event) => {
          dispatch(
            changeValue({
              value: event.target.value,
              fieldId: props.id,
            })
          );
        }}
      />
    </Box>
  );
}

FieldForInput.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

// export default React.memo(FieldForInput);
