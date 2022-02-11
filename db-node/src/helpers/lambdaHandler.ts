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
            InvokeArgs: JSON.stringify(payload)
        }

        console.log(`Sending New Model ${modelName} to DBT`)

        try {
            const dbtInvocation = await this.lambda.invokeAsync(params).promise();
            console.log(`DBT Invocation succes! Status Code: ${dbtInvocation.Status}`)
        } catch (err) {
            console.log(
                `Error on DBT Invocation.\n` 
              + `\n\tError Code: ${err.code}\n\tMsg: ${err.message}`)
        }
    };
}
