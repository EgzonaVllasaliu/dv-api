import { ReadFileData } from "../utils/readFileData";

export const TeHyratDheInvestimetISPService = {
  read_all_data: async () => {
    const data = ReadFileData("TeHyratDheInvestimetISP.xlsx");

    //Idea: Njejte si ne file per telefoni fixe

    return { status: 200, data };
  },
  read_one_sheet : async (sheetNo: string) =>{
    let d = ReadFileData("TeHyratDheInvestimetISP.xlsx");
     
    for( let sheet of d){
      if(sheet.name.replace(/ /g,'') == sheetNo){
        return {status:200,sheet};
      }
    }
    
    return {status:400, data: []};
  }
};
