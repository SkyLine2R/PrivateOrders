import * as React from "react";
import Container from "@mui/material/Container";
import { useSelector, useDispatch, shallowEqual } from "react-redux";

import PersonRemove from "@mui/icons-material/PersonRemove";
import AdminPanelSettings from "@mui/icons-material/AdminPanelSettings";
import ManageAccounts from "@mui/icons-material/ManageAccounts";
import PersonAdd from "@mui/icons-material/PersonAdd";

import DataGrid from "../data-grid-table/data-grid-table";
import SpeedDialMenu from "../speed-dial-menu/speed-dial-menu";
import dbSchemaUsers from "../../../components/users-db_schema";

import fetchUsers from "./fetch-users";

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

export default function UsersEditPage() {
  const dispatch = useDispatch();

  const [error, setError] = React.useState(null);
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [users, setUsers] = React.useState([]);

  const [menuParams, setMenuParams] = React.useState({
    x: 0,
    y: 0,
    hidden: true,
    actions: [],
    id: "",
  });

  React.useEffect(() => dispatch(fetchUsers()), [dispatch]);

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
  React.useEffect(() => dispatch(fetchUsers()));

  React.useEffect(() => {
    async function fetching() {
      const resp = await fetch("http://localhost:3000/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json;charset=utf-8" },
        referrerPolicy: "no-referrer",
        body: JSON.stringify({ type: "getAll" }),
      });

      if (!resp.ok) {
        const message = `Ошибка получения данных: ${resp.status}`;
        throw new Error(message);
      }
      const data = await resp.json();
      setIsLoaded(true);
      setUsers(data);
    }
    fetching().catch((err) => {
      setIsLoaded(true);
      setError(err);
    });
  }, []);

  console.log(users);

  return (
    <Container
      maxWidth="md"
      sx={{ margin: "20px auto" }}
      onClick={handleMenuInContainer}
    >
      <DataGrid
        dbSchema={dbSchemaUsers}
        dataArr={users}
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
