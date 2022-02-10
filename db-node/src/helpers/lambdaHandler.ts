import  AWS from "aws-sdk";

import { AWS_REGION, DBT_LAMBDA_ARN } from '../environment';

export class LambdaHandler {
    lambda: AWS.Lambda;

    constructor() {
        this.lambda = new AWS.Lambda({region: AWS_REGION})
    }

    invokeDBT = async (modelName: string, packageList: string[])  => {

        const payload = {
            modelName: modelName,
            packageList: packageList
        };
        
        const params = {
            FunctionName: DBT_LAMBDA_ARN,
            InvokeArgs: payload
        }

        console.log(`Sending New Model ${modelName} to DBT`)

        this.lambda.invokeAsync(params);
    };
}
