/* eslint-disable react/prop-types */
import * as React from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function MultipleSelectCheckmarks({
  label,
  names,
  selectName,
  handleChange,
}) {
  return (
    <div>
      <FormControl sx={{ mt: 1, width: "100%" }}>
        <InputLabel id="multiple-checkbox-label">{label}</InputLabel>
        <Select
          sx={{ width: "100%" }}
          labelId="multiple-checkbox-label"
          id="multiple-checkbox"
          multiple
          value={selectName}
          onChange={handleChange}
          input={<OutlinedInput label={label} />}
          renderValue={(selected) =>
            selected.map((item) => item.label).join(", ")
          }
          MenuProps={MenuProps}
        >
          {names.map((item) => (
            <MenuItem key={item.name} value={item}>
              <Checkbox checked={selectName.indexOf(item) > -1} />
              <ListItemText primary={item.label} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
