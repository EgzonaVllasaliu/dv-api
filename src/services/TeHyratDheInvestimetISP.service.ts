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
  },
  read_by_year : async(year: string) => {
    const data = ReadFileData("TeHyratDheInvestimetISP.xlsx");
    let result: Array<unknown> = [];

    for(let sheet of data){
      if(sheet.name.includes(year)){
        for(let element of sheet.data){
          result.push(element)
        }
      }
    }

    return {
      status: 200,
      data: result
    }
  },
  read_by_quarter : async(year: string, quarter: string) => {
    const data = ReadFileData("TeHyratDheInvestimetISP.xlsx");
    for( let sheet of data){
      if(sheet.name.includes(year) && sheet.name.includes(quarter)){
        return {status:200,sheet};
      }
    }

    return {status:400, data: []}

  }
};
