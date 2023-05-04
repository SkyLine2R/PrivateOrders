/* eslint-disable react/forbid-prop-types */
import * as React from "react";
import Grid from "@mui/material/Unstable_Grid2";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

import DataGrid from "../vendor-code-table/vendor-code-table";
import dbSchemaDocument from "../../../components/document-db_schema";
import EditVendorCodeDialog from "../edit-vendor-code-dialog/edit-vendor-code-dialog";
import CloseIconButton from "../Icon-buttons/Close-icon-button";

const tabs = {
  tabLabel: {
    receipt: "Документы о поступлении",
    outgo: "Документы о списании",
  },
};

const createTabs = (doc, index) => (
  <Tab
    label={`${doc.documentName} №${doc.documentNumber}`}
    value={`${index + 1}`}
    icon={<CloseIconButton />}
    iconPosition="end"
    key={`${index + 1}`}
    sx={{
      minHeight: "52px",
    }}
  />
);

const createTabPanels = (doc, index) => (
  <TabPanel value={`${index + 1}`} key={`${index + 1}`}>
    {`Таблица с материалом по документу: ${doc.documentName} №${doc.documentNumber} ${doc.documentNumber}`}
    <EditVendorCodeDialog />
  </TabPanel>
);

// если элементы не будут добавляться - убрать "обёртку" Box
export default function MovementOfMaterials({ type, openDocuments }) {
  const [value, setValue] = React.useState("1");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Grid container rowSpacing={1} spacing={2}>
      <Box sx={{ width: "100%", typography: "body1" }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label={tabs.tabLabel[type]} value="0" />
              {openDocuments.map(createTabs)}
            </TabList>
          </Box>
          <TabPanel value="0">
            <DataGrid itemsDB={dbSchemaDocument} />
          </TabPanel>
          {openDocuments.map(createTabPanels)}
        </TabContext>
      </Box>
    </Grid>
  );
}

MovementOfMaterials.propTypes = {
  type: PropTypes.string.isRequired,
  openDocuments: PropTypes.arrayOf(PropTypes.object).isRequired,
};
