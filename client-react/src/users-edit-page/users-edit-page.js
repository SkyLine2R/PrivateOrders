import * as React from "react";
import Container from "@mui/material/Container";
import { useSelector, useDispatch, shallowEqual } from "react-redux";

import DataGrid from "../data-grid-table/data-grid-table";
import SpeedDialMenu from "../speed-dial-menu/speed-dial-menu";
import dbSchemaUsers from "../../../components/users-db_schema";

import fetchUsers from "../Store/fetchUsers";
import allMenuActions from "./menu-actions";

export default function UsersEditPage() {
  const dispatch = useDispatch();
  const { usersArr } = useSelector((state) => state.users, shallowEqual);

  const [menuParams, setMenuParams] = React.useState({
    x: 0,
    y: 0,
    hidden: true,
    actions: [],
    id: "",
  });

  React.useEffect(() => dispatch(fetchUsers()), []);

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

  /*   React.useEffect(() => {
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
  }, []); */

  return (
    <Container
      maxWidth="md"
      sx={{ margin: "20px auto" }}
      onClick={handleMenuInContainer}
    >
      <DataGrid
        dbSchema={dbSchemaUsers}
        dataArr={usersArr}
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
