import * as React from "react";
import Grid from "@mui/material/Unstable_Grid2";

import FieldForInput from "../base-elements/field-for-input";
import MultipleSelectCheckmarks from "../base-elements/multiple-select-checkmarks";

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
    <Grid
      container
      spacing={2}
      sx={{
        m: "4px 0",
      }}
    >
      <Grid xs={3}>
        <MultipleSelectCheckmarks
          label="Искать в"
          names={["Номенклатуре", "Материале"]}
        />
      </Grid>
      <Grid xs={3}>
        <MultipleSelectCheckmarks
          label="Поля для поиска"
          names={["Артикул", "Наименование", "Примечания"]}
        />
      </Grid>
      <Grid xs={6}>
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
