/* eslint-disable no-unused-vars */
import * as React from "react";
import FormGroup from "@mui/material/FormGroup";
import Grid from "@mui/material/Unstable_Grid2";
import { useSelector, useDispatch } from "react-redux";
import SelectItemUnit from "../unit-input/unit-input";
import FieldForInput from "../field-for-input/field-for-input";
// import { textСorrectionInField, liveFilter } from "../slice";

export default function EditVendorCodeForm() {
  const vendorCode = useSelector((state) => state.vendorCode);
  const itemName = useSelector((state) => state.itemName);
  console.log("itemName " + itemName);
  // const dispatch = useDispatch();
  return (
    <FormGroup
    /* onClick={(e)=> console.log(e.target)} */
    /*       onChange={(event) => {
        console.log("event onChange in input field");
        console.log(event.target.value);
        dispatch(textСorrectionInField(event.target.value));
        // event.target.value = textСorrectionInField(
        // itemsDB[event.target.id],
        // event.target.value
        // );
      }} */
    >
      <Grid container spacing={2}>
        <Grid xs={4}>
          <FieldForInput id="vendorCode" label="Артикул" value={vendorCode} />
        </Grid>
        <Grid xs={8}>
          <FieldForInput id="itemName" label="Наименование" value={itemName} />
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
