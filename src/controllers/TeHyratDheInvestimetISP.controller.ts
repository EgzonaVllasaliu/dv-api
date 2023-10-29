import { NextFunction, Request, Response, Router } from "express";
import { TeHyratDheInvestimetISPService } from "../services/TeHyratDheInvestimetISP.service";

export const TeHyratDheInvestimetISPController: Router = Router();

const ispService = new TeHyratDheInvestimetISPService();

TeHyratDheInvestimetISPController.get(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await ispService.read_all_data();
      res.status(result.status).send({
        data: result.data,
      });
    } catch (e) {
      res.status(500).send(e);

      next(e);
    }
  }
);
TeHyratDheInvestimetISPController.get(
  "/api/investimet/date/:year/:quarter",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      let { year, quarter } = req.params;
      quarter = "TM" + quarter;
      let result = await ispService.read_by_quarter(
        year,
        quarter
      );
      res.status(result.status).send(result);
    } catch (e) {
      res.status(500).send(e);
      next(e);
    }
  }
);
TeHyratDheInvestimetISPController.get(
  "/api/investimet/sheet/:sheetNo",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { sheetNo } = req.params;
      let result = await ispService.read_one_sheet(sheetNo);
      res.status(result.status).send(result);
    } catch (e) {
      res.status(500).send(e);
      next(e);
    }
  }
);

TeHyratDheInvestimetISPController.get(
  "/api/investimet/tehyrat/:companyName",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      let { companyName } = req.params;
      let result = await ispService.readCompanyIncome(
        companyName
      );

      res.status(result.status).send(result.data);
    } catch (e) {
      res.status(500).send(e);
      next(e);
    }
  }
);

TeHyratDheInvestimetISPController.get(
  "/api/investimet/invest/:companyName",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      let { companyName } = req.params;
      let result = await ispService.readCompanyInvestment(
        companyName
      );

      res.status(result.status).send(result.data);
    } catch (e) {
      res.status(500).send(e);
      next(e);
    }
  }
);
TeHyratDheInvestimetISPController.get(
  "/api/investimet/totalclients/:companyName",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      let { companyName } = req.params;
      let result = await ispService.readCompanyTotalClients(
        companyName
      );

      res.status(result.status).send(result.data);
    } catch (e) {
      res.status(500).send(e);
      next(e);
    }
  }
);
TeHyratDheInvestimetISPController.get(
  "/api/investimet/all_data/:companyName",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      let { companyName } = req.params;
      companyName = companyName.toLowerCase();
      let result = await ispService.readDataAboutISP(
        companyName
      );

      res.status(result.status).send(result.data);
    } catch (e) {
      res.status(500).send(e);
      next(e);
    }
  }
);

TeHyratDheInvestimetISPController.get(
  "/api/investimet/users/:year",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      let { year } = req.params;
      year = year.toLowerCase();
      let result = ispService.readUsersAboutAllISP(year);

      res.status(result.status).send(result.data);
    } catch (e) {
      res.status(500).send(e);
      next(e);
    }
  }
);

TeHyratDheInvestimetISPController.get(
  "/api/investimet/get_operators",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // let result = await TeHyratDheInvestimetISPService.readDataAboutISP(companyName);
      let result = await ispService.getAllOperators();

      res.status(result.status).send(result.data);
    } catch (e) {
      console.log(e, " error");
      next(e);
    }
  }
);
TeHyratDheInvestimetISPController.get(
  "/api/investimet/get_time",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      let result = ispService.getTime();

      res.status(result.status).send(result.data);
    } catch (e) {
      res.status(500).send(e);
      next(e);
    }
  }
);

TeHyratDheInvestimetISPController.get(
  "/api/investimet/get_years",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      let result = ispService.getYears();

      res.status(result.status).send(result.data);
    } catch (e) {
      res.status(500).send(e);
      next(e);
    }
  }
);
