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

TelefoniaMobileController.get(
  "/api/Ndarja_e_tregut/:operator_name",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      let {operator_name} =  req.params;
      console.log('Operator Name: ',operator_name)
      const result = await TelefoniaMobileService.get_market_division(operator_name);

      res.status(result.status).send({
        data: result.data,
      });
    } catch (e) {
      next(e);
    }
  }
);
