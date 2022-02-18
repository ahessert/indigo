// AWS
export const AWS_REGION = process.env.AWS_REGION || 'us-east-1'

// Lambda
export const DBT_LAMBDA_ARN =  process.env.DBT_LAMBDA_ARN || 'arn:aws:lambda:us-east-1:754091198799:function:Indigo-DbtBuild-Aysdn3dgoTp2'

// S3
export const INDIGO_BUCKET = 'indigo-db-node';
export const DBT_S3_DIR = 'dbt'
export const DBT_PACKAGES_FILE = 'packages.json'

// Redshift 
export const REDSHIFT_CLUSTER_ID = process.env.REDSHIFT_CLUSTER_ID || 'redshift-cluster-1'
export const REDSHIFT_USER = process.env.REDSHIFT_USER || 'andrewhessert'
export const REDSHIFT_DB = process.env.REDSHIFT_DB || 'dev'

// Dynamo
export const DYNAMO_TABLE = process.env.DYNAMO_TABLE || 'Indigo'

// Blockchain
export const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY || "8OYhDuflJekreW0vanJqrjbOjit3CS3M"
export const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS || '0x438914A9e5d7e422de0eE0dA7B3A498e50403f43'
export const WALLET_PRIVATE_KEY = process.env.PRIVATE_KEY

// MISC
export const MY_NODE_URL = process.env.MY_NODE_URL ||  "https://hq6elmg3a4.execute-api.us-east-1.amazonaws.com"
