import { mobile } from "../utils/mobile";

export const TelefoniaMobileService = {
  read_one_sheet: async (sheetName: string) => {
    let d = mobile();

    for (let sheet of d) {
      if (sheet.name.replace(/ /g, "") == sheetName) {
        return { status: 200, sheet };
      }
    }

    return { status: 400, data: [] as any };
  },

  read_one_sheet_with_time: async (sheetName: string, time: string) => {
    let d = mobile();

    if(!time || time.length < 16)
      return { status: 400, data: [] as any };

    let yearFrom = time.substring(4, 8);
    let quarterStart = time.substring(2, 3);
    let quarterEnd = time.substring(11, 12);
    let yearTo = time.substring(13, 17);

    for (let sheet of d) {
      let arr = [] as number[]

      if (sheet.name.replace(/ /g, "") == sheetName) {
        let times = sheet.data[0]

        times.forEach(time => {
          if(time){
          var stringTime = time.toString();
          
          var localYear = stringTime.substring(4, 8);
          var localQuarter = stringTime.substring(2, 3);
          
          if((localYear + localQuarter < yearFrom + quarterStart) || (localYear + localQuarter > yearTo + quarterEnd)){
              arr.push(times.indexOf(time))
        }
        }});
        
        for(let i=0; i < sheet.data.length; i++){
            for(let j=0; j < arr.length; j++){   
              sheet.data[i][arr[j]] = null;
            }         
          }

        sheet.data = sheet.data.map(innerArray =>
          innerArray.filter(value => value !== null) as number[]
        );
        
        return { status: 200, sheet };
      }
    }

    return { status: 400, data: [] as any };
  },

  getYears: () => {
    let data = mobile();
    let result: string[] = [];

    for (let sheet of data) {
      let time = sheet.data[0] as Array<string>;

      time.forEach((elem) => {
        if(elem)
          if (!result.includes(elem.toString().split(" ")[1])) {
            result.push(elem.toString().split(" ")[1]);
        }
      });
    }

    return {
      status: 200,
      data: result.sort().reverse(),
    };
  },
};
