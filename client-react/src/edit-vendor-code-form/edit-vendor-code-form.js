import * as React from "react";
import FormGroup from "@mui/material/FormGroup";
import Grid from "@mui/material/Unstable_Grid2";
import { useSelector, useDispatch, shallowEqual } from "react-redux";

import SelectItemUnit from "../unit-input/unit-input";
import FieldForInput from "../field-for-input/field-for-input";

import fetchVendorCodes from "../Store/fetchVendorCodes";
import { changeValue } from "../Store/Slices/slice-vendor-codes";

import testFormForInputItem from "../../../components/items-db_schema";

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

  // Убираем "запрещённые" символы и обрезаем строку по регулярке из items-db-schema
  const textСorrectionInField = (refObj, fieldValue) => {
    const str = fieldValue.match(new RegExp(refObj.regularExp, "gi")) || [""];
    return (
      refObj.containsNumber ? str[0].replace(",", ".") : str[0]
    ).substring(0, refObj.maxlength);
  };

  const onChangeVal = ({ target }) => {
    const { value, id } = target;
    dispatch(
      changeValue({
        value: textСorrectionInField(testFormForInputItem[id], value),
        fieldId: id,
      })
    );
  };

  return (
    <FormGroup>
      <Grid container spacing={2}>
        <Grid xs={4}>
          <FieldForInput
            id="vendorCode"
            label="Артикул"
            onChangeVal={onChangeVal}
            value={vendorCode}
          />
        </Grid>
        <Grid xs={8}>
          <FieldForInput
            id="itemName"
            label="Наименование"
            onChangeVal={onChangeVal}
            value={itemName}
          />
        </Grid>
        <Grid xs={2.5}>
          <SelectItemUnit id="unit" label="Единицы измерения" />
        </Grid>
        <Grid xs={3}>
          <FieldForInput
            id="quantity"
            label="Кол-во ед. в хл. | уп."
            onChangeVal={onChangeVal}
            value={quantity}
          />
        </Grid>
        <Grid xs={6.5}>
          <FieldForInput
            id="notes"
            label="Примечания"
            onChangeVal={onChangeVal}
            value={notes}
          />
        </Grid>
      </Grid>
    </FormGroup>
  );
}
