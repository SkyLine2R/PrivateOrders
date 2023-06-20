import * as React from "react";

import DataGrid from "../base-elements/data-grid-table";
import dbSchemaDocument from "../../../components/document-db_schema";

export default function Stock() {
  return <DataGrid dbSchema={dbSchemaDocument} />;
}
