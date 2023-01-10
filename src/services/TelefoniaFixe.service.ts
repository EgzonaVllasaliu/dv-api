import { ReadFileData } from "../utils/readFileData";

export const TelefoniaFixeService = {
  read_sheet_data: async (name: string) => {
    const data = ReadFileData("TelefoniaFixe.xls");

    for (let item of data)
      if (item.name.replace(/ /g, "") == name) return { status: 200, item };

    return { status: 400, data: [] };
  },
};
