import * as React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import CustomizedSnackbars from "./snackbar/snackbar";
import MovementOfMaterials from "./movement-of-materials-page/movement-of-materials-page";

import Stock from "./stock-of-materials-page/stock-of-materials-page";
import MenuAppBar from "./menu-app-bar/menu-app-bar";

import Login from "./login-form/login-form";
import Users from "./edit-users-page/edit-users-page";
import VendorCodes from "./edit-vendor-code-page/edit-vendor-code-page";

// тестовые данные. Заменятся состоянием из Redux
const openDocuments = {
  receipt: [
    {
      documentName: "Товарная накладная",
      documentNumber: "УД 564-01",
      documentDate: "01.12.2023",
    },
    {
      documentName: "Без документа (по файлу)",
      documentNumber: "б/н",
      documentDate: "07.10.2022",
    },
  ],
  outgo: [
    {
      documentName: "Цеховая",
      documentNumber: "55",
      documentDate: "04.12.2023",
    },
    {
      documentName: "Вывозная",
      documentNumber: "184",
      documentDate: "21.05.2022",
    },
  ],
};

export default function App() {
  return (
    <Router>
      <CustomizedSnackbars />
      <MenuAppBar />
      <main>
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route path="/stock" element={<Stock />} />
          <Route path="/users" element={<Users />} />
          <Route path="vendor-codes" element={<VendorCodes />} />
          <Route
            path="/receipt"
            element={
              <MovementOfMaterials
                type="receipt"
                openDocuments={[...openDocuments.receipt]}
              />
            }
          />

          <Route
            path="/outgo"
            element={
              <MovementOfMaterials
                type="outgo"
                openDocuments={[...openDocuments.outgo]}
              />
            }
          />
        </Routes>
      </main>
    </Router>
  );
}
