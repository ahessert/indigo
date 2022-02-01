import AWS from 'aws-sdk'

export interface ModelResults extends AWS.RedshiftData.GetStatementResultResponse {}
