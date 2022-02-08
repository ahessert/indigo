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

export interface EventProcessor {
    pollProgressPK: string;
    formatEvent([...args]: ReadonlyArray<any>, blockNumber : number) : EventData;
    processEvent(event: EventData) : void;
}
