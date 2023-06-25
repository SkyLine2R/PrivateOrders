/* eslint-disable react/prop-types */
import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useDispatch } from "react-redux";

export default function DialogSelect({
  titleSelect,
  titleDialog,
  catalog,
  setCurrent,
  icon,
}) {
  const dispatch = useDispatch();

  const [open, setOpen] = React.useState(false);
  const [selectedMenu, setSelectedMenu] = React.useState({
    id: null,
    name: "",
  });

  const handleSelect = (event) => {
    const id = +event.target.value;
    const { name } = catalog.find((item) => +item.id === id);
    setSelectedMenu({ id, name });
  };

  const handleChange = () => {
    dispatch(setCurrent(selectedMenu.id));
    setOpen(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason !== "backdropClick") {
      setOpen(false);
    }
  };

  return (
    <div>
      <Button
        sx={{ marginRight: "50px" }}
        color="inherit"
        onClick={handleClickOpen}
      >
        {icon}
        {selectedMenu.name || titleSelect}
      </Button>
      <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
        <DialogTitle>{titleDialog}</DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ display: "flex", flexWrap: "wrap" }}>
            <FormControl sx={{ m: 1, minWidth: 450 }}>
              <InputLabel id="dialog-select-label">Заказчик</InputLabel>
              <Select
                labelId="dialog-select-label"
                id="dialog-select"
                value={selectedMenu.id || ""}
                onChange={handleSelect}
                input={<OutlinedInput label="Заказчик" />}
              >
                {catalog.map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.notes ? `${item.name} // ${item.notes}` : item.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Отмена</Button>
          <Button onClick={handleChange}>Выбрать</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
