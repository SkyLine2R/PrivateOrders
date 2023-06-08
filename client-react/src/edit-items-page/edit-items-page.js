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

    setMenuEditType(pressedButton);

    if (pressedButton === "delete") return alert("Функция в разработке");
    if (pressedButton === "edit")
      return dispatch(
        setModalWindowOpen(dataArr.find((item) => item.id === menuParams.id))
      );
    dispatch(setModalWindowOpen());
    return handleOffMenu();
  };

  /*   const handleSendChangeItem = () => {
    dispatch(
      sendChangedEntryToDB({
        dbSchema: { ...dbSchema, id: null },
        api: "vendorCodes",
        type: "edit",
      })
    );
  }; */

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
        <EditDialog menuEditType={menuEditType} itemId={menuParams.id} />
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
