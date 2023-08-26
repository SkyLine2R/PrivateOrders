/* eslint-disable no-nested-ternary */
/* eslint-disable react/prop-types */
import * as React from "react";
import { useRef } from "react";

import Container from "@mui/material/Container";
import { useSelector, useDispatch } from "react-redux";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import DataGrid from "../base-elements/data-grid-table";
import SpeedDialMenu from "../menus/menu-speed-dial";
import sendEntryToDB from "../Store/sendEntryToDB";
import fetchEntries from "../Store/fetchEntries";

import { setModalWindowIsOpen as setAlertWindowIsOpen } from "../Store/Slices/slice-alert-dialog";
import { setModalWindowIsOpen as setAdditionWindowIsOpen } from "../Store/Slices/slice-inStock";
import { setWarningSnack } from "../Store/Slices/slice-snackbar";

export default function EditItemsPage({
  page,
  headerText,
  HeaderIcon,
  setModalWindowIsOpen,
  openForFill,
  allMenuActions,
  EditDialog,
  tableSchema,
  dbSchema,
}) {
  const dispatch = useDispatch();

  const modalWindowIsOpen = useSelector(
    (store) => store[page].modalWindowIsOpen
  );

  const alertModalWindowIsOpen = useSelector(
    (store) => store.alert.modalWindowIsOpen
  );

  const request = useSelector((store) => store[page].request);
  const loading = request.status === "loading";

  const currentId = useSelector((store) => store.customers.currentId);
  const unitsForSelect = useSelector((store) => store.units.catalog);

  const catalog = useSelector((store) => store[page].catalog);
  const openedTab = useSelector((store) => store[page].opened);
  /*   const docFirs = `documents${page[0].toUpperCase() + page.slice(1)}`;
  console.log(docFirs);

  const activeTab = useSelector((store) => store?.[docFirs]?.activeTab); */
  /*   if (page==='inStock' || page==='outStock') {

  } */

  React.useEffect(() => {
    if (!modalWindowIsOpen && !alertModalWindowIsOpen) {
      dispatch(fetchEntries({ api: page }));
    }
  }, [dispatch, page, modalWindowIsOpen, currentId, alertModalWindowIsOpen]);

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

    const pressedButton =
      e.target.closest("button").getAttribute("pressed-button") ?? "closeClick";

    handleOffMenu();
    menuEditType.current = pressedButton;

    const params = menuParams.id
      ? { ...catalog.find((item) => item.id === menuParams.id) }
      : null;

    if (params?.unit)
      params.unit = unitsForSelect.find(({ name }) => name === params.unit).id;

    switch (pressedButton) {
      case "add":
        return dispatch(setModalWindowIsOpen());
      case "edit":
        return dispatch(setModalWindowIsOpen(params));
      case "del":
        return page === "customers" && +params.id === +currentId // при попытке удалить активный склад
          ? dispatch(setWarningSnack("Невозможно удалить текущий склад."))
          : (page === "documentsInStock" || page === "documentsOutStock") &&
            openedTab.find((item) => +item === +params.id) // при попытке удалить открытый документ
          ? dispatch(
              setWarningSnack("Перед удалением закройте вкладку документа")
            )
          : dispatch(
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
      case "openForFill": // открыть документ для заполнения
        return dispatch(openForFill(params));
      case "closeClick": // клик по закрытию меню (используется для открытия дополнительного модального окна)
        if (!params?.id || !setModalWindowIsOpen) return null;
        return dispatch(setAdditionWindowIsOpen(params));
      default:
        return null;
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
          menuEditType={menuEditType.current ?? "add"}
          handleClickOpenClose={handleClickOpenClose}
          handleAddNewItem={handleAddNewItem}
          handleEditItem={handleEditItem}
          modalWindowIsOpen={modalWindowIsOpen}
          tableSchema={tableSchema}
          dbSchema={dbSchema}
          catalog={catalog}
          page={page}
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
