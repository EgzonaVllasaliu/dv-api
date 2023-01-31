import { NextFunction, Request, Response, Router } from "express";
import { TelefoniaFixeService } from "../services/TelefoniaFixe.service";

export const TelefoniaFixeController: Router = Router();

TelefoniaFixeController.get(
  "/:name",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name } = req.params;

      // let result = await TelefoniaFixeService.read_sheet_data(name);

      res.status(200).send("Something");
    } catch (e) {
      next(e);
    }
  }
);
