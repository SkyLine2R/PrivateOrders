import * as React from "react";
import PropTypes from "prop-types";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import EditItemsPage from "./edit-items-page";

import allMenuActions from "../components/menus-schemas/menu-actions-vendor-codes";
import tableSchema from "../components/tables-schemas/table_schema-stock-material";
import dbSchema from "../../../components/db_schema_for_testing/db_schema-stock-material";
import AddMaterialDialog from "../dialogs/add-material-to-document-dialog";

import { setModalWindowIsOpen } from "../Store/Slices/slice-inStock";

export default function EditStockMaterialsPage({ page }) {
  return page === "inStock" ? (
    <EditItemsPage
      page="inStock"
      headerText="Поступление материала на склад"
      HeaderIcon={CloudDownloadIcon}
      setModalWindowIsOpen={setModalWindowIsOpen}
      allMenuActions={allMenuActions}
      EditDialog={AddMaterialDialog}
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
      EditDialog={AddMaterialDialog}
      tableSchema={tableSchema}
      dbSchema={dbSchema}
    />
  );
}

EditStockMaterialsPage.propTypes = {
  page: PropTypes.string.isRequired,
};
