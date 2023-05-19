import * as React from "react";
import Container from "@mui/material/Container";

import PersonRemove from "@mui/icons-material/PersonRemove";
import AdminPanelSettings from "@mui/icons-material/AdminPanelSettings";
import ManageAccounts from "@mui/icons-material/ManageAccounts";
import PersonAdd from "@mui/icons-material/PersonAdd";

import DataGrid from "../data-grid-table/data-grid-table";
import SpeedDialMenu from "../speed-dial-menu/speed-dial-menu";
import dbSchemaUsers from "../../../components/users-db_schema";

const allMenuActions = [
  {
    icon: <PersonRemove />,
    name: "deleteUser",
    tooltipTitle: "Отключить аккаунт пользователя",
  },
  {
    icon: <AdminPanelSettings />,
    name: "changePass",
    tooltipTitle: "Изменить пароль пользователя",
  },
  {
    icon: <ManageAccounts />,
    name: "changeUser",
    tooltipTitle: "Изменить данные пользователя",
  },
  {
    icon: <PersonAdd />,
    name: "addUser",
    tooltipTitle: "Добавить нового пользователя",
  },
];

const testData = [
  {
    id: 0,
    login: "Admin",
    name: "Администратор Юзеров",
    privelegies: "10",
    createdAt: "10/10/2023 01:05:25",
  },
  {
    id: 1,
    login: "oleg",
    name: "Олег Василенко",
    privelegies: "99",
    createdAt: "11/10/2023 01:05:25",
  },
];

export default function UsersEditPage() {
  const [menuParams, setMenuParams] = React.useState({
    x: 0,
    y: 0,
    hidden: true,
    actions: [],
    id: "",
  });

  const handleMenuInDataGrid = ({ id }, e) => {
    e.stopPropagation();
    setMenuParams({
      x: e.clientX,
      y: e.clientY,
      hidden: false,
      actions: allMenuActions,
      id,
    });
  };

  const handleMenuInContainer = (e) => {
    setMenuParams({
      x: e.clientX,
      y: e.clientY,
      hidden: false,
      actions: [allMenuActions[3]],
      id: null,
    });
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

    console.log(e.target.closest("button").ariaLabel);
    console.log(selectMenu);
  };

  return (
    <Container
      maxWidth="md"
      sx={{ margin: "20px auto" }}
      onClick={handleMenuInContainer}
    >
      <DataGrid
        dbSchema={dbSchemaUsers}
        dataArr={testData}
        onCellClick={handleMenuInDataGrid}
      />
      <SpeedDialMenu
        menuParams={menuParams}
        onClick={handleMenuSelect}
        onMouseLeave={handleOffMenu}

        /*         anchorEl={UsersEditPage}
         */
      />
    </Container>
  );
}
