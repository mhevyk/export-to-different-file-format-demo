import { loadBinaryFile } from "@/utils/loadBinaryFile";

export const loadBinaryFileAsBase64 = async (url: string) => {
  const blob = await loadBinaryFile(url);

  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);

    reader.onloadend = () => {
      const result = reader.result;

      if (typeof result !== "string") {
        return reject(new Error("Unable to load file as base64 string"));
      }

      // result format is data:application/x-font-ttf;base64,<BASE64_HERE>
      const base64Data = result.split(",")[1];
      resolve(base64Data);
    };

    reader.onerror = reject;
  });
};
