import * as React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import CustomizedSnackbars from "./snackbar/snackbar";
import MovementOfMaterials from "./movement-of-materials-page/movement-of-materials-page";

import Stock from "./stock-of-materials/stock-of-materials";
import MenuAppBar from "./menu-app-bar/menu-app-bar";

export default function App() {
  return (
    <Router>
      <CustomizedSnackbars />
      <MenuAppBar />
      <main>
        <Routes>
          <Route
            path="/receipt"
            type="receipt"
            element={<MovementOfMaterials />}
          />
          <Route path="/stock" element={<Stock />} />

          <Route path="/outgo" type="outgo" element={<MovementOfMaterials />} />
        </Routes>
      </main>
    </Router>
  );
}
