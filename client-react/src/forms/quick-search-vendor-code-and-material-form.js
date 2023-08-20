/* eslint-disable react/prop-types */
import * as React from "react";
import Grid from "@mui/material/Unstable_Grid2";
import { useDispatch, useSelector } from "react-redux";

import FieldForInput from "../base-elements/field-for-input";
import MultipleSelectCheckmarks from "../base-elements/multiple-select-checkmarks";
import fetchEntries from "../Store/fetchEntries";

import quickSearchDbSchema from "../../../components/db_schema_for_testing/db_schema-quick-search-string";
import { changeValue } from "../Store/Slices/slice-quick-search";

export default function QuickSearchVendorsAndMatetials({
  selectTables,
  selectColumns,
}) {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(changeValue({ value: selectTables, fieldId: "tables" }));
    dispatch(changeValue({ value: selectColumns, fieldId: "columns" }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { quickSearchString, tables, columns } = useSelector(
    (state) => state.quickSearch.inputFields
  );

  React.useEffect(
    () =>
      tables.forEach((table) => {
        dispatch(
          fetchEntries({
            api: table.name,
            type: "getFiltered",
            string: quickSearchString,
            columns: columns.map((item) => item.name),
          })
        );
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
