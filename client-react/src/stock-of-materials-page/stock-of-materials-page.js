import * as React from "react";

import DataGrid from "../vendor-code-table/vendor-code-table";
import dbSchemaDocument from "../../../components/document-db_schema";

export default function Stock() {
  return <DataGrid dbSchema={dbSchemaDocument} />;
}
