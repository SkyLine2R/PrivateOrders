import * as React from "react";
import Grid from "@mui/material/Unstable_Grid2";

import FieldForInput from "../base-elements/field-for-input";
import MultipleSelectCheckmarks from "../base-elements/multiple-select-checkmarks";

/* const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
}; */

export default function QuickSearchVendorsAndMatetials() {
  const [personName, setPersonName] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  return (
    <Grid container spacing={2}>
      <Grid xs={5}>
        <MultipleSelectCheckmarks
          label="Поля для поиска"
          names={["артикул", "наименование", "примечания", "цвет"]}
        />
      </Grid>
      <Grid xs={7}>
        <FieldForInput
          id="quickSearch"
          label="Быстрый поиск"
          /*           changeValue={changeValue}
          value={vendorCode}
          dbSchema={dbSchema} */
        />
      </Grid>
    </Grid>
  );
}
