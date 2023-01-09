import { ReadFileData } from "../utils/readFileData";

export const TelefoniaMobileService = {
  read_one_sheet : async (sheetName: string) =>{
    let d = ReadFileData("TelefoniaMobileRefactored.xlsx");
    
    for(let sheet of d){
      if(sheet.name.replace(/ /g,'') == sheetName){
        return {status:200,sheet};
      }
    }

    return {status:400, data: []};
  }
};
