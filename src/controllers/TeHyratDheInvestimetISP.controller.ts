import { NextFunction, Request, Response, Router } from "express";
import { TeHyratDheInvestimetISPService } from "../services/TeHyratDheInvestimetISP.service";

export const TeHyratDheInvestimetISPController: Router = Router();

TeHyratDheInvestimetISPController.get(
  "/api/investimet/:sheetNo",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const {sheetNo} = req.params;
      const result = await TeHyratDheInvestimetISPService.read_all_data();

      res.status(result.status).send({
        data: result.data,
      });
    } catch (e) {
      next(e);
    }
  }
);
