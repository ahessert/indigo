import AWS from "aws-sdk";

import { ModelResults } from "../interfaces";
import { 
    AWS_REGION, 
    REDSHIFT_CLUSTER_ID, 
    REDSHIFT_USER, 
    REDSHIFT_DB 
} from '../environment';

export class RedshiftHandler {
    private redshiftClient : AWS.RedshiftData;
  
    constructor() {
      this.redshiftClient = new AWS.RedshiftData({region: AWS_REGION});
    };
    
    selectTable = async (tableName: String) => {
        const query : string = `SELECT * FROM ${tableName} LIMIT 50`
        console.log(query)
        const executionObject : AWS.RedshiftData.ExecuteStatementInput = {
            ClusterIdentifier: REDSHIFT_CLUSTER_ID,
            DbUser: REDSHIFT_USER,
            Database: REDSHIFT_DB,
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
