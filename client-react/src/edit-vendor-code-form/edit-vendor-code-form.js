import * as React from "react";
import FormGroup from "@mui/material/FormGroup";
import Grid from "@mui/material/Unstable_Grid2";
import { useSelector, useDispatch } from "react-redux";
import SelectItemUnit from "../unit-input/unit-input";
import FieldForInput from "../field-for-input/field-for-input";
import { fetchVendorCodes } from "../Store/slice";

export default function EditVendorCodeForm() {
  const dispatch = useDispatch();
  const state = useSelector((myState) => myState);

  // при изменении артикула или наименования - запрос на сервер
  React.useEffect(
    () => dispatch(fetchVendorCodes()),
    [dispatch, state.vendorCode, state.itemName]
  );

  return (
    <FormGroup>
      <Grid container spacing={2}>
        <Grid xs={4}>
          <FieldForInput id="vendorCode" label="Артикул" />
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
