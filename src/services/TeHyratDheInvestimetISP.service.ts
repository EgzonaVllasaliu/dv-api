import { ReadFileData } from "../utils/readFileData";

export const TeHyratDheInvestimetISPService = {
  read_all_data: async () => {
    const data = ReadFileData("TeHyratDheInvestimetISP.xlsx");

    //Idea: Njejte si ne file per telefoni fixe

    return { status: 200, data };
  },
};
