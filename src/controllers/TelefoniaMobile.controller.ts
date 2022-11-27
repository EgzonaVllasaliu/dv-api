import { NextFunction, Request, Response, Router } from "express";
import { TelefoniaMobileService } from "../services/TelefoniaMobile.service";

export const TelefoniaMobileController: Router = Router();

TelefoniaMobileController.get(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await TelefoniaMobileService.read_all_data();

      res.status(result.status).send({
        data: result.data,
      });
    } catch (e) {
      next(e);
    }
  }
);
