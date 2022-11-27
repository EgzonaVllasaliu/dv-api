import { ReadFileData } from "../utils/readFileData";

export const TelefoniaFixeService = {
  read_all_data: async () => {
    const data = ReadFileData("TelefoniaFixe.xls");

    //Idea: Vijne si array te dhenat e 4 sheets data[0]  ekuivalente me sheet 1...
    // Na e bojme nje switch edhe thojme nqs vjen prej front end kerkese per "sheet 1 data" boni disa manipulime
    // Attention ky funksion nuk ka parametra por duhet me i shtu ashtu qysh e zhvillojme logjiken

    return { status: 200, data };
  },
};
