import { S3Handler } from "../helpers/s3Handler";
import { LambdaHandler } from "../helpers/lambdaHandler";
import { DynamoHandler } from "../helpers/dynamoHandler";
import { IndigoContract } from "../helpers/contractHandler";
import { DataModel } from "../interfaces";
import { DBT_S3_DIR, DBT_PACKAGES_FILE } from "../environment";

const s3 = new S3Handler();
const lamba = new LambdaHandler();
const dynamo = new DynamoHandler();

export class MintModelProcessor {
    newModel: DataModel;
    gasFee = 5;
    modelDescription = {  // Hard coded dummy decription
        text: "NEAR users defi dimensional model.",
        symbols: ["near", "aroura"]
    }

    constructor (event_args : ReadonlyArray<any>, blockNumber : number) {
        const [
            modelNameHash, 
            authorHash, 
            modelName, 
            tokenId, 
            cloneUrl, 
            ipFee
        ] = [...event_args]

        this.newModel = {
            modelName: modelName,
            author: authorHash,
            tokenId: tokenId,
            cloneUrl: cloneUrl,
            ipFee: ipFee,
            blockNumber: blockNumber
        }
    }

    private _isNewModel = async (tokenId : number) : Promise<boolean> => {
        const compositeKey = {primaryKey:'Model', sortKey: tokenId.toString()};
        const response = await dynamo.getDynamoRecord(compositeKey)
        if (response.Item) {
            return false
        }
        return true
    }

    private _modelAttributes = () : AWS.DynamoDB.Types.PutItemInputAttributeMap => {
        return {
            'PK': {
                S: `Model`
            },
            'SK': {
                S: this.newModel.tokenId.toString()
            },
            'authorHash': {
                S: this.newModel.author
            },
            'modelName': {
                S: this.newModel.modelName
            },
            'cloneUrl': {
                S: this.newModel.cloneUrl
            },
            'ipFee': {
                N: String(this.newModel.ipFee)
            },
            'blockNumber': {
                N: String(this.newModel.blockNumber)
            },
            'createdAt': {
                S: Date.now().toString()
            }
        }
    }

    private _saveNewModel = async () => {
        dynamo.createDynamoRecord(this._modelAttributes())
    }

    processEvent = async () => {
        console.log(`Process ${this.newModel.modelName}`
        + ` by ${this.newModel.author} at ${this.newModel.cloneUrl}` 
        + ` on block ${this.newModel.blockNumber}`);

        if (! await this._isNewModel(this.newModel.tokenId) ) {
            console.log("Model already processed. No updates necessary.")
            return
        }

        await Dbt.sendToDBT(this.newModel)
        await this._saveNewModel()
    }

    publishModel = async (indigo: IndigoContract) => {
        try {
            const txResponse = await indigo.contract.publishModel(
                this.newModel.modelName,
                JSON.stringify(this.modelDescription),
                this.gasFee,
                this.newModel.ipFee
            )
            console.log(`Publish SUCCESS: View on etherscan link below:\n\t`
                        +`https://testnet.aurorascan.dev/tx/${txResponse.hash}`)
        } catch (err) {
            console.log(`Error in publishModel\n${err}`)
        }
    }
}

class Dbt {
    static updatePackages = async (cloneUrl : string) : Promise<string[]> => {
        let dbtPackages : {packages: string[]} = {packages: []};
        const packagesFile = await s3.getIfExists(`${DBT_S3_DIR}/${DBT_PACKAGES_FILE}`);
        
        if (packagesFile) {
            dbtPackages = JSON.parse(packagesFile.Body.toString());
        }

        if (dbtPackages.packages.includes(cloneUrl)) {
            return dbtPackages.packages
        }
        
        dbtPackages.packages.push(cloneUrl)
        await s3.createS3(`${DBT_S3_DIR}/${DBT_PACKAGES_FILE}`, JSON.stringify(dbtPackages))
        return dbtPackages.packages
    }

    static sendToDBT = async (dataModel: DataModel) => {
        const packageList = await Dbt.updatePackages(dataModel.cloneUrl);
        console.log(packageList)
        lamba.invokeDBT(dataModel.modelName, packageList);
    }
}
