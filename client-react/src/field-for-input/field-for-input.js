/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-unused-vars */
import * as React from "react";
import Box from "@mui/material/Box";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import TextField from "@mui/material/TextField";
import { changeValue } from "../slice";
import testFormForInputItem from "../../../components/items-db_schema";

export default function FieldForInput(props) {
  const dispatch = useDispatch();
  const val = useSelector((state) => state[props.id]);

  // Убираем "запрещённые" символы и обрезаем строку по регулярке из items-db-schema
  const textСorrectionInField = (refObj, fieldValue) => {
    const str = fieldValue
      .replace("ё", "е")
      .replace("Ё", "Е")
      .match(new RegExp(refObj.regularExp, "gi")) || [""];

    return (
      refObj.containsNumber ? str[0].replace(",", ".") : str[0]
    ).substring(0, refObj.maxlength);
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
        id={props.id}
        label={props.label}
        variant="outlined"
        value={val}
        onChange={(event) => {
          dispatch(
            changeValue({
              value: textСorrectionInField(
                testFormForInputItem[props.id],
                event.target.value
              ),
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
