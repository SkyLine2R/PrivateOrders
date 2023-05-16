import * as React from "react";

import DataGrid from "../data-grid-table/data-grid-table";
import dbSchemaDocument from "../../../components/document-db_schema";

export default function Stock() {
  return <DataGrid dbSchema={dbSchemaDocument} />;
}
