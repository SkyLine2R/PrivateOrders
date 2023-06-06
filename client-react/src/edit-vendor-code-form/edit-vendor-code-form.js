import * as React from "react";
import FormGroup from "@mui/material/FormGroup";
import Grid from "@mui/material/Unstable_Grid2";
import { useSelector, useDispatch, shallowEqual } from "react-redux";

import SelectItemUnit from "../unit-input/unit-input";
import FieldForInput from "../field-for-input/field-for-input";

import fetchVendorCodes from "../Store/fetchVendorCodes";
import { changeValue } from "../Store/Slices/slice-vendor-codes";

import dbSchema from "../../../components/vendor-codes-db_schema";

export default function EditVendorCodeForm() {
  const dispatch = useDispatch();

  const { vendorCode, itemName, quantity, notes } = useSelector(
    ({ vendorCodes }) => vendorCodes.inputFields,
    shallowEqual
  );

  // при изменении артикула или наименования - запрос на сервер
  React.useEffect(
    () => dispatch(fetchVendorCodes()),
    [dispatch, vendorCode, itemName]
  );

  return (
    <FormGroup>
      <Grid container spacing={2}>
        <Grid xs={4}>
          <FieldForInput
            id="vendorCode"
            label="Артикул"
            changeValue={changeValue}
            value={vendorCode}
            dbSchema={dbSchema}
          />
        </Grid>
        <Grid xs={8}>
          <FieldForInput
            id="itemName"
            label="Наименование"
            changeValue={changeValue}
            value={itemName}
            dbSchema={dbSchema}
          />
        </Grid>
        <Grid xs={2.5}>
          <SelectItemUnit id="unit" label="Единицы измерения" />
        </Grid>
        <Grid xs={3}>
          <FieldForInput
            id="quantity"
            label="Кол-во ед. в хл. | уп."
            changeValue={changeValue}
            value={quantity}
            dbSchema={dbSchema}
          />
        </Grid>
        <Grid xs={6.5}>
          <FieldForInput
            id="notes"
            label="Примечания"
            changeValue={changeValue}
            value={notes}
            dbSchema={dbSchema}
          />
        </Grid>
      </Grid>
    </FormGroup>
  );
}
