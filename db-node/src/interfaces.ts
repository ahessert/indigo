import AWS from 'aws-sdk'

export interface ModelResults extends AWS.RedshiftData.GetStatementResultResponse {}

export interface EventData {}

export interface DataModel extends EventData {
    modelName: string;
    tokenId: number;
    cloneUrl: string;
    blockNumber: number;
    author: string;
    ipFee: number;
}
