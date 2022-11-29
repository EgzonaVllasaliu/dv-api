import { ReadFileData } from "../utils/readFileData";
import { RemoveAllNullRows } from "../utils/removeAllNullRows";

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
    let data = ReadFileData("TeHyratDheInvestimetISP.xlsx");
    for( let sheet of data){
      if(sheet.name.includes(year) && sheet.name.includes(quarter)){
        sheet.data.splice(0,3);
        // sheet.data = RemoveAllNullRows(sheet.data as any[][]);
        return {status:200,sheet};
      }
    }

    return {status:400, data: []}

  },
  // read_income_by_year_quarter: async(year: string, quarter: string) => {
  //   let result: object[] = [];
  //   const data = ReadFileData("TeHyratDheInvestimetISP.xlsx");
  //   for( let sheet of data){
  //     if(sheet.name.includes(year) && sheet.name.includes(quarter)){
  //       for(let i = 0; i < sheet.data.length; i++){
  //         if(i>=3){
  //           let sheet_data: unknown[] = sheet.data[i]; 
  //           result.push({name: sheet_data[i][0], income: sheet.data[1]})
  //         }
  //       }
  //     }
  //   }

  //   return {status:200,data: result}
  // }
  readCompanyIncome :async (companyName : string) => {
    let data = ReadFileData("TeHyratDheInvestimetISP.xlsx");
    let result = [];
    for(let sheet of data){
      let new_sheet  = sheet.data as any[][];
      for(let i = 0; i< new_sheet.length; i++){
        
        if(((typeof new_sheet[i][0] !== 'undefined' ? new_sheet[i][0] : '') as string).toLowerCase() == companyName.toLowerCase()){
          result.push({
            period : sheet.name,
            income: new_sheet[i][1]
          })
        }
      }
    }
    if(result.length >= 0){
      return {status:200, data: result};
    }
    else{
      return{status:400,data: []};
    }
  },
  readCompanyInvestment :async (companyName : string) => {
    let data = ReadFileData("TeHyratDheInvestimetISP.xlsx");
    let result = [];
    for(let sheet of data){
      let new_sheet  = sheet.data as any[][];
      for(let i = 0; i< new_sheet.length; i++){
        
        if(((typeof new_sheet[i][0] !== 'undefined' ? new_sheet[i][0] : '') as string).toLowerCase() == companyName.toLowerCase()){
          result.push({
            period : sheet.name,
            investment: new_sheet[i][2]
          })
        }
      }
    }
    if(result.length >= 0){
      return {status:200, data: result};
    }
    else{
      return{status:400,data: []};
    }
  },
  readCompanyTotalClients :async (companyName : string) => {
    let data = ReadFileData("TeHyratDheInvestimetISP.xlsx");
    let result = [];
    for(let sheet of data){
      let new_sheet  = sheet.data as any[][];
      for(let i = 0; i< new_sheet.length; i++){
        
        if(((typeof new_sheet[i][0] !== 'undefined' ? new_sheet[i][0] : '') as string).toLowerCase() == companyName.toLowerCase()){
          result.push({
            period : sheet.name,
            total_clients: new_sheet[i][5]
          })
        }
      }
    }
    if(result.length >= 0){
      return {status:200, data: result};
    }
    else{
      return{status:400,data: []};
    }
  }
};
