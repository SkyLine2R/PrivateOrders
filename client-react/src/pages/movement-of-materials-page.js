/* eslint-disable react/prop-types */
/* eslint-disable react/forbid-prop-types */
import * as React from "react";
import Grid from "@mui/material/Unstable_Grid2";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import CloseIcon from "@mui/icons-material/Close";

import EditVendorCodePage from "./edit-vendor-code-page";

const mainTabs = {
  inStock: "Документы о поступлении",
  outStock: "Документы о списании",
};

const createTabs = (doc, index) => (
  <Tab
    label={`${doc.documentName} №${doc.documentNumber}`}
    value={`${index + 1}`}
    icon={
      <CloseIcon
        id={`${index + 1}`}
        // eslint-disable-next-line no-alert
        onClick={() => alert("Добавить код закрытия вкладки")}
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
    key={`${index + 1}`}
    sx={{
      minHeight: "52px",
    }}
  />
);

const createTabPanels = (doc, index) => (
  <TabPanel value={`${index + 1}`} key={`${index + 1}`}>
    {`Таблица с материалом по документу: ${doc.documentName} №${doc.documentNumber} ${doc.documentNumber}`}
    <EditVendorCodePage />
  </TabPanel>
);

// если элементы не будут добавляться - убрать "обёртку" Box
export default function MovementOfMaterials({
  type,
  openDocuments,
  MainTabContent,
}) {
  const [value, setValue] = React.useState("0");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Grid container rowSpacing={1} spacing={2}>
      <Box sx={{ width: "100%", typography: "body1" }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} aria-label="tabs with documents">
              <Tab label={mainTabs[type]} value="0" />
              {/* табы для открытых документов */}
              {openDocuments.map(createTabs)}
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
              <MainTabContent />
            </Box>
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
