import { isp } from "../utils/isp";
import { ReadFileData } from "../utils/readFileData";
import { RemoveAllNullRows } from "../utils/removeAllNullRows";
import { RemoveIfNameNull } from "../utils/removeIfNameNull";

export class TeHyratDheInvestimetISPService {
  ispData: any;

  constructor(){
    this.ispData = ReadFileData("TeHyratDheInvestimetISP.xlsx");
    
  }
  async read_all_data(){
    const data = this.ispData;

    let result: Array<unknown> = [];

    for (let sheet of data) {
      for (let element of sheet.data) {
        result.push(element);
        break;
      }
    }

    //Idea: Njejte si ne file per telefoni fixe

    return { status: 200, data};
  }
  async read_one_sheet(sheetNo: string){
    let d = this.ispData;

    for (let sheet of d) {
      if (sheet.name.replace(/ /g, "") == sheetNo) {
        return { status: 200, sheet };
      }
    }

    return { status: 400, data: [] as any };
  }
  async read_by_year(year: string){
    const data = this.ispData;
    let result: Array<unknown> = [];

    for (let sheet of data) {
      if (sheet.name.includes(year)) {
        for (let element of sheet.data) {
          result.push(element);
        }
      }
    }

    return {
      status: 200,
      data: result,
    };
  }
  async read_by_quarter(year: string, quarter: string) {
    let data = this.ispData;
    for (let sheet of data) {
      if (sheet.name.includes(year) && sheet.name.includes(quarter)) {
        sheet.data.splice(0, 3);
        // sheet.data = RemoveAllNullRows(sheet.data as any[][]);
        return { status: 200, sheet };
      }
    }

    return { status: 400, data: [] as any };
  }

  async readCompanyIncome(companyName: string){
    let data = this.ispData;
    let result: any = [];
    for (let sheet of data) {
      let new_sheet = sheet.data as any[][];
      for (let i = 0; i < new_sheet.length; i++) {
        if (
          (
            (typeof new_sheet[i][0] !== "undefined"
              ? new_sheet[i][0]
              : "") as string
          ).toLowerCase() == companyName.toLowerCase()
        ) {
          result.push({
            period: sheet.name,
            income: new_sheet[i][1],
          });
        }
      }
    }
    if (result.length >= 0) {
      return { status: 200, data: result };
    } else {
      return { status: 400, data: [] };
    }
  }
  async readCompanyInvestment(companyName: string){
    let data = this.ispData;
    let result: any = [];
    for (let sheet of data) {
      let new_sheet = sheet.data as any[][];
      for (let i = 0; i < new_sheet.length; i++) {
        if (
          (
            (typeof new_sheet[i][0] !== "undefined"
              ? new_sheet[i][0]
              : "") as string
          ).toLowerCase() == companyName.toLowerCase()
        ) {
          result.push({
            period: sheet.name,
            investment: new_sheet[i][2],
          });
        }
      }
    }
    if (result.length >= 0) {
      return { status: 200, data: result };
    } else {
      return { status: 400, data: [] as any };
    }
  }
  async readCompanyTotalClients(companyName: string){
    let data = this.ispData;
    let result: any = [];
    for (let sheet of data) {
      let new_sheet = sheet.data as any[][];
      for (let i = 0; i < new_sheet.length; i++) {
        if (
          (
            (typeof new_sheet[i][0] !== "undefined"
              ? new_sheet[i][0]
              : "") as string
          ).toLowerCase() == companyName.toLowerCase()
        ) {
          result.push({
            period: sheet.name,
            total_clients: new_sheet[i][5],
          });
        }
      }
    }
    if (result.length >= 0) {
      return { status: 200, data: result };
    } else {
      return { status: 400, data: [] };
    }
  }
  readDataAboutISP(companyName: string) {
    if (companyName.toLowerCase() == "totali") {
      companyName = "total";
    }

    const findIndexOfColumn = (col_name: String, all_cols: String[]) => {
      for (let i = 0; i < all_cols.length; i++) {
        let col = all_cols[i];
        if (col == "" || col == null) {
          continue;
        }
        // console.log("col :"+col+'-----')
        if (col.toLowerCase() == col_name.toLowerCase()) {
          return i;
        }
      }

      return all_cols.length - 1;
    };

    let all_data = this.ispData;
    let result: Object[] = [];
    for (let sheet of all_data) {
      if (sheet.name == "TM4 2018 Te tjerat") {
        continue;
      }

      sheet.data = RemoveIfNameNull(sheet.data as any[]);
      sheet.data = RemoveAllNullRows(sheet.data as any[][]);

      let income_index = findIndexOfColumn(
        "Të Hyrat",
        sheet.data[2] as String[]
      );
      let investments_index = findIndexOfColumn(
        "Investimet",
        sheet.data[2] as String[]
      );
      let individual_users_index = findIndexOfColumn(
        "Individual",
        sheet.data[2] as String[]
      );
      let business_users_index = findIndexOfColumn(
        "Biznes",
        sheet.data[2] as String[]
      );
      let total_users_index = findIndexOfColumn(
        "Totali",
        sheet.data[2] as String[]
      );
      let exist: boolean = false;

      for (let i = 3; i < sheet.data.length; i++) {
        let new_sheet = sheet.data[i] as string[];
        if (companyName == new_sheet[0].toLowerCase()) {
          exist = true;

          let obj = {
            year: sheet.name,
            income: new_sheet[income_index],
            investments: new_sheet[investments_index],
            individual_users: new_sheet[individual_users_index],
            business_users: new_sheet[business_users_index],
            total_users: new_sheet[total_users_index],
          };
          result.push(obj);
        }
      }

      if (!exist) {
        let obj = {
          year: sheet.name,
          income: "",
          investments: "",
          individual_users: "",
          business_users: "",
          total_users: "",
        };
        result.push(obj);
      }
    }

    if (result.length > 0) {
      return {
        status: 200,
        data: {
          name: companyName,
          data: result,
        },
      };
    } else {
      return {
        status: 400,
        data: [] as any,
      };
    }
  }
  readUsersAboutAllISP(year: string){
    const findIndexOfColumn = (col_name: String, all_cols: String[]) => {
      for (let i = 0; i < all_cols.length; i++) {
        let col = all_cols[i];
        if (col == "" || col == null) {
          continue;
        }
        // console.log("col :"+col+'-----')
        if (col.toLowerCase() == col_name.toLowerCase()) {
          return i;
        }
      }

      return all_cols.length - 1;
    };

    let all_data = this.ispData;
    let result: Object[] = [];
    for (let sheet of all_data) {
      if (sheet.name.replace("-", " ").toLowerCase() == year) {
        sheet.data = RemoveIfNameNull(sheet.data as any[]);
        sheet.data = RemoveAllNullRows(sheet.data as any[][]);

        let individual_users_index = findIndexOfColumn(
          "Individual",
          sheet.data[2] as String[]
        );
        let business_users_index = findIndexOfColumn(
          "Biznes",
          sheet.data[2] as String[]
        );
        let total_users_index = findIndexOfColumn(
          "Totali",
          sheet.data[2] as String[]
        );
        let exist: boolean = false;

        for (let i = 3; i < sheet.data.length; i++) {
          let new_sheet = sheet.data[i] as string[];

          let obj = {
            company_name: new_sheet[0],
            individual_users: new_sheet[individual_users_index],
            business_users: new_sheet[business_users_index],
            total_users: new_sheet[total_users_index],
          };
          result.push(obj);
        }
      }
    }

    if (result.length > 0) {
      return {
        status: 200,
        data: {
          name: year,
          data: result,
        },
      };
    } else {
      return {
        status: 400,
        data: [] as any,
      };
    }
  }
  getAllOperators(){
    let all_data = this.ispData;
    let result: Object[] = [];
    let operators: String[] = [];

    for (let sheet of all_data) {
      if (sheet.name == "TM4 2018 Te tjerat") {
        continue;
      }

      sheet.data = RemoveIfNameNull(sheet.data as any[]);
      sheet.data = RemoveAllNullRows(sheet.data as any[][]);

      for (let i = 3; i < sheet.data.length; i++) {
        let row = sheet.data[i] as String[];
        if (
          row[0].toLowerCase() == "total" ||
          row[0].toLowerCase() == "Sub total te tjer" ||
          row[0].toLowerCase() == "Sub total te tjere" ||
          row[0].toLowerCase() == "Sub total"
        ) {
          continue;
        }

        if (!operators.includes(row[0])) {
          operators.push(row[0]);
        }
      }
    }

    return {
      status: 200,
      data: operators,
    };
  }
  getTime(){
    let data = this.ispData;

    let result: string[] = [];

    for (let sheet of data) {
      if (sheet.name == "TM4 2018 Te tjerat") {
        continue;
      } else {
        let time = sheet.name.replace("-", " ");
        result.push(time.trim());
      }
    }

    return {
      status: 200,
      data: result,
    };
  }

  getYears(){
    let data = this.ispData;

    let result: string[] = [];

    for (let sheet of data) {
      if (sheet.name == "TM4 2018 Te tjerat") {
        continue;
      } else {
        let time = sheet.name.split("-").join(" ").split(" ");
        let time_arr: string[] = [];
        time.forEach((elem: any) => {
          if (elem != "") {
            time_arr.push(elem);
          }
        });

        if (!result.includes(time_arr[1])) {
          result.push(time_arr[1]);
        }
      }
    }

    return {
      status: 200,
      data: result,
    };
  }
}


