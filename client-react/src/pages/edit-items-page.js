/* eslint-disable react/prop-types */
import * as React from "react";
import { useRef } from "react";

import Container from "@mui/material/Container";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import DataGrid from "../base-elements/data-grid-table";
import SpeedDialMenu from "../menus/menu-speed-dial";
import sendNewEntryToDB from "../Store/sendNewEntryToDB";
import sendChangedEntryToDB from "../Store/sendChangedEntryToDB";
import fetchEntries from "../Store/fetchEntries";

import { setModalWindowIsOpen as setAlertWindowIsOpen } from "../Store/Slices/slice-alert-dialog";

export default function EditItemsPage({
  page,
  headerText,
  HeaderIcon,
  setModalWindowIsOpen,
  allMenuActions,
  EditDialog,
  tableSchema,
  dbSchema,
}) {
  const dispatch = useDispatch();

  React.useEffect(() => dispatch(fetchEntries(page)), [dispatch, page]);

  const menuEditType = useRef(null);

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
    e.stopPropagation();
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
    menuEditType.current = pressedButton;

    const params = menuParams.id
      ? catalog.find((item) => item.id === menuParams.id)
      : null;

    switch (pressedButton) {
      case "new":
        return dispatch(setModalWindowIsOpen());
      case "edit":
        return dispatch(setModalWindowIsOpen(params));
      case "delete":
        return dispatch(
          setAlertWindowIsOpen({
            questions: `Вы действительно хотите удалить запись
            "${params.name}"? Это действие нельзя будет отменить.`,
            id: params.id,
            api: page,
          })
        );
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
      case "openForFill":
        // eslint-disable-next-line no-alert
        return alert("in production");
      default:
        return "";
    }
  };

  const handleClickOpenClose = () => {
    dispatch(setModalWindowIsOpen(menuEditType.current));
  };

  const handleAddNewItem = () => {
    dispatch(sendNewEntryToDB({ dbSchema, api: page }));
  };

  const handleEditItem = () => {
    const sendObj = {
      dbSchema: { ...dbSchema, id: null },
      api: page,
      type: menuEditType.current,
    };
    // Удалить поля которые не нужно проверять и отправлять
    if (page === "users" && menuEditType.current !== "changePass")
      delete sendObj.dbSchema.pass;
    // delete sendObj.dbSchema.createdAt; - возможно уже не нужно
    dispatch(sendChangedEntryToDB(sendObj));
  };

  return (
    <Container
      maxWidth="md"
      sx={{ margin: "20px auto" }}
      onClick={handleMenuInContainer}
    >
      {/*       <AlertDialogSlide
        open={openAlert}
        questions="Вы уверены, что хотите удалить запись? Это действие нельзя будет отменить."
      /> */}
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
          menuEditType={menuEditType.current}
          handleClickOpenClose={handleClickOpenClose}
          handleAddNewItem={handleAddNewItem}
          handleEditItem={handleEditItem}
          modalWindowIsOpen={modalWindowIsOpen}
          tableSchema={tableSchema}
          dbSchema={dbSchema}
          catalog={catalog}
        />
      ) : (
        <SpeedDialMenu
          menuParams={menuParams}
          onClick={handleMenuSelect}
          onMouseLeave={handleOffMenu}
        />
      )}
      <DataGrid
        tableSchema={tableSchema}
        catalog={catalog}
        onCellClick={handleMenuInDataGrid}
      />
    </Container>
  );
}
