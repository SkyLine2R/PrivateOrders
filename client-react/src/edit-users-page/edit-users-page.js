import * as React from "react";
import Container from "@mui/material/Container";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import GroupIcon from "@mui/icons-material/Group";

import DataGrid from "../data-grid-table/data-grid-table";
import SpeedDialMenu from "../speed-dial-menu/speed-dial-menu";
import EditUsersDialog from "../edit-users-dialog/edit-users-dialog";

import dbSchema from "../../../components/users-db_schema";
import sendChangedEntryToDB from "../Store/sendChangedEntryToDB";

import fetchEntries from "../Store/fetchEntries";

import { setModalWindowUsersEditOpen } from "../Store/Slices/slice-users";

import allMenuActions from "../components/menu-actions-users";

export default function UsersEditPage() {
  const dispatch = useDispatch();

  const { usersArr, modalWindowUsersEditOpen } = useSelector(
    (state) => state.users,
    shallowEqual
  );

  const [userEditType, setUserEditType] = React.useState("addUser");
  const [menuParams, setMenuParams] = React.useState({
    x: 0,
    y: 0,
    hidden: true,
    actions: [],
    id: "",
  });

  React.useEffect(() => dispatch(fetchEntries("users")), [dispatch]);

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
    console.log(e);
    console.log(e.target.closest("button").ariaLabel);
    console.log(selectMenu);

    setUserEditType(selectMenu);
    const userData = usersArr.find((item) => item.id === menuParams.id);

    switch (selectMenu) {
      case "addUser":
        dispatch(setModalWindowUsersEditOpen());
        break;
      case "disableUser":
        dispatch(setModalWindowUsersEditOpen({ ...userData, accessLevel: 1 }));
        dispatch(
          sendChangedEntryToDB({
            dbSchema: { id: null, accessLevel: dbSchema.accessLevel },
            api: "users",
            type: "disableUser",
          })
        );
        dispatch(setModalWindowUsersEditOpen());
        break;
      default:
        dispatch(setModalWindowUsersEditOpen(userData));
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
        <EditUsersDialog userEditType={userEditType} userId={menuParams.id} />
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
  );
}
