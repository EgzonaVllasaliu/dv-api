import express, { Application, Request, Response, NextFunction } from "express";

import { TelefoniaFixeController } from "./controllers/TelefoniaFixe.controller";
import { TeHyratDheInvestimetISPController } from "./controllers/TeHyratDheInvestimetISP.controller";
import { TelefoniaMobileController } from "./controllers/TelefoniaMobile.controller";
import { ReadFileData } from "./utils/readFileData";

// Boot express
const app: Application = express();
const port = 5000;

// Application routing
app.use("/ping", (req: Request, res: Response, next: NextFunction) => {
  res.status(200).send({ data: "Hello from server" });
});

app.use("/telefonia-fixe", TelefoniaFixeController);
app.use("/telefonia-mobile", TelefoniaMobileController);
app.use("/investimet-isp", TeHyratDheInvestimetISPController);


// Start server
app.listen(port, () => console.log(`Server is listening on port ${port}!`));
