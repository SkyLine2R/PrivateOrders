/* eslint-disable react/prop-types */
import * as React from "react";
import Container from "@mui/material/Container";
import { useSelector, useDispatch } from "react-redux";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import DataGrid from "../data-grid-table/data-grid-table";
import SpeedDialMenu from "../speed-dial-menu/speed-dial-menu";
import sendChangedEntryToDB from "../Store/sendChangedEntryToDB";
import fetchEntries from "../Store/fetchEntries";

export default function EditItemsPage({
  headerText,
  HeaderIcon,
  EditDialog,
  modalWindowOpen,
  dataArr,
  allMenuActions,
  dbSchema,
  setModalWindowOpen,
}) {
  const dispatch = useDispatch();

  const [menuEditType, setMenuEditType] = React.useState("");
  const [menuParams, setMenuParams] = React.useState({
    x: 0,
    y: 0,
    hidden: true,
    actions: [],
    id: "",
  });

  const handleMenuInDataGrid = ({ id }, e) => {
    if (!modalWindowOpen) {
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
    if (!modalWindowOpen) {
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

    dispatch(setModalWindowOpen());

    /* 
    console.log(pressedButton);
    switch (pressedButton) {
      case "addUser":
        dispatch(setModalWindowOpen());
        break;
      case "editUser":
        dispatch(setUserEditData(userData));
        dispatch(setModalWindowOpen());
        break;
      case "changePass":
        dispatch(setUserEditData(userData));
        dispatch(setModalWindowOpen());
        break;
      case "disableUser":
        dispatch(setUserEditData({ ...userData, accessLevel: 1 }));
        dispatch(
          sendChangedEntryToDB({
            dbSchema: { id: null, accessLevel: dbSchema.accessLevel },
            api: "users",
            type: "disableUser",
          })
        );
        break;
      default:
        console.log("nothin");
    } */
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
      {modalWindowOpen ? (
        <EditDialog menuEditType={menuEditType} userId={menuParams.id} />
      ) : (
        <SpeedDialMenu
          menuParams={menuParams}
          onClick={handleMenuSelect}
          onMouseLeave={handleOffMenu}
        />
      )}
      <DataGrid
        dbSchema={dbSchema}
        dataArr={dataArr}
        onCellClick={handleMenuInDataGrid}
      />
    </Container>
  );
}
