/* eslint-disable react/forbid-prop-types */
import * as React from "react";
import Grid from "@mui/material/Unstable_Grid2";
import PropTypes from "prop-types";

import Tabs from "../tabs/tabs";
import DataGrid from "../vendor-code-table/vendor-code-table";
import dbSchemaDocument from "../../../components/document-db_schema";
import EditVendorCodeDialog from "../edit-vendor-code-dialog/edit-vendor-code-dialog";

const tabs = {
  tabLabel: { receipt: "Поступления на склад", outgo: "Списание материалов" },
};

export default function MovementOfMaterials({ type, openDocuments }) {
  console.log(openDocuments);
  return (
    <Grid container rowSpacing={1} spacing={2}>
      <Tabs
        tabLabel1={tabs.tabLabel[type]}
        /*         {...openDocuments.map(
          (doc, index) =>
            `tabLabel${index + 2}=${doc.documentName} №${doc.documentNumber}`
        )} */
        tabLabel2="Документ...584"
        tab1={<DataGrid itemsDB={dbSchemaDocument} />}
        tab2={<EditVendorCodeDialog />}
      />
    </Grid>
  );
}

MovementOfMaterials.propTypes = {
  type: PropTypes.string.isRequired,
  openDocuments: PropTypes.arrayOf(PropTypes.object).isRequired,
};
