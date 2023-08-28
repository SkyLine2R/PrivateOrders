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

export default function SelectItemProperties({
  label,
  id,
  selectValues,
  value,
  changeValue,
}) {
  const dispatch = useDispatch();

  const handleChange = ({ target }) => {
    dispatch(
      changeValue({
        value: target.value,
        fieldId: id,
      })
    );
  };

  return (
    <Box sx={{ mt: 1, width: "auto", minWidth: "100%" }}>
      <FormControl fullWidth>
        <InputLabel id={id}>{label}</InputLabel>
        <Select value={value} label={label} onChange={handleChange}>
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