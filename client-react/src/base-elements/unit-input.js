/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-unused-vars */
import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { changeValue } from "../Store/Slices/slice-vendor-codes";

export default function SelectItemUnit({ label, id, selectValues, value }) {
  const dispatch = useDispatch();

  console.log("selectValues");
  console.log(selectValues);

  console.log("value");
  console.log(value);
  const handleChange = ({ target }) => {
    dispatch(
      changeValue({
        value: target.value,
        fieldId: id,
      })
    );
  };

  const currentValue = selectValues.find((item) => item.name === value); // .id || 1;
  console.log("currentValue");
  console.log(currentValue.id);

  return (
    <Box sx={{ mt: 1, width: "auto", minWidth: "100%" }}>
      <FormControl fullWidth>
        <InputLabel id={id}>{label}</InputLabel>
        <Select value={currentValue.id} label={label} onChange={handleChange}>
          {[
            selectValues.map((item) => (
              <MenuItem value={item.id}>{item.name}</MenuItem>
            )),
          ]}
        </Select>
      </FormControl>
    </Box>
  );
}
