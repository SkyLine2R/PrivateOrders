import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const unitForInput = [
  { value: 1, label: "м / хл." },
  { value: 2, label: "шт. / уп." },
  { value: 3, label: "м / уп." },
];

export default function SelectItemUnit(props) {
  const [unit, setUnit] = React.useState("");

  /*   const RenderInput = function () {
    return unitForInput.map(
      (item) => <MenuItem value={item.value}>{item.label}</MenuItem>,
      ""
    );
  }; */

  function RenderInput() {
    return <MenuItem value={5}>{55}</MenuItem>;
  }

  console.log(RenderInput);
  const handleChange = (event) => {
    setUnit(event.target.value);
  };

  return (
    <Box sx={{ mt: 1, width: "auto", minWidth: "100%" }}>
      <FormControl fullWidth>
        <InputLabel id={props.id}>{props.label}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={unit}
          label={props.label}
          onChange={handleChange}
        >
          {RenderInput}
        </Select>
      </FormControl>
    </Box>
  );
}

/*{           <MenuItem value={1}>Ten</MenuItem>
          <MenuItem value={2}>Twenty</MenuItem>
          <MenuItem value={3}>Thirty</MenuItem>
        </Select> }*/

/* {renderInput=(params) => {<TextField {...params} label={props.label}} */
/* import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete"; */

/* export default function SelectItemUnit(props) {
  return (
    <Autocomplete
      id={props.id}
      disablePortal
      options={unitForInput}
      sx={{ mt: 1, width: "auto", minWidth: "100%" }}
      renderInput={(params) => <TextField {...params} label={props.label} />}
    />
  );
}

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const unitForInput = [
  { label: "м / хл." },
  { label: "шт. / уп." },
  { label: "м / уп." },
];
 */
