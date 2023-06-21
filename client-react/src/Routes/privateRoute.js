import * as React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function PrivateRoute() {
  // Получаем объект user из кастомного хука useAuth
  const { user } = useAuth();

  const location = useLocation();
  console.log("user in private route");
  console.log(user);
  return (
    // Если пользователь авторизован с уровнем доступа больше 1, то рендерим дочерние элементы текущего маршрута, используя компонент Outlet
    user?.accessLevel > 1 ? (
      <Outlet />
    ) : (
      // Свойство replace указывает, что текущий маршрут будет заменен на новый, чтобы пользователь не мог вернуться обратно, используя кнопку "назад" в браузере.
      <Navigate to="/login" state={{ from: location }} replace />
    )
  );
}
