import * as React from "react";
import EditIcon from "@mui/icons-material/Edit";
import { useSelector, useDispatch, shallowEqual } from "react-redux";

import EditVendorCodeDialog from "../edit-vendor-code-dialog/edit-vendor-code-dialog";

import vendorCodesMenuActions from "../components/menu-actions-vendor-codes";
import dbSchema from "../../../components/vendor-codes-db_schema";
import fetchVendorCodes from "../Store/fetchVendorCodes";

import {
  setModalWindowVendorCodeOpen,
  copyPasteValue,
} from "../Store/Slices/slice-vendor-codes";

import sendChangedEntryToDB from "../Store/sendChangedEntryToDB";

import fetchEntries from "../Store/fetchEntries";

import {
  setModalWindowUsersEditOpen,
  setUserEditData,
} from "../Store/Slices/slice-users";

import EditItemsPage from "../edit-items-page/edit-items-page";

export default function EditVendorCodePage() {
  const { vendorCodesArr, modalWindowVendorCodeOpen } = useSelector(
    (state) => state.vendorCodes,
    shallowEqual
  );

  const dispatch = useDispatch();
  React.useEffect(() => dispatch(fetchEntries("vendorCodes")), [dispatch]);

  return (
    <EditItemsPage
      headerText="Редактирование артикулов"
      HeaderIcon={EditIcon}
      modalWindowOpen={modalWindowVendorCodeOpen}
      dataArr={vendorCodesArr}
      allMenuActions={vendorCodesMenuActions}
      EditDialog={EditVendorCodeDialog}
      dbSchema={dbSchema}
    />
  );

  /* 



  const [menuEditType, setMenuEditType] = React.useState("add");
  const [menuParams, setMenuParams] = React.useState({
    x: 0,
    y: 0,
    hidden: true,
    actions: [],
    id: "",
  });


  const handleMenuInDataGrid = ({ id }, e) => {
    if (!modalWindowUsersEditOpen) {
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
    if (!modalWindowUsersEditOpen) {
      setMenuParams({
        x: e.clientX,
        y: e.clientY,
        hidden: false,
        actions: [allMenuActions[3]],
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

    const clickedLabel = e.target.closest("button").ariaLabel;

    const selectMenu = allMenuActions.find(
      ({ tooltipTitle }) => tooltipTitle === clickedLabel
    )?.name;
    handleOffMenu();

    setMenuEditType(selectMenu);
    const userData = usersArr.find((item) => item.id === menuParams.id);

    switch (selectMenu) {
      case "addUser":
        dispatch(setModalWindowUsersEditOpen());
        break;
      case "editUser":
        dispatch(setUserEditData(userData));
        dispatch(setModalWindowUsersEditOpen());
        break;
      case "changePass":
        dispatch(setUserEditData(userData));
        dispatch(setModalWindowUsersEditOpen());
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
    }
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
        <GroupIcon fontSize="large" sx={{ color: "primary.dark" }} />
        <Typography variant="h5" sx={{ paddingLeft: "15px" }}>
          Пользователи базы данных
        </Typography>
      </Box>
      {modalWindowUsersEditOpen ? (
        <EditVendorCodeDialog editType={editType} itemId={menuParams.id} />
      ) : (
        <SpeedDialMenu
          menuParams={menuParams}
          onClick={handleMenuSelect}
          onMouseLeave={handleOffMenu}
        />
      )}
      <DataGrid
        dbSchema={dbSchema}
        dataArr={usersArr}
        onCellClick={handleMenuInDataGrid}
      />
    </Container>
  ); */
}
