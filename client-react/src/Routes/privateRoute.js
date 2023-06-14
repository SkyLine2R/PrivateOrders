import * as React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function PrivateRoute() {
  // Получаем значение isAuthenticated из пользовательского хука useAuth
  const { isAuthenticated } = useAuth();

  // Получаем текущий маршрут из хука useLocation
  const location = useLocation();
  console.log("isAuthenticated");
  console.log(isAuthenticated);
  return (
    // Если пользователь авторизован, то рендерим дочерние элементы текущего маршрута, используя компонент Outlet
    isAuthenticated === true ? (
      <Outlet />
    ) : (
      // Свойство replace указывает, что текущий маршрут будет заменен на новый, чтобы пользователь не мог вернуться обратно, используя кнопку "назад" в браузере.
      <Navigate to="/login" state={{ from: location }} replace />
    )
  );
}
