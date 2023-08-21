import * as React from "react";
import PropTypes from "prop-types";

import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

import EditItemsPage from "./edit-items-page";
import EditDialog from "../dialogs/edit-documents-dialog";

import allMenuActions from "../components/menus-schemas/menu-actions-documents";
import tableSchema from "../components/tables-schemas/table_schema-documents";
import dbSchema from "../../../components/db_schema_for_testing/db_schema-document";

import {
  setModalWindowIsOpen as inStockModalWindowIsOpen,
  openForFill as inStockOpenForFill,
} from "../Store/Slices/slice-documents-instock";
import {
  setModalWindowIsOpen as outStockModalWindowIsOpen,
  openForFill as outStockOpenForFill,
} from "../Store/Slices/slice-documents-outstock";

export default function EditDocumentsPage({ page }) {
  return page === "documentsInStock" ? (
    <EditItemsPage
      page={page}
      headerText="Поступления материала"
      HeaderIcon={CloudDownloadIcon}
      setModalWindowIsOpen={inStockModalWindowIsOpen}
      openForFill={inStockOpenForFill}
      allMenuActions={allMenuActions}
      EditDialog={EditDialog}
      tableSchema={tableSchema}
      dbSchema={dbSchema}
    />
  ) : (
    <EditItemsPage
      page={page}
      headerText="Отгрузка материала"
      HeaderIcon={CloudUploadIcon}
      setModalWindowIsOpen={outStockModalWindowIsOpen}
      openForFill={outStockOpenForFill}
      allMenuActions={allMenuActions}
      EditDialog={EditDialog}
      tableSchema={tableSchema}
      dbSchema={dbSchema}
    />
  );
}

EditDocumentsPage.propTypes = {
  page: PropTypes.string.isRequired,
};
