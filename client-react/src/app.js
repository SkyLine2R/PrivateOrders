import * as React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

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
      <main>
        <Routes>
          <Route path="/receipt" element={<EditVendorCodeDialog />} />
          <Route
            path="/material"
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
