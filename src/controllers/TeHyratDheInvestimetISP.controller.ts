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
  '/api/investimet/date/:year/:quarter',
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
  "/api/investimet/sheet/:sheetNo",
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

TeHyratDheInvestimetISPController.get(
  "/api/investimet/tehyrat/:companyName",
  async (req: Request, res: Response, next: NextFunction) => {
    try{
      let {companyName} = req.params;
      let result = await TeHyratDheInvestimetISPService.readCompanyIncome(companyName);
      
      res.status(result.status).send(result.data)
    }catch(e){
      console.log(e,' error')
      next(e);
    }
  }
);

TeHyratDheInvestimetISPController.get(
  "/api/investimet/invest/:companyName",
  async (req: Request, res: Response, next: NextFunction) => {
    try{
      let {companyName} = req.params;
      let result = await TeHyratDheInvestimetISPService.readCompanyInvestment(companyName);
      
      res.status(result.status).send(result.data)
    }catch(e){
      console.log(e,' error')
      next(e);
    }
  }
);
TeHyratDheInvestimetISPController.get(
  "/api/investimet/totalclients/:companyName",
  async (req: Request, res: Response, next: NextFunction) => {
    try{
      let {companyName} = req.params;
      let result = await TeHyratDheInvestimetISPService.readCompanyTotalClients(companyName);
      
      res.status(result.status).send(result.data)
    }catch(e){
      console.log(e,' error')
      next(e);
    }
  }
);
TeHyratDheInvestimetISPController.get(
  "/api/investimet/all_data/:companyName",
  async (req: Request, res: Response, next: NextFunction) => {
    try{
      let {companyName} = req.params;
      companyName = companyName.toLowerCase();
      let result = await TeHyratDheInvestimetISPService.readDataAboutISP(companyName);
      
      res.status(result.status).send(result.data)
    }catch(e){
      console.log(e,' error')
      next(e);
    }
  }
);
TeHyratDheInvestimetISPController.get(
  "/api/investimet/get_operators",
  async (req: Request, res: Response, next: NextFunction) => {
    try{
      
      
      // let result = await TeHyratDheInvestimetISPService.readDataAboutISP(companyName);
      let result = await TeHyratDheInvestimetISPService.getAllOperators();
      
      res.status(result.status).send(result.data)
    }catch(e){
      console.log(e,' error')
      next(e);
    }
  }
);
TeHyratDheInvestimetISPController.get(
  "/api/investimet/get_time",
  async (req: Request, res: Response, next: NextFunction) => {
    try{
      
      
      
      let result = TeHyratDheInvestimetISPService.getTime();
      
      res.status(result.status).send(result.data)
    }catch(e){
      console.log(e,' error')
      next(e);
    }
  }
);

TeHyratDheInvestimetISPController.get(
  "/api/investimet/get_years",
  async (req: Request, res: Response, next: NextFunction) => {
    try{
      
      
      
      let result = TeHyratDheInvestimetISPService.getYears();
      
      res.status(result.status).send(result.data)
    }catch(e){
      console.log(e,' error')
      next(e);
    }
  }
);

