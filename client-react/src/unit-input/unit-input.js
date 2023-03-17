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
import { changeValue } from "../slice";

import { unit as arrWithUnit } from "../../../components/items-db_schema";

const unitForSelect = arrWithUnit.unitArr;

export default function SelectItemUnit(props) {
  const val = useSelector((state) => state[props.id]);
  const dispatch = useDispatch();

  const handleChange = (event) => {
    dispatch(
      changeValue({
        value: event.target.value,
        fieldId: props.id,
      })
    );
  };

  return (
    <Box sx={{ mt: 1, width: "auto", minWidth: "100%" }}>
      <FormControl fullWidth>
        <InputLabel id={props.id}>{props.label}</InputLabel>
        <Select value={val} label={props.label} onChange={handleChange}>
          {[
            unitForSelect.map((item, index) => (
              <MenuItem value={index}>{item}</MenuItem>
            )),
          ]}
        </Select>
      </FormControl>
    </Box>
  );
}
