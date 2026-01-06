import {
  Document,
  HeadingLevel,
  Packer,
  Paragraph,
  Table,
  TableCell,
  TableRow,
  TextRun,
  WidthType,
} from "docx";
import type { Entity } from "@/types/common";

export const dataToDOCXBlob = async <T extends Entity>(
  data: T[]
): Promise<Blob> => {
  if (!data.length) {
    const emptyDoc = new Document({ sections: [] });
    return Packer.toBlob(emptyDoc);
  }

  const headers = Object.keys(data[0]);

  const headerRow = new TableRow({
    children: headers.map(
      (header) =>
        new TableCell({
          width: {
            size: 100 / headers.length,
            type: WidthType.PERCENTAGE,
          },
          children: [
            new Paragraph({
              children: [new TextRun({ text: header, bold: true })],
            }),
          ],
        })
    ),
  });

  const contentRows = data.map(
    (item) =>
      new TableRow({
        children: headers.map(
          (header) =>
            new TableCell({
              width: {
                size: 100 / headers.length,
                type: WidthType.PERCENTAGE,
              },
              children: [new Paragraph({ text: String(item[header] ?? "") })],
            })
        ),
      })
  );

  const heading = new Paragraph({
    heading: HeadingLevel.HEADING_1,
    children: [
      new TextRun({
        text: "Orders Table",
        bold: true,
        color: "000000",
        allCaps: true,
      }),
    ],
  });

  const table = new Table({
    rows: [headerRow, ...contentRows],
    width: { size: 100, type: WidthType.PERCENTAGE },
  });

  const doc = new Document({
    sections: [
      {
        children: [heading, table],
      },
    ],
  });

  return Packer.toBlob(doc);
};
