import { NextFunction, Request, Response, Router } from "express";
import { TelefoniaMobileService } from "../services/TelefoniaMobile.service";

export const TelefoniaMobileController: Router = Router();

TelefoniaMobileController.get(
  "/api/sheet/:sheetName",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { sheetName } = req.params;
      let result = await TelefoniaMobileService.read_one_sheet(sheetName);
      res.status(result.status).send(result);
    } catch (e) {
      next(e);
    }
  }
);
