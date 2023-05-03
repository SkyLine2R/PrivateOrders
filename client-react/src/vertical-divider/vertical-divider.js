import * as React from "react";
import { styled } from "@mui/material/styles";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Unstable_Grid2";
import DataGrid from "../vendor-code-table/vendor-code-table";

/* const Grid = styled(MuiGrid)(({ theme }) => ({
  width: "100%",
  ...theme.typography.body2,
  '& [role="separator"]': {
    margin: theme.spacing(0, 2),
  },
})); */

export default function VerticalDivider() {
  /*   const content = (
    <div>
      {`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus id dignissim justo.
   Nulla ut facilisis ligula. Interdum et malesuada fames ac ante ipsum primis in faucibus.
   Sed malesuada lobortis pretium.`}
    </div>
  ); */

  return (
    <Grid container spacing={2}>
      <Grid>
        <DataGrid />
        <SearchAppBar />
      </Grid>

      <Divider orientation="vertical" flexItem>
        VERTICAL
      </Divider>
      <Grid item xs={7}>
        <DataGrid />
      </Grid>
    </Grid>
  );
}
