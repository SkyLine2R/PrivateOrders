import * as React from "react";
import FormGroup from "@mui/material/FormGroup";
import Grid from "@mui/material/Unstable_Grid2";
import SelectItemUnit from "../unit-input/unit-input.js";
import FieldForInput from "../field-for-input/field-for-input.js";

export default function EditVendorCodeForm(props) {
  return (
    <FormGroup>
      <Grid container spacing={2}>
        <Grid xs={4}>
          {props.vendorCodeInput}
          {/*           <FieldForInput id="vendorCode" label="Артикул" val={props.counter} />
           */}{" "}
        </Grid>
        <Grid xs={8}>
          <FieldForInput id="itemName" label="Наименование" />
        </Grid>
        <Grid xs={2.5}>
          <SelectItemUnit id="unit" label="Единицы измерения" />
        </Grid>
        <Grid xs={3}>
          <FieldForInput id="quantity" label="Кол-во ед. в хл. | уп." />
        </Grid>
        <Grid xs={6.5}>
          <FieldForInput id="notes" label="Примечания" />
        </Grid>
      </Grid>
    </FormGroup>
  );
}
