import { ReadFileData } from "../utils/readFileData";

export const TelefoniaMobileService = {
  read_all_data: async () => {
    const data = ReadFileData("TelefoniaMobile.xlsx");

    //Idea: Njejte si ne file paraprak

    return { status: 200, data };
  },
  get_market_division : async (operator_name : String) => {
    const data = ReadFileData("TelefoniaMobile.xlsx");

    for(let sheet of data){
      if(sheet.name.toLowerCase() == "ndarja e tregut sipas te hyrave"){

        let quarters = sheet.data[1] as String[]
        let year = 2007;
        let rez : Object[]= []; 
        for(let row of sheet.data as String[]){
          // if(typeof row[0] !== "undefined"){

            if(typeof row[0] !== 'undefined' &&  row[0].toLowerCase().trim() == operator_name.toLowerCase()){
              
              for(let i = 1; i < row.length; i++){
                if(typeof quarters[i] !== 'undefined' &&  quarters[i] != null && quarters[i] != ''){
                  rez.push({
                    "year": year,
                    "quarter": quarters[i],
                    "value": row[i]  
                  })

                  if(quarters[i].toLowerCase().trim() == "tm4"){
                    year = year + 1;
                  }
                }
              }
              return {
                status : 200,
                data: rez
              } 
            }  
          // }
            

          
        }
       
      }
    }

    return {
      status : 200,
      data: []
    }
  }
};
