import * as React from "react";

import DataGrid from "../base-elements/data-grid-table";
import tableSchema from "../components/tables-schemas/table_schema-stock-material";

import dbSchemaDocument from "../../../components/db_schema_for_testing/db_schema-document";

export default function Stock() {
  return <DataGrid dbSchema={dbSchemaDocument} tableSchema={tableSchema} />;
}
