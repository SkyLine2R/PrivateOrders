/* eslint-disable no-nested-ternary */
/* eslint-disable react/prop-types */
import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Grid from "@mui/material/Unstable_Grid2";
import PostAddIcon from "@mui/icons-material/PostAdd";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import { useSelector, useDispatch } from "react-redux";

import FieldForInput from "../base-elements/field-for-input";
import SelectItemProperties from "../base-elements/select-item-properties";
import TitleDialog from "../base-elements/dialog-title";
/* import {
  changeValue,
  addTooltip,
} from "../Store/Slices/slice-instock-documents"; */
// только скопирован - переделать весь
export default function AddMaterialDialog({
  menuEditType = "add",
  handleClickOpenClose,
  handleAddNewItem,
  handleEditItem,
  modalWindowIsOpen,
  dbSchema,
}) {
  const dispatch = useDispatch();
  const colors = useSelector((store) => store.colors.catalog);
  const colorsForSelect = colors.map(({ id, name }) => ({ id, name }));

  const { id, number, name, notes } = useSelector(
    (state) => state.inStock.inputFields
  );
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
            IconNew={PostAddIcon}
            IconEdit={DriveFileRenameOutlineIcon}
            titleNew="Добавить материал"
            titleEdit="Изменить реквизиты"
          />
          <DialogContent>
            <Grid container spacing={2} sx={{ pt: 2 }}>
              <Grid xs={3}>
                <FieldForInput
                  id="name"
                  label="Артикул"
                  value="321640"
                  dbSchema={false}
                  variant="filled"
                />
              </Grid>

              <Grid xs={5}>
                <FieldForInput
                  id="name"
                  label="Название"
                  value="Алюминиевый профиль, закладная 6800"
                  dbSchema={false}
                  variant="filled"
                />
              </Grid>
              <Grid xs={2}>
                <FieldForInput
                  id="name"
                  label="Кол-во в ед."
                  value="6800"
                  dbSchema={false}
                  variant="filled"
                />
              </Grid>
              <Grid xs={2}>
                <FieldForInput
                  id="name"
                  label="Ед. изм."
                  value="м / хл."
                  dbSchema={false}
                  variant="filled"
                />
              </Grid>
            </Grid>
            <Grid container spacing={2} sx={{ pt: 5 }}>
              <Grid xs={2.5}>
                <SelectItemProperties
                  id="color"
                  label="Цвет"
                  selectValues={["RAL7040 matt"]} /* {unitsForSelect} */
                  value="RAL7040 matt"
                />
              </Grid>
              <Grid xs={2.5}>
                <FieldForInput
                  id="number"
                  label="метры"
                  type="number"
                  /*                   changeValue={changeValue}
                   */ value="680"
                  dbSchema={dbSchema}
                />
              </Grid>
              <Grid xs={2.5}>
                <FieldForInput
                  id="number"
                  label="хлысты"
                  type="number"
                  /*                   changeValue={changeValue}
                   */ value="100"
                  dbSchema={dbSchema}
                />
              </Grid>
              <Grid xs={4.5}>
                <FieldForInput
                  id="notes"
                  label="Примечания"
                  /*                 changeValue={changeValue}
                   */ value={notes}
                  dbSchema={dbSchema}
                />
              </Grid>
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
