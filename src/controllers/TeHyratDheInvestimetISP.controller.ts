import { NextFunction, Request, Response, Router } from "express";
import { TeHyratDheInvestimetISPService } from "../services/TeHyratDheInvestimetISP.service";

export const TeHyratDheInvestimetISPController: Router = Router();

TeHyratDheInvestimetISPController.get('/',async (req: Request, res: Response, next: NextFunction) => {
  try{
    const result = await TeHyratDheInvestimetISPService.read_all_data();
    res.status(result.status).send({
      data: result.data
    })

  } catch(e){

    next(e);
  }
  
})

TeHyratDheInvestimetISPController.get(
  "/api/investimet/:sheetNo",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const {sheetNo} = req.params;
      // const result = await TeHyratDheInvestimetISPService.read_all_data();

      // for(let sheet  of result.data){
      //   if(sheet.name.replace(/ /g,'') == sheetNo){
      //     return res.status(result.status).send(sheet);
      //   }
      // }

      // return res.status(result.status).send({
      //   name: sheetNo,
      //   data: [],
      // });
      let result = await TeHyratDheInvestimetISPService.read_one_sheet(sheetNo);
      res.status(result.status).send(result)
    } catch (e) {
      next(e);
    }
  }
);
