import {Server} from "typescript-rest";
import express, {Router, Request, Response, Application} from "express";

const CODE_ADDRESS: string = "ahessert/dune-api"

const HelloWorld = (req: Request, res: Response) => {
  return res.status(200).json({
    message: "Hello World"
  });
}

const DownloadCode = (req: Request, res: Response) => {
  const modelName = req.query.model_name;
  const receipt = req.query.receipt;

  res.status(200).json({
    code_address: CODE_ADDRESS
  });

  return res;
}

const router = Router();
router.get('/', HelloWorld);
router.get('/download_code', DownloadCode)

const app: Application = express().use(router);
Server.buildServices(app);

app.listen(3000, function() {
  console.log('Rest Server listening on port 3000!');
});
