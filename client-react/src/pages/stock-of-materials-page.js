import * as React from "react";
import PropTypes from "prop-types";
import StorageIcon from "@mui/icons-material/Storage";

import EditItemsPage from "./edit-items-page";
import EditVendorCodeDialog from "../dialogs/edit-vendor-code-dialog";

import allMenuActions from "../components/menus-schemas/menu-actions-vendor-codes";
import tableSchema from "../components/tables-schemas/table_schema-stock-material";
import dbSchema from "../../../components/db_schema_for_testing/db_schema-stock-material";

import { setModalWindowIsOpen } from "../Store/Slices/slice-vendor-codes";

export default function EditVendorCodePage({ headerText }) {
  return (
    <EditItemsPage
      page="stock"
      headerText={headerText}
      HeaderIcon={StorageIcon}
      setModalWindowIsOpen={setModalWindowIsOpen}
      allMenuActions={allMenuActions}
      EditDialog={EditVendorCodeDialog}
      tableSchema={tableSchema}
      dbSchema={dbSchema}
    />
  );
}

EditVendorCodePage.propTypes = {
  headerText: PropTypes.string,
};

EditVendorCodePage.defaultProps = {
  headerText: "Материал на складе",
};
