import AWS from "aws-sdk";

import { ModelResults } from "../interfaces";

const redshiftClusterID = 'redshift-cluster-1'
const redshiftUser = 'andrewhessert'
const redshiftDB = 'dev'
const awsRegion = 'us-east-1'

export class RedshiftHandler {
    private redshiftClient : AWS.RedshiftData;
  
    constructor() {
      this.redshiftClient = new AWS.RedshiftData({region: awsRegion});
    };
    
    selectTable = async (tableName: String) => {
        const query : string = `SELECT * FROM ${tableName} LIMIT 50`
        console.log(query)
        const executionObject : AWS.RedshiftData.ExecuteStatementInput = {
            ClusterIdentifier: redshiftClusterID,
            DbUser: redshiftUser,
            Database: redshiftDB,
            Sql: query
        }
        const redshiftResponse = await this.redshiftClient.executeStatement(executionObject, 
            (err, data) => {
            if (err) { console.log(err) }
        }).promise()

        const nonNullExecutionId = redshiftResponse.Id!
        while (await this.getQueryStatus(nonNullExecutionId) !== "FINISHED") {
            console.log("WHILE LOOP")
            await new Promise(resolve => setTimeout(resolve, 200))
        }
        const queryResult : ModelResults = await this.getQueryResults(nonNullExecutionId)
        return queryResult
    };

    private getQueryStatus = async (executionId : string) : Promise<string> => {
        const queryStatus = await this.redshiftClient.describeStatement({Id: executionId}).promise()
        const notNullQueryStatus : string = queryStatus.Status!
        return notNullQueryStatus
    }

    private getQueryResults = async (executionId : string) : Promise<AWS.RedshiftData.GetStatementResultResponse> => {
        const queryResult  = await this.redshiftClient.getStatementResult({Id: executionId}).promise()
        return queryResult
    };

}
