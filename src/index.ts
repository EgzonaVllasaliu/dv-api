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
app.use("/invesimet-isp", TeHyratDheInvestimetISPController);
// app.get("/api/investimet/:sheetNo",TeHyratSheetController);
app.get("/api/investimet/:sheetNo", (req,res) => {
    let d = ReadFileData("TeHyratDheInvestimetISP.xlsx");
     
    let sheetNo = req.params.sheetNo;
    for( let sheet of d){
      if(sheet.name.replace(/ /g,'') == sheetNo){
        return res.send(sheet);
      }
    }
    res.send('Not found');
    
    //Idea: Njejte si ne file per telefoni fixe   
})

// Start server
app.listen(port, () => console.log(`Server is listening on port ${port}!`));
