import * as React from "react";
import FormGroup from "@mui/material/FormGroup";
import Grid from "@mui/material/Unstable_Grid2";
import SelectItemUnit from "../unit-input/unit-input.js";
import FieldForInput from "../field-for-input/field-for-input.js";

export default function EditVendorCodeForm() {
  return (
    <FormGroup>
      <Grid container spacing={2}>
        <Grid xs={4}>
          <FieldForInput id="inputVendorCode" label="Артикул" />
        </Grid>
        <Grid xs={8}>
          <FieldForInput id="inputItemName" label="Наименование" />
        </Grid>
        <Grid xs={3}>
          <SelectItemUnit id="selectItemUnit" label="Единицы измерения" />
        </Grid>
        <Grid xs={3}>
          <FieldForInput
            id="selectItemQuantity"
            label="Кол-во ед. в хл. | уп."
          />
        </Grid>
        <Grid xs={6}>
          <FieldForInput id="selectItemNotes" label="Примечания" />
        </Grid>
      </Grid>
    </FormGroup>
  );
}
