import * as React from "react";
import PropTypes from "prop-types";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useSelector } from "react-redux";
import EditItemsPage from "./edit-items-page";
import EditVendorCodeDialog from "../dialogs/edit-vendor-code-dialog";

import allMenuActions from "../components/menus-schemas/menu-actions-vendor-codes";
import tableSchema from "../components/tables-schemas/table_schema-stock-material";
import dbSchema from "../../../components/db_schema_for_testing/db_schema-stock-material";
import AddMaterialDialog from "../dialogs/add-material-to-document-dialog";

import { setModalWindowIsOpen as setModalWindowIsOpenInStock } from "../Store/Slices/slice-inStock";

export default function EditStockMaterialsPage({ page }) {
  const modalWindowIsOpen = useSelector(
    (store) => store[page].modalWindowIsOpen
  );

  return page === "inStock" ? (
    <>
      <AddMaterialDialog
        modalWindowIsOpen={modalWindowIsOpen}
        windowOpenClose={setModalWindowIsOpenInStock}
      />
      <EditItemsPage
        page="inStock"
        headerText="Поступление материала на склад"
        HeaderIcon={CloudDownloadIcon}
        setModalWindowIsOpen="{setModalWindowIsOpenOutStock}"
        allMenuActions={allMenuActions}
        EditDialog={EditVendorCodeDialog}
        tableSchema={tableSchema}
        dbSchema={dbSchema}
      />
    </>
  ) : (
    <>
      <AddMaterialDialog
        modalWindowIsOpen={modalWindowIsOpen}
        menuEditType="edit"
      />
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
    </>
  );
}

EditStockMaterialsPage.propTypes = {
  page: PropTypes.string.isRequired,
};
