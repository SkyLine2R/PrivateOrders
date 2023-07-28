/* eslint-disable react/prop-types */
import * as React from "react";
import { useRef } from "react";

import Container from "@mui/material/Container";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import DataGrid from "../base-elements/data-grid-table";
import SpeedDialMenu from "../menus/menu-speed-dial";
import sendEntryToDB from "../Store/sendEntryToDB";
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

  const { catalog, modalWindowIsOpen, request } = useSelector(
    (state) => state[page],
    shallowEqual
  );
  const loading = request.status === "loading";

  const { currentId } = useSelector((state) => state.customers, shallowEqual);

  React.useEffect(
    () => dispatch(fetchEntries(page)),
    [dispatch, page, modalWindowIsOpen, currentId]
  );

  const menuEditType = useRef(null);

  const [menuParams, setMenuParams] = React.useState({
    x: 0,
    y: 0,
    hidden: true,
    actions: [],
    id: "",
  });

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
      case "add":
        return dispatch(setModalWindowIsOpen());
      case "edit":
        return dispatch(setModalWindowIsOpen(params));
      case "del":
        return dispatch(
          setAlertWindowIsOpen({
            questions: `Вы действительно хотите удалить запись
            "${params.name}"? Это действие нельзя будет отменить.`,
            id: params.id,
            api: page,
            type: pressedButton,
          })
        );
      case "changePass":
        return dispatch(setModalWindowIsOpen(params));
      case "disableUser":
        dispatch(setModalWindowIsOpen({ ...params, accessLevel: 1 }));
        dispatch(
          sendEntryToDB({
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
    dispatch(sendEntryToDB({ dbSchema, type: "add", api: page }));
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

    dispatch(sendEntryToDB(sendObj));
  };

  return (
    <Container sx={{ height: "100%" }} onClick={handleMenuInContainer}>
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-end",
          marginBottom: "5px",
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
        loading={loading}
        tableSchema={tableSchema}
        catalog={catalog}
        onCellClick={handleMenuInDataGrid}
      />
    </Container>
  );
}
