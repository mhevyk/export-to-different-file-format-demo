import { stringify } from "csv-stringify/browser/esm";
import type { Entity } from "@/types/common";

export const dataToCSVBlob = <T extends Entity>(data: T[]) => {
  const headers = Object.keys(data[0]);
  const rows = data.map((obj) => headers.map((header) => obj[header] ?? ""));

  return new Promise<Blob>((resolve, reject) => {
    stringify(
      [headers, ...rows],
      {
        bom: true, // important for correct displayment of cyrillic characters in Excel
      },
      (error, output) => {
        if (error) {
          return reject(error);
        }

        return resolve(new Blob([output], { type: "text/csv" }));
      }
    );
  });
};
