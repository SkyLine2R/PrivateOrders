import * as React from "react";
import MovementOfMaterials from "./movement-of-materials-page";
import editStockDocumentPage from "./edit-instock-documents-page";

const openDocuments = {
  inStock: [
    {
      documentName: "Товарная накладная",
      documentNumber: "УД 564-01",
      documentDate: "01.12.2023",
    },
    {
      documentName: "Без документа (по файлу)",
      documentNumber: "б/н",
      documentDate: "07.10.2022",
    },
  ],
  outStock: [
    {
      documentName: "Цеховая",
      documentNumber: "55",
      documentDate: "04.12.2023",
    },
    {
      documentName: "Вывозная",
      documentNumber: "184",
      documentDate: "21.05.2022",
    },
  ],
};

export default function InStockDocumentsPage() {
  return (
    <MovementOfMaterials
      type="inStock"
      openDocuments={[...openDocuments.outStock]}
      MainTabContent={editStockDocumentPage}
    />
  );
}
