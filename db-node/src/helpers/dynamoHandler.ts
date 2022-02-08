import AWS from "aws-sdk";

const dynamoTable = 'Indigo'
const AWS_REGION = 'us-east-1'

interface DynamoKeys {
    primaryKey: string, 
    sortKey?: string
}

interface DynamoAttributeUpdate {
    attributeName: string,
    attributeValue: AWS.DynamoDB.AttributeValue
}

export class DynamoHandler {
  ddb : AWS.DynamoDB;
  dynamoTable : string = dynamoTable;

  constructor() {
    this.ddb = new AWS.DynamoDB({region: AWS_REGION});
  }

  private _format_keys = (keys: DynamoKeys) => {
    if (keys.sortKey) { 
        return {'PK': {'S': keys.primaryKey},'SK': {'S': keys.sortKey}}
    }
    return {'PK': {'S': keys.primaryKey}}
  }

  getDynamoRecord = async (keys: DynamoKeys) : Promise<AWS.DynamoDB.Types.GetItemOutput> => {
    const dynamoParams: AWS.DynamoDB.Types.GetItemInput = {
      TableName: this.dynamoTable,
      Key: this._format_keys(keys)
    }
    try {
      const response = await this.ddb.getItem(dynamoParams).promise();
      return response;
    } catch (err) {
      console.log(`getDynamoRecord Error: params = ${dynamoParams}`);
      throw err;
    }
  }

  createDynamoRecord = async (record: AWS.DynamoDB.Types.PutItemInputAttributeMap) => {
    const putItemParams = {
      TableName: this.dynamoTable,
      Item: record
    }
    this.ddb.putItem(putItemParams, function (err, data) {
      if (err) {
        console.log("DYNAMO Error", err);
      } else {
        console.log("DYNAMO Success", data);
      }
    });
  };

  updateDynamoRecord = async (keys: DynamoKeys, updateParams: DynamoAttributeUpdate[]) => {
    
    const params : AWS.DynamoDB.Types.UpdateItemInput = {
        TableName: this.dynamoTable,
        Key: this._format_keys(keys),
        UpdateExpression: `SET ${  updateParams.map( x => x.attributeName + ' = ' + ':' + x.attributeName).join(', ') }`,
        ExpressionAttributeValues: Object.fromEntries(updateParams.map(x => [':' + x.attributeName, x.attributeValue]) )
    }
    
    await this.ddb.updateItem(params).promise()
  }
}
