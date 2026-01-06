import { toXML } from "jstoxml";
import type { Entity } from "@/types/common";

export const dataToXMLBlob = async <T extends Entity>(data: T[]) => {
  const xmlObject = {
    items: data.map((item) => {
      const result: Record<string, unknown> = {};

      for (const [key, value] of Object.entries(item)) {
        if (value === undefined || value === null) {
          continue;
        }

        result[key] = value;
      }

      return { item: result };
    }),
  };

  const xml = toXML(xmlObject, { header: true, indent: "  " });
  return new Blob([xml], { type: "application/xml" });
};
