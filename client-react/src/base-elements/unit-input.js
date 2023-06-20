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

import { unit as arrWithUnit } from "../../../components/vendor-codes-db_schema";

const unitForSelect = arrWithUnit.unitArr;

export default function SelectItemUnit({ label, id }) {
  const val = useSelector(({ vendorCodes }) => vendorCodes.inputFields[id]);
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
        <Select value={val} label={label} onChange={handleChange}>
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
