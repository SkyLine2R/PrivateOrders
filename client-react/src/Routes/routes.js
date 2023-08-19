import * as React from "react";

import { Routes, Route } from "react-router-dom";

import Stock from "../pages/stock-of-materials-page";
import Login from "../forms/login-form";
import Users from "../pages/edit-users-page";
import VendorCodes from "../pages/edit-vendor-code-page";
import Customers from "../pages/edit-customer-page";
import Colors from "../pages/edit-colors-page";
import MovementOfMaterials from "../pages/movement-of-materials-page";

import PrivateRoute from "./privateRoute";

export default function useRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      {/* защищённые маршруты */}
      <Route element={<PrivateRoute />}>
        <Route index element={<main />} />
        <Route path="/" element={<main />} />
        <Route path="/stock" element={<Stock />} />
        <Route path="/users" element={<Users />} />
        <Route path="/colors" element={<Colors />} />
        <Route path="/vendor-codes" element={<VendorCodes />} />
        <Route path="/customers" element={<Customers />} />
        <Route
          path="/instock"
          element={<MovementOfMaterials type="documentsInStock" />}
        />
        <Route
          path="/outstock"
          element={<MovementOfMaterials type="documentsOutStock" />}
        />
      </Route>
    </Routes>
  );
}
