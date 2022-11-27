import { NextFunction, Request, Response, Router } from "express";
import { TeHyratDheInvestimetISPService } from "../services/TeHyratDheInvestimetISP.service";

export const TeHyratDheInvestimetISPController: Router = Router();

TeHyratDheInvestimetISPController.get(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await TeHyratDheInvestimetISPService.read_all_data();

      res.status(result.status).send({
        data: result.data,
      });
    } catch (e) {
      next(e);
    }
  }
);
