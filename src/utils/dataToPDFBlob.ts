import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import type { Entity } from "@/types/common";
import { loadBinaryFileAsBase64 } from "@/utils/loadBinaryFileAsBase64";

export const dataToPDFBlob = async <T extends Entity>(data: T[]) => {
  const doc = new jsPDF({ orientation: "landscape", unit: "pt", format: "a4" });

  if (!data.length) {
    return doc.output("blob");
  }

  // Loading roboto font as example because default jsPDF font does not support cyrillic characters
  const [robotoRegular, robotoBold] = await Promise.all([
    loadBinaryFileAsBase64("/fonts/Roboto-Regular.ttf"),
    loadBinaryFileAsBase64("/fonts/Roboto-Bold.ttf"),
  ]);

  doc.addFileToVFS("Roboto-Regular.ttf", robotoRegular);
  doc.addFont("Roboto-Regular.ttf", "Roboto", "normal");

  // bold variant is used under the hood by autoTable for header row
  doc.addFileToVFS("Roboto-Bold.ttf", robotoBold);
  doc.addFont("Roboto-Bold.ttf", "Roboto", "bold");

  doc.setFont("Roboto");

  const headers = Object.keys(data[0]);
  const rows = data.map((item) => headers.map((h) => String(item[h] ?? "")));

  doc.setFontSize(16);
  doc.text("Orders Table", 40, 40);

  autoTable(doc, {
    startY: 60,
    head: [headers],
    body: rows,
    styles: { fontSize: 12, font: "Roboto" },
    headStyles: {
      fillColor: [0, 0, 0],
      textColor: [255, 255, 255],
      font: "Roboto",
    },
    theme: "grid",
  });

  return doc.output("blob");
};
