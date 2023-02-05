import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

export default function ComboBox() {
  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={unitForInput}
      sx={{ mt: 1, width: "auto", minWidth: "100%" }}
      renderInput={(params) => (
        <TextField {...params} label="Единицы измерения" />
      )}
    />
  );
}

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const unitForInput = [
  { label: "м / хл." },
  { label: "шт. / уп." },
  { label: "м / уп." },
];
