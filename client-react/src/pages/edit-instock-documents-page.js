import * as React from "react";

import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
// eslint-disable-next-line no-unused-vars
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

import EditItemsPage from "./edit-items-page";
import EditUsersDialog from "../dialogs/edit-documents-dialog";

import allMenuActions from "../components/menus-schemas/menu-actions-documents";
import tableSchema from "../components/tables-schemas/table_schema-documents";
import dbSchema from "../../../components/db_schema_for_testing/db_schema-document";

import { setModalWindowIsOpen } from "../Store/Slices/slice-instock-documents";

export default function EditDocumentsPage() {
  return (
    <EditItemsPage
      page="documentsInStock"
      headerText="Поступления материала"
      HeaderIcon={CloudDownloadIcon}
      setModalWindowIsOpen={setModalWindowIsOpen}
      allMenuActions={allMenuActions}
      EditDialog={EditUsersDialog}
      tableSchema={tableSchema}
      dbSchema={dbSchema}
    />
  );
}
