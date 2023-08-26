/* eslint-disable no-nested-ternary */
/* eslint-disable react/prop-types */
import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import InputAdornment from "@mui/material/InputAdornment";

import Grid from "@mui/material/Unstable_Grid2";
import { useSelector, useDispatch } from "react-redux";

import FieldForInput from "../base-elements/field-for-input";
import SelectItemProperties from "../base-elements/select-item-properties";
import TitleDialog from "../base-elements/dialog-title";
import fetchEntries from "../Store/fetchEntries";
import { changeValue } from "../Store/Slices/slice-inStock";
import dbSchema from "../../../components/db_schema_for_testing/db_schema-in-out-stock";

export default function AddMaterialDialog({
  menuEditType,
  handleAddNewItem,
  handleEditItem,
  modalWindowIsOpen,
  handleClickOpenClose,
}) {
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (modalWindowIsOpen) {
      dispatch(fetchEntries({ api: "colors" }));
    }
  }, [dispatch, modalWindowIsOpen]);

  const colors = useSelector((store) => store.colors.catalog);
  const units = useSelector((store) => store.units.catalog);

  const colorsForSelect = colors.map(({ id, name }) => ({ id, name }));
  colorsForSelect.unshift({ id: 0, name: "Без цвета" });

  const colorId =
    useSelector((store) => store.inStock.inputFields.stockColor) ?? 0;

  const { vendorCode, vendorCodeName, vendorCodeUnit, vendorCodeQuantity } =
    useSelector((store) => store.inStock.inputFields);

  const { stockAmount, stockAmountInUnit, notes } = useSelector(
    (store) => store.inStock.inputFields
  );

  const unitsForFields = units.find((item) => item.id === vendorCodeUnit);

  /*   const {
    vendorCode,
    vendorCodeName,
    vendorCodeUnit,
    vendorCodeQuantity,
    notes,
  } = useSelector((state) => state.inStock.inputFields); */

  // подумать чтобы включить в тултипы наборы цветов с этого склада,
  // наборы цифровых значений кратных единицам
  /*   const handleAddToolTip = (e) => {
    dispatch(addTooltip(e.target.value));
  }; */

  return (
    <div>
      <Dialog
        fullWidth
        maxWidth="md"
        open={modalWindowIsOpen}
        onClose={handleClickOpenClose}
      >
        <Grid>
          <TitleDialog
            menuEditType={menuEditType}
            titleNew="Добавить позицию"
            titleEdit="Изменить позицию"
          />
          <DialogContent>
            <Grid container spacing={2} sx={{ pt: 2 }}>
              <Grid xs={3}>
                <FieldForInput
                  id="vendorCode"
                  label="Артикул"
                  value={vendorCode}
                  dbSchema={false}
                  variant="filled"
                />
              </Grid>

              <Grid xs={5}>
                <FieldForInput
                  id="vendorCodeName"
                  label="Название"
                  value={vendorCodeName}
                  dbSchema={false}
                  variant="filled"
                />
              </Grid>
              <Grid xs={2}>
                <FieldForInput
                  id="vendorCodeQuantity"
                  label="Кол-во в ед."
                  value={vendorCodeQuantity}
                  dbSchema={false}
                  variant="filled"
                />
              </Grid>
              <Grid xs={2}>
                <FieldForInput
                  id="vendorCodeUnit"
                  label="Ед. изм."
                  value={unitsForFields?.name}
                  dbSchema={false}
                  variant="filled"
                />
              </Grid>
            </Grid>
            <Grid container spacing={2} sx={{ pt: 5 }}>
              <Grid xs={3}>
                <SelectItemProperties
                  id="stockColor"
                  label="Цвет"
                  changeValue={changeValue}
                  selectValues={colorsForSelect}
                  value={colorId}
                />
              </Grid>
              <Grid xs={4.5}>
                <FieldForInput
                  id="stockAmount"
                  label="Кол-во"
                  type="number"
                  changeValue={changeValue}
                  value={stockAmount}
                  dbSchema={dbSchema}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        {unitsForFields?.notes.split(" / ")[0]}:
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid xs={4.5}>
                <FieldForInput
                  id="stockAmountInUnit"
                  label="Кол-во"
                  type="number"
                  changeValue={changeValue}
                  value={stockAmountInUnit}
                  dbSchema={dbSchema}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        {unitsForFields?.notes.split(" / ")[1]}:
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
            </Grid>
            <Grid sx={{ mt: 2 }}>
              <FieldForInput
                id="notes"
                label="Примечания"
                changeValue={changeValue}
                value={notes}
                dbSchema={dbSchema}
              />
            </Grid>
            {/*             <Grid sx={{ pt: 2 }} onClick={handleAddToolTip}>
              {arrowTooltip.map(({ id, tooltip, value }) => (
                <ArrowTooltip
                  id={id}
                  key={id}
                  tooltip={tooltip}
                  value={value}
                />
              ))}
            </Grid> */}
          </DialogContent>
          <DialogActions sx={{ pr: 2 }}>
            <Button onClick={handleClickOpenClose}>Отмена</Button>
            {menuEditType === "add" ? (
              <Button onClick={handleAddNewItem}>Добавить</Button>
            ) : (
              <Button onClick={handleEditItem}>Сохранить изменения</Button>
            )}
          </DialogActions>
        </Grid>
      </Dialog>
    </div>
  );
}
