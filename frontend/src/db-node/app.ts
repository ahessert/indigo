import { Server } from "typescript-rest";
import express, {Router, Request, Response, Application} from "express";

import { RedshiftHandler } from "./redshiftHandler"
import { ModelResults } from "./interfaces";

const redshiftHandler = new RedshiftHandler()

interface GetDataQuery {
  modelName: string;
  paymentReceipt: string;
}

const HelloWorld = (req: Request, res: Response) => {
  return res.status(200).json({
    message: "Hello World"
  });
}

const GetData = async (req: Request<unknown, unknown, unknown, GetDataQuery>, res: Response) => {
  console.log("Recieved request")
  console.log(req.query)

  const modelName: String = req.query['modelName']
  const paymentReciept: String = req.query['paymentReceipt']

  if (!PollAvailableModels().includes(modelName)) {
    return res.status(400).json({
        Error: `modelName '${modelName}' not found`
    });
  }

  if (!validPayment(paymentReciept)) {
    return res.status(400).json({
        Error: `Invalid payment reciept '${paymentReciept}'`
    });
  }

  const modelData : ModelResults = await getDataFromModel(modelName)
  return res.status(200).json({
        modelData: modelData
    });
}

const PollAvailableModels = () : String[] => {
    return ["blocks"]
}

const validPayment = (paymentReceipt: String) : Boolean => {
    return paymentReceipt === "paid"
}

const getDataFromModel = async (modelName: String) : Promise<ModelResults> => {
  const modelData : ModelResults = await redshiftHandler.selectTable(modelName);
  return modelData;
}

const router = Router();
router.get('/', HelloWorld);
router.get('/get_data', GetData)

const app: Application = express().use(router);
Server.buildServices(app);

app.listen(3000, function() {
    console.log('DB Node API listening on port 3000!');
});