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
  '/api/investimet/:year/:quarter',
  async (req: Request, res: Response, next: NextFunction) => {
    try{
      let {year,quarter} = req.params;
      quarter = "TM"+quarter;
      let result = await TeHyratDheInvestimetISPService.read_by_quarter(year,quarter);
      res.status(result.status).send(result)
    }catch(e){
      next(e);
    }
  })
TeHyratDheInvestimetISPController.get(
  "/api/investimet/:sheetNo",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const {sheetNo} = req.params;
      let result = await TeHyratDheInvestimetISPService.read_one_sheet(sheetNo);
      res.status(result.status).send(result)
    } catch (e) {
      next(e);
    }
  }
);
