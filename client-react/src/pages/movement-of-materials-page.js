import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import Grid from "@mui/material/Unstable_Grid2";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import CloseIcon from "@mui/icons-material/Close";
import EditDocumentsPage from "./edit-document-instock-page";
import EditStockDocumentPage from "./edit-stock-documents-page";

import {
  setActiveTab,
  closeTab,
} from "../Store/Slices/slice-documents-instock";

const mainTabs = {
  documentsInStock: "Документы о поступлении",
  documentsOutStock: "Документы о списании",
};

const createTabs = (doc) => (
  <Tab
    label={`${doc.name} ${doc.number ? " №" : ""}${doc.number} от ${new Date(
      doc.date
    ).toLocaleDateString()}`}
    value={`${doc.id}`}
    icon={
      <CloseIcon
        id={doc.id}
        // eslint-disable-next-line no-alert
        onMouseEnter={(e) => {
          e.target.style.transform = "scale(1.2) rotate(3deg)";
          e.target.style.opacity = "0.7";
        }}
        onMouseLeave={(e) => {
          e.target.style.transform = "scale(1)";
          e.target.style.opacity = "1";
        }}
      />
    }
    iconPosition="end"
    key={doc.id}
    sx={{
      minHeight: "52px",
    }}
  />
);

const createTabPanels = (doc) => (
  <TabPanel value={`${doc.id}`} key={`${doc.id}`}>
    <EditDocumentsPage />
  </TabPanel>
);

// если элементы не будут добавляться - убрать "обёртку" Box
export default function MovementOfMaterials({ type }) {
  const dispatch = useDispatch();

  const handleChange = (e, newValue) => {
    dispatch(setActiveTab(newValue));
  };

  const openDocuments = useSelector((store) => store[type].opened);
  const catalog = useSelector((store) => store[type].catalog);
  const activeTab = useSelector((store) => store[type].activeTab);

  const handleCloseTab = (e) => {
    const id = e.target?.closest("svg")?.getAttribute("id");
    if (id) dispatch(closeTab(id));
  };

  return (
    <Grid container rowSpacing={1} spacing={2}>
      <Box sx={{ width: "100%", typography: "body1" }} onClick={handleCloseTab}>
        <TabContext value={`${activeTab}`}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} aria-label="tabs with documents">
              <Tab label={mainTabs[type]} value="0" />
              {/* табы для открытых документов */}
              {openDocuments.map((id) =>
                createTabs(catalog.find((elem) => elem.id === id))
              )}
            </TabList>
          </Box>
          <TabPanel value="0">
            <Box
              sx={{
                width: "100%",
                typography: "body1",
                height: "calc(100vh - 120px - 64px - 14px)",
              }}
            >
              <EditStockDocumentPage page={type} />
            </Box>
          </TabPanel>
          {openDocuments.map((id) =>
            createTabPanels(catalog.find((elem) => elem.id === id))
          )}
        </TabContext>
      </Box>
    </Grid>
  );
}

MovementOfMaterials.propTypes = {
  type: PropTypes.string.isRequired,
};
