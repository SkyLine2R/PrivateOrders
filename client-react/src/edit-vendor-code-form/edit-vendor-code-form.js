import * as React from "react";
import FormGroup from "@mui/material/FormGroup";
import Grid from "@mui/material/Unstable_Grid2";
import UnitInputField from "../unit-input/unit-input.js";
import BasicTextFields from "../field-for-input/field-for-input.js";

export default function EditVendorCodeForm() {
  return (
    <FormGroup>
      <Grid container spacing={2}>
        <Grid xs={4}>
          <BasicTextFields label="Артикул" />
        </Grid>
        <Grid xs={8}>
          <BasicTextFields label="Наименование" />
        </Grid>
        <Grid xs={3}>
          <UnitInputField />
        </Grid>
        <Grid xs={3}>
          <BasicTextFields label="Кол-во ед. в хл. | уп." />
        </Grid>
        <Grid xs={6}>
          <BasicTextFields label="Примечания" />
        </Grid>
      </Grid>
    </FormGroup>
  );
}
