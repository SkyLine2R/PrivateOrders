/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-unused-vars */
import * as React from "react";
// import { useContext, useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import TextField from "@mui/material/TextField";
import { textСorrectionInField, liveFilter } from "../slice";
// import itemsDB from "../../../components/items-db_schema.js";
// import "./../edit-vendor-code-dialog/edit-vendor-code-dialog.js";
// import * as constant from "../edit-vendor-code-dialog/edit-vendor-code-dialog.js";

export default function FieldForInput(props) {
  const dispatch = useDispatch();
  console.log(props);

  // Убираем "запрещённые" символы и обрезаем строку
  /*   const textСorrectionInField = (refObj, fieldValue) =>
    fieldValue
      .replace("ё", "е")
      .replace("Ё", "Е")
      .replace(new RegExp(`[^${refObj.regularExp}]`, "gi"), "")
      .substring(0, refObj.maxlength); */
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
        // value={}
        variant="outlined"
        onChange={(event) => {
          dispatch(textСorrectionInField(event.target.value));
        }}
      >
        qwe
      </TextField>
    </Box>
  );
}

FieldForInput.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

// export default React.memo(FieldForInput);

/* 

import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";

const filter = createFilterOptions();

export default function FreeSoloCreateOption() {
  const [value, setValue] = React.useState(null);

  return (
    <Autocomplete
      value={value}
      onChange={(event, newValue) => {
        if (typeof newValue === "string") {
          setValue({
            title: newValue,
          });
        } else if (newValue && newValue.inputValue) {
          // Create a new value from the user input
          setValue({
            title: newValue.inputValue,
          });
        } else {
          setValue(newValue);
        }
      }}
      filterOptions={(options, params) => {
        const filtered = filter(options, params);

        const { inputValue } = params;
        // Suggest the creation of a new value
        const isExisting = options.some(
          (option) => inputValue === option.title
        );
        if (inputValue !== "" && !isExisting) {
          filtered.push({
            inputValue,
            title: `Add "${inputValue}"`,
          });
        }

        return filtered;
      }}
      selectOnFocus
      clearOnBlur
      handleHomeEndKeys
      id="free-solo-with-text-demo"
      options={top100Films}
      getOptionLabel={(option) => {
        // Value selected with enter, right from the input
        if (typeof option === "string") {
          return option;
        }
        // Add "xxx" option created dynamically
        if (option.inputValue) {
          return option.inputValue;
        }
        // Regular option
        return option.title;
      }}
      renderOption={(props, option) => <li {...props}>{option.title}</li>}
      sx={{ width: 300 }}
      freeSolo
      renderInput={(params) => (
        <TextField {...params} label="Free solo with text demo" />
      )}
    />
  );
}

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const top100Films = [
  { title: "The Shawshank Redemption", year: 1994 },
  { title: "The Godfather", year: 1972 },
  { title: "The Godfather: Part II", year: 1974 },
  { title: "The Dark Knight", year: 2008 },
  { title: "12 Angry Men", year: 1957 },
  { title: "Schindler's List", year: 1993 },
  { title: "Pulp Fiction", year: 1994 },
  {
    title: "The Lord of the Rings: The Return of the King",
    year: 2003,
  },
];
 */
