import * as React from "react";
import Grid from "@mui/material/Unstable_Grid2";
import { useDispatch, useSelector } from "react-redux";

import FieldForInput from "../base-elements/field-for-input";
import MultipleSelectCheckmarks from "../base-elements/multiple-select-checkmarks";
import {
  selectTables,
  selectColumns,
} from "../components/quickSearchFilterArr";
import fetchEntries from "../Store/fetchEntries";

import quickSearchDbSchema from "../../../components/db_schema_for_testing/db_schema-quick-search-string";
import { changeValue } from "../Store/Slices/slice-quick-search";

export default function QuickSearchVendorsAndMatetials() {
  const dispatch = useDispatch();

  const { quickSearchString, tables, columns } = useSelector(
    (state) => state.quickSearch.inputFields
  );

  React.useEffect(
    () =>
      tables.forEach((table) => {
        dispatch(fetchEntries({ api: table.name, type: "getQuickFilter" }));
      }),
    [dispatch, quickSearchString, tables, columns]
  );

  const handleChange = (fieldId) => (event) => {
    const {
      target: { value },
    } = event;
    dispatch(
      changeValue({
        value,
        fieldId,
      })
    );
  };

  return (
    <Grid
      container
      spacing={2}
      sx={{
        m: "4px 0",
      }}
    >
      <Grid xs={3}>
        <MultipleSelectCheckmarks
          label="Искать в"
          names={selectTables}
          selectName={tables}
          handleChange={handleChange("tables")}
        />
      </Grid>
      <Grid xs={3}>
        <MultipleSelectCheckmarks
          label="Поля для поиска"
          names={selectColumns}
          selectName={columns}
          handleChange={handleChange("columns")}
        />
      </Grid>
      <Grid xs={6}>
        <FieldForInput
          id="quickSearchString"
          label="Быстрый поиск"
          changeValue={changeValue}
          value={quickSearchString}
          dbSchema={quickSearchDbSchema}
        />
      </Grid>
    </Grid>
  );
}