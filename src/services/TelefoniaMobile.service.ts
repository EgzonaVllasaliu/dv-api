import { ReadFileData } from "../utils/readFileData";

export const TelefoniaMobileService = {
  read_all_data: async () => {
    const data = ReadFileData("TelefoniaMobile.xlsx");

    //Idea: Njejte si ne file paraprak

    return { status: 200, data };
  },
};
