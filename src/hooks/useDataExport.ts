import type { Entity } from "@/types/common.ts";
import { dataToCSVBlob } from "@/utils/dataToCSVBlob.ts";
import { dataToDOCXBlob } from "@/utils/dataToDOCXBlob.ts";
import { dataToPDFBlob } from "@/utils/dataToPDFBlob.ts";
import { dataToXMLBlob } from "@/utils/dataToXMLBlob.ts";
import { downloadBlob } from "@/utils/downloadBlob.ts";

type DataToBlobTransformer<T> = (data: T[]) => Promise<Blob>;

interface UseDataExportProps<T> {
  data: T[];
}

export const useDataExport = <T extends Entity>({
  data,
}: UseDataExportProps<T>) => {
  const createExportHandler = (
    dataToBlobTransformer: DataToBlobTransformer<T>
  ) => {
    return async (fileName: string) => {
      try {
        const blob = await dataToBlobTransformer(data);
        downloadBlob(blob, fileName);
      } catch (error) {
        console.log(error);
      }
    };
  };

  const exportAsCSV = createExportHandler(dataToCSVBlob);
  const exportAsDOCX = createExportHandler(dataToDOCXBlob);
  const exportAsPDF = createExportHandler(dataToPDFBlob);
  const exportAsXML = createExportHandler(dataToXMLBlob);

  return {
    exportAsCSV,
    exportAsDOCX,
    exportAsPDF,
    exportAsXML,
  };
};
