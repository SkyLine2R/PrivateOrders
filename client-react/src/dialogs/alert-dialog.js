/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
/* eslint-disable prefer-arrow-callback */
import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { selectOk } from "../Store/Slices/slice-alert-dialog";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

// eslint-disable-next-line no-unused-vars
export default function AlertDialogSlide(/* {
  title = "Предупреждение",
  questions,
  buttonOk = "Удалить",
  buttonCancel = "Отмена",
  modalWindowIsOpen,
} */) {
  // const [open, setOpen] = React.useState(true);

  const { title, questions, modalWindowIsOpen, buttonOk, buttonCancel, actn } =
    useSelector((state) => state.alert);

  // eslint-disable-next-line no-unused-vars
  const handleOk = () => {
    action();
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        open={modalWindowIsOpen}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog"
      >
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {questions}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleOk}>{buttonOk}</Button>
          <Button onClick={handleClose}>{buttonCancel}</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
