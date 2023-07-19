import * as React from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuItem from "@mui/material/MenuItem";
import Avatar from "@mui/material/Avatar";
import ListItemIcon from "@mui/material/ListItemIcon";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";

import { useSelector } from "react-redux";

import DialogSelectCustomer from "../forms/select-customer-form";
import Menu from "./menu-for-app-bar";
import useAuth from "../hooks/useAuth";
import { endSession } from "../components/session";

import menuMain from "../components/menus-schemas/menu-main-for-app-bar";

const pages = [
  { name: "Материал на складе", link: "stock" },
  { name: "Поступления", link: "instock" },
  { name: "Списания", link: "outstock" },
  { name: "Отчёты", link: "reports" },
];

const LinkBehavior = React.forwardRef((props, ref) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <RouterLink ref={ref} to="/" {...props} role={undefined} />
));

export default function MenuAppBar() {
  const navigate = useNavigate();
  const { user, setUser } = useAuth();
  const customer = useSelector(({ customers }) => customers.currentId);
  const [anchorEl, setAnchorEl] = React.useState({ main: null, user: null });

  const handleMenu = ({ currentTarget }) => {
    setAnchorEl(
      currentTarget.id === "main"
        ? { user: null, main: currentTarget }
        : { main: null, user: currentTarget }
    );
  };

  const handleClose = () => {
    setAnchorEl({ main: null, user: null });
  };

  const handleLogout = () => {
    endSession();
    setUser({});
    navigate("/login");
  };

  return (
    <Box sx={{ flexGrow: 1, marginBottom: "15px" }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={handleMenu}
            id="main"
          >
            <MenuIcon />
          </IconButton>

          {/* Главное меню редактирования */}
          <Menu
            anchorEl={anchorEl?.main}
            onClose={handleClose}
            onClick={handleClose}
            arrowSide="left"
          >
            <MenuItem>РЕДАКТИРОВАНИЕ</MenuItem>
            <Divider />
            {menuMain.map((item) => (
              <MenuItem component={LinkBehavior} to={item.name} key={item.name}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                {item.tooltipTitle}
              </MenuItem>
            ))}
          </Menu>

          {/* кнопки на основные страницы если выбран склад заказчика */}
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {!customer ? (
              <Typography>
                Выберите или создайте новый склад чтобы начать работу
              </Typography>
            ) : (
              pages.map((page) => (
                <Button
                  component={LinkBehavior}
                  to={page.link}
                  key={page.link}
                  sx={{
                    color: "white",
                    mr: 2,
                    fontSize: "22px",
                    fontFamily: "monospace",
                    fontWeight: 700,
                  }}
                >
                  {page.name}
                </Button>
              ))
            )}
          </Box>

          {/* Если пользователь авторизован - меню пользователя,  */}
          <DialogSelectCustomer />
          {user.accessLevel > 1 && (
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
                id="user"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                anchorEl={anchorEl.user}
                onClose={handleClose}
                onClick={handleClose}
              >
                <MenuItem onClick={handleClose}>
                  <Avatar /> {user?.name ?? "Профиль"}
                </MenuItem>
                <Divider />
                {user.accessLevel === 5 && (
                  <MenuItem
                    onClick={handleClose}
                    component={LinkBehavior}
                    to="users"
                    key="users"
                  >
                    <ListItemIcon>
                      <PersonAdd fontSize="small" />
                    </ListItemIcon>
                    Управление пользователями
                  </MenuItem>
                )}
                <MenuItem>
                  <ListItemIcon>
                    <Settings fontSize="small" />
                  </ListItemIcon>
                  Настройки программы
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                  <ListItemIcon>
                    <Logout fontSize="small" />
                  </ListItemIcon>
                  Выйти
                </MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
