/* eslint-disable react/prop-types */
import * as React from "react";
import { Link as RouterLink } from "react-router-dom";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import ListItemIcon from "@mui/material/ListItemIcon";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Divider from "@mui/material/Divider";

// eslint-disable-next-line no-unused-vars
const pages = [
  { name: "Материал на складе", link: "stock" },
  { name: "Поступления", link: "receipt" },
  { name: "Списания", link: "outgo" },
  { name: "Отчёты", link: "reports" },
  { name: "Склады заказчиков", link: "customers" },
];

const LinkBehavior = React.forwardRef((props, ref) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <RouterLink ref={ref} to="/" {...props} role={undefined} />
));

export default function MenuAppBar({ open, onClose, onClick, anchorEl }) {
  // const [anchorEl, setAnchorEl] = React.useState(null);
  // const open = Boolean(anchorEl);

  /*   const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  }; */

  /*   const handleClose = () => {
    setAnchorEl(null);
  };
 */
  return (
    <Menu
      anchorEl={anchorEl}
      id="main-menu"
      open={open}
      onClose={onClose}
      onClick={onClick}
      PaperProps={{
        elevation: 0,
        sx: {
          overflow: "visible",
          filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
          mt: 1.5,
          "& .MuiAvatar-root": {
            width: 32,
            height: 32,
            ml: -0.5,
            mr: 1,
          },
          "&:before": {
            content: '""',
            display: "block",
            position: "absolute",
            top: 0,
            right: 14,
            width: 10,
            height: 10,
            bgcolor: "background.paper",
            transform: "translateY(-50%) rotate(45deg)",
            zIndex: 0,
          },
        },
      }}
      transformOrigin={{ horizontal: "right", vertical: "top" }}
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
    >
      <MenuItem onClick={null}>
        <Avatar /> Управление:
      </MenuItem>
      <Divider />

      <MenuItem
        onClick={onClick}
        component={LinkBehavior}
        to="users"
        key="users"
      >
        <ListItemIcon>
          <PersonAdd fontSize="small" />
        </ListItemIcon>
        Склады
      </MenuItem>

      <MenuItem>
        <ListItemIcon>
          <Settings fontSize="small" />
        </ListItemIcon>
        Артикулы
      </MenuItem>
      <MenuItem onClick={null}>
        <ListItemIcon>
          <Logout fontSize="small" />
        </ListItemIcon>
        Выйти
      </MenuItem>
    </Menu>
  );
}
