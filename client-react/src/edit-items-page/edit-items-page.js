/* eslint-disable react/prop-types */
import * as React from "react";
import Container from "@mui/material/Container";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import DataGrid from "../data-grid-table/data-grid-table";
import SpeedDialMenu from "../speed-dial-menu/speed-dial-menu";
import sendChangedEntryToDB from "../Store/sendChangedEntryToDB";
import fetchEntries from "../Store/fetchEntries";

export default function EditItemsPage({
  page,
  headerText,
  HeaderIcon,
  EditDialog,
  allMenuActions,
  dbSchema,
  setModalWindowIsOpen,
}) {
  const dispatch = useDispatch();

  React.useEffect(() => dispatch(fetchEntries(page)), [dispatch, page]);

  const [menuEditType, setMenuEditType] = React.useState("");
  const [menuParams, setMenuParams] = React.useState({
    x: 0,
    y: 0,
    hidden: true,
    actions: [],
    id: "",
  });
  const { catalog, modalWindowIsOpen } = useSelector(
    (state) => state[page],
    shallowEqual
  );

  const handleMenuInDataGrid = ({ id }, e) => {
    if (!modalWindowIsOpen) {
      e.stopPropagation();
      setMenuParams({
        x: e.clientX,
        y: e.clientY,
        hidden: false,
        actions: allMenuActions,
        id,
      });
    }
  };

  const handleMenuInContainer = (e) => {
    if (!modalWindowIsOpen) {
      setMenuParams({
        x: e.clientX,
        y: e.clientY,
        hidden: false,
        actions: [allMenuActions[allMenuActions.length - 1]],
        id: null,
      });
    }
  };

  const handleOffMenu = () => {
    setTimeout(
      () =>
        setMenuParams({
          x: 0,
          y: 0,
          hidden: true,
          actions: allMenuActions,
          id: null,
        }),
      300
    );
  };

  const handleMenuSelect = (e) => {
    e.stopPropagation();

    const pressedButton = e.target
      .closest("button")
      .getAttribute("pressed-button");

    handleOffMenu();
    setMenuEditType(pressedButton);

    const params = menuParams.id
      ? catalog.find((item) => item.id === menuParams.id)
      : null;

    switch (pressedButton) {
      case "add":
        return dispatch(setModalWindowIsOpen());
      case "edit":
        return dispatch(setModalWindowIsOpen(params));
      case "delete":
        return alert("Функция в разработке");
      case "changePass":
        return dispatch(setModalWindowIsOpen(params));
      case "disableUser":
        dispatch(setModalWindowIsOpen({ ...params, accessLevel: 1 }));
        dispatch(
          sendChangedEntryToDB({
            dbSchema: { id: null, accessLevel: dbSchema.accessLevel },
            api: "users",
            type: "disableUser",
          })
        );
        return dispatch(setModalWindowIsOpen());
      default:
        return "";
    }
  };

  const handleClickOpenClose = () => {
    dispatch(setModalWindowIsOpen());
  };

  return (
    <Container
      maxWidth="md"
      sx={{ margin: "20px auto" }}
      onClick={handleMenuInContainer}
    >
      <Box
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "flex-end",
          marginBottom: "15px",
        }}
      >
        <HeaderIcon fontSize="large" sx={{ color: "primary.dark" }} />
        <Typography variant="h5" sx={{ paddingLeft: "15px" }}>
          {headerText}
        </Typography>
      </Box>
      {modalWindowIsOpen ? (
        <EditDialog
          menuEditType={menuEditType}
          itemId={menuParams.id}
          handleClickOpenClose={handleClickOpenClose}
        />
      ) : (
        <SpeedDialMenu
          menuParams={menuParams}
          onClick={handleMenuSelect}
          onMouseLeave={handleOffMenu}
        />
      )}
      <DataGrid
        dbSchema={dbSchema}
        catalog={catalog}
        onCellClick={handleMenuInDataGrid}
      />
    </Container>
  );
}
