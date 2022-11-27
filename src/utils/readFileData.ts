import * as xlsx from "node-xlsx";
import { readFileSync } from "fs";
import { join } from "path";

export const ReadFileData = (file_name: string) => {
  const file_path = join(__dirname, "../", `xls/${file_name}`);

  return xlsx.parse(readFileSync(file_path));
};
