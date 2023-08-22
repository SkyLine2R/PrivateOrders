/* eslint-disable react/prop-types */
import * as React from "react";
import FormGroup from "@mui/material/FormGroup";
import Grid from "@mui/material/Unstable_Grid2";
import { useSelector, shallowEqual } from "react-redux";

import SelectItemProperties from "../base-elements/select-item-properties";
import FieldForInput from "../base-elements/field-for-input";

import { changeValue } from "../Store/Slices/slice-vendor-codes";

export default function EditVendorCodeForm({ dbSchema }) {
  const units = useSelector((store) => store.units.catalog);
  const unitsForSelect = units.map(({ id, name }) => ({ id, name }));

  const { vendorCode, name, quantity, notes, unit } = useSelector(
    ({ vendorCodes }) => vendorCodes.inputFields,
    shallowEqual
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
            id="name"
            label="Наименование"
            changeValue={changeValue}
            value={name}
            dbSchema={dbSchema}
          />
        </Grid>
        <Grid xs={2.5}>
          <SelectItemProperties
            id="unit"
            label="Единицы измерения"
            changeValue={changeValue}
            selectValues={unitsForSelect}
            value={unit}
          />
        </Grid>
        <Grid xs={3}>
          <FieldForInput
            id="quantity"
            label="Кол-во ед. в хл. | уп."
            changeValue={changeValue}
            value={quantity}
            type="number"
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
