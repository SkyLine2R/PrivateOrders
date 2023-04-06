import * as React from "react";

import EditVendorCodeDialog from "./edit-vendor-code-dialog/edit-vendor-code-dialog";
import CustomizedSnackbars from "./snackbar/snackbar";
import ReceiptOfMaterials from "./receipt-of-materials-page/receipt-of-materials-page.js";

export default function App() {
  return (
    <div>
      <ReceiptOfMaterials />
      {/* <EditVendorCodeDialog /> */}
      <CustomizedSnackbars />
    </div>
  );
}

// export default App;
