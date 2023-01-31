import { TelefoniaFixe } from "../utils/telefonia-fixe";

export const TelefoniaFixeService = {
  read_sheet_data: async (name: string) => {
    const data = TelefoniaFixe();

    for (let item of data)
      if (item.name.replace(/ /g, "") == name) return { status: 200, item };

    return { status: 400, data: [] as any };
  },
};
