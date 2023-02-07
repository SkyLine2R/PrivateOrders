import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const unitForInput = [
  { id: 1, label: "м / хл." },
  { id: 2, label: "шт. / уп." },
  { id: 3, label: "м / уп." },
];

export default function SelectItemUnit(props) {
  const [unit, setUnit] = React.useState("");

  const handleChange = (event) => {
    setUnit(event.target.value);
  };

  return (
    <Box sx={{ mt: 1, width: "auto", minWidth: "100%" }}>
      <FormControl fullWidth>
        <InputLabel id={props.id}>{props.label}</InputLabel>
        <Select value={unit || 1} label={props.label} onChange={handleChange}>
          {[
            unitForInput.map((item) => (
              <MenuItem value={item.id}>{item.label}</MenuItem>
            )),
          ]}
        </Select>
      </FormControl>
    </Box>
  );
}
