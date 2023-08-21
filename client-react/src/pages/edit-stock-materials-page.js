import * as React from "react";
import PropTypes from "prop-types";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import EditItemsPage from "./edit-items-page";
import EditVendorCodeDialog from "../dialogs/edit-vendor-code-dialog";

import allMenuActions from "../components/menus-schemas/menu-actions-vendor-codes";
import tableSchema from "../components/tables-schemas/table_schema-stock-material";
import dbSchema from "../../../components/db_schema_for_testing/db_schema-stock-material";

import { setModalWindowIsOpen } from "../Store/Slices/slice-vendor-codes";

export default function EditStockMaterialsPage({ page }) {
  return page === "documentsInStock" ? (
    <EditItemsPage
      page="inStock"
      headerText="Поступление материала на склад"
      HeaderIcon={CloudDownloadIcon}
      setModalWindowIsOpen={setModalWindowIsOpen}
      allMenuActions={allMenuActions}
      EditDialog={EditVendorCodeDialog}
      tableSchema={tableSchema}
      dbSchema={dbSchema}
    />
  ) : (
    <EditItemsPage
      page="outStock"
      headerText="Списание материала со склада"
      HeaderIcon={CloudUploadIcon}
      setModalWindowIsOpen={setModalWindowIsOpen}
      allMenuActions={allMenuActions}
      EditDialog={EditVendorCodeDialog}
      tableSchema={tableSchema}
      dbSchema={dbSchema}
    />
  );
}

EditStockMaterialsPage.propTypes = {
  page: PropTypes.string.isRequired,
};
