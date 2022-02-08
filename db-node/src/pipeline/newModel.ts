import { S3Handler } from "../helpers/s3Handler";
import { LambdaHandler } from "../helpers/lambdaHandler";
import { DynamoHandler } from "../helpers/dynamoHandler";
import { DataModel, EventProcessor } from "../interfaces"


const DBT_S3_DIR = 'dbt'
const PACKAGES_FILE = 'packages.json'

const s3 = new S3Handler();
const lamba = new LambdaHandler();
const dynamo = new DynamoHandler();


export const MintModelProcessor : EventProcessor = class {
    static pollProgressPK = "LastBlockQueried:MintModelPoll";

    static isNewModel = async (tokenId : number) : Promise<boolean> => {
        const primaryKey = `Model_${tokenId}_v0`;
        const response = await dynamo.getDynamoRecord({primaryKey:primaryKey})
        if (response.Item) {
            return false
        }
        return true
    }

    static modelAttributes = (newModel: DataModel) : 
        AWS.DynamoDB.Types.PutItemInputAttributeMap => {
        return {
            'PK': {
                S: `Model_${newModel.tokenId}_v0`
            },
            'authorHash': {
                S: newModel.author
            },
            'modelName': {
                S: newModel.modelName
            },
            'cloneUrl': {
                S: newModel.cloneUrl
            },
            'ipFee': {
                N: String(newModel.ipFee)
            },
            'blockNumber': {
                N: String(newModel.blockNumber)
            },
            'createdAt': {
                S: Date.now().toString()
            }
          }
        }

    static saveNewModel = async (newModel: DataModel) => {
        dynamo.createDynamoRecord(this.modelAttributes(newModel))
    }

    static formatEvent = (
        [modelNameHash, authorHash, modelName, tokenId, cloneUrl, ipFee] : ReadonlyArray<any>,
        blockNumber : number
    ) : DataModel => {
        return {
            modelName: modelName,
            author: authorHash,
            tokenId: tokenId,
            cloneUrl: cloneUrl,
            ipFee: ipFee,
            blockNumber: blockNumber
        }
    }

    static processEvent = async (newModel: DataModel) => {
        console.log(`Process ${newModel.modelName}`
        + ` by ${ newModel.author} at ${newModel.cloneUrl}` 
        + ` on block ${newModel.blockNumber}`);

        if (! await this.isNewModel(newModel.tokenId) ) {
            console.log("Model already processed. No updates necessary.")
            return
        }

        await Dbt.sendToDBT(newModel)
        await this.saveNewModel(newModel)
    }

}

class Dbt {
    static updatePackages = async (cloneUrl : string) : Promise<string[]> => {
        let dbtPackages : {packages: string[]} = {packages: []};
        const packagesFile = await s3.getIfExists(`${DBT_S3_DIR}/${PACKAGES_FILE}`);
        
        if (packagesFile) {
            dbtPackages = JSON.parse(packagesFile.Body.toString());
        }

        if (dbtPackages.packages.includes(cloneUrl)) {
            return dbtPackages.packages
        }
        
        dbtPackages.packages.push(cloneUrl)
        await s3.createS3(`${DBT_S3_DIR}/${PACKAGES_FILE}`, JSON.stringify(dbtPackages))
        return dbtPackages.packages
    }

    static sendToDBT = async (dataModel: DataModel) => {
        const packageList = await this.updatePackages(dataModel.cloneUrl);
        console.log(packageList)
        lamba.invokeDBT(dataModel.modelName, packageList);
    }
}
