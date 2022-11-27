import { NextFunction, Request, Response, Router } from "express";
import { TelefoniaFixeService } from "../services/TelefoniaFixe.service";

export const TelefoniaFixeController: Router = Router();

TelefoniaFixeController.get(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await TelefoniaFixeService.read_all_data();

      res.status(result.status).send({
        data: result.data,
      });
    } catch (e) {
      next(e);
    }
  }
);
