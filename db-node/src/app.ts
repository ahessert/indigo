import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
} from "aws-lambda";

import { RedshiftHandler } from "./helpers/redshiftHandler";
import { DynamoHandler } from "./helpers/dynamoHandler"
import { ModelResults } from "./interfaces";
import { DynamoDB } from "aws-sdk";

const redshiftHandler = new RedshiftHandler()
const dynamo = new DynamoHandler()

type LambdaResponse = {
  statusCode: number,
  headers: {},
  body: string
}

export const helloWorldHandler = 
    async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  return lambdaResponse(
    200, {message: "Hello World"}
  );
}

export const getDataHandler = 
    async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  console.log("Recieved request")
  console.log(event.queryStringParameters)

  if (
    event.queryStringParameters == null ||
    event.queryStringParameters.modelName == null ||
    event.queryStringParameters.paymentReceipt == null
    ) {
    return lambdaResponse(
      404, 
      {
        message: 
        "Error: Missing URL query parameters."
      + "Must include 'modelName' and 'paymentReceipt'"
      }
    )
  }

  const modelName : string = event.queryStringParameters.modelName;
  const paymentReceipt : string = event.queryStringParameters.paymentReceipt;
  const availableModels : string[] = await getAvailableModels()

  if (!availableModels.includes(modelName)) {
    return lambdaResponse(
      404, {message: `Error: modelName '${modelName}' does not exist`}
    );
  }
  if (!validPayment(paymentReceipt)) {
    return lambdaResponse(
        404, {message: `Error: Invalid payment reciept '${paymentReceipt}'`}
    );
  }

  const modelData : ModelResults = await getDataFromModel(modelName)
  
  return lambdaResponse(
    200, modelData
  );
}

function lambdaResponse(status: number, body: {}): LambdaResponse {
  return {
    statusCode: status,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify(body)
  };
}

const getAvailableModels = async () : Promise<string[]> => {
  const modelRecords = await dynamo.queryDynamoRecords('Model')
  return modelRecords.Items.map(
    (record : DynamoDB.AttributeMap) : string => {
      return record['modelName'].S
    })
}

const validPayment = (paymentReceipt: String) : Boolean => {
    return paymentReceipt === "paid"
}

const getDataFromModel = async (modelName: String) : Promise<ModelResults> => {
  const modelData : ModelResults = await redshiftHandler.selectTable(modelName);
  return modelData;
}
