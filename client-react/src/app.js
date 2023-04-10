import * as React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import EditVendorCodeDialog from "./edit-vendor-code-dialog/edit-vendor-code-dialog";
import CustomizedSnackbars from "./snackbar/snackbar";
import ReceiptOfMaterials from "./receipt-of-materials-page/receipt-of-materials-page";

import BasicTabs from "./tabs/tabs";
import MenuAppBar from "./menu-app-bar/menu-app-bar";

export default function App() {
  return (
    <Router>
      <CustomizedSnackbars />
      <MenuAppBar />
      <header>
        <ul>
          <li>
            <Link to="/">Начало начал</Link>
          </li>
          <li>
            <Link to="/receipt">Поступление материалов</Link>
          </li>

          <li>
            <Link to="/receipt">Материалы на складе</Link>
          </li>
        </ul>
      </header>
      <main>
        <Routes>
          <Route path="/receipt" element={<EditVendorCodeDialog />} />
          <Route
            path="/"
            element={
              <BasicTabs
                tab1="Здесь будут запасы материала на складе"
                tab2={ReceiptOfMaterials()}
              />
            }
          />
        </Routes>
      </main>
    </Router>
  );
}
