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
  },

  getYears : () => {
    let data = ReadFileData("TelefoniaMobileRefactored.xlsx");
    let result : string[] = [];

    for (let sheet of data){
      let time = sheet.data[0] as Array<string>;

      time.forEach(elem => {
        if(!result.includes(elem.toString().split(' ')[1])){
          result.push(elem.toString().split(' ')[1]);  
        }
      })
    }

    return {
      status: 200,
      data: result.sort().reverse()
    };

  }
};
