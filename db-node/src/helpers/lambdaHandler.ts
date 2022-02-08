import  AWS from "aws-sdk";

const DBT_LAMBDA = "DBT"
const AWS_REGION = 'us-east-1'

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
            FunctionName: DBT_LAMBDA,
            InvokeArgs: payload
        }

        console.log(`Sending New Model ${modelName} to DBT`)

        this.lambda.invokeAsync(params);
    };
}
