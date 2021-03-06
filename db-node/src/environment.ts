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
export const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS || '0xcB67767c819e8fC4Bd2b7BF6c2EFE03472D39676'
export const WALLET_PRIVATE_KEY = process.env.PRIVATE_KEY
export const AURORA_URL = process.env.AURORA_URL || "https://testnet.aurora.dev"

// MISC
export const MY_NODE_URL = process.env.MY_NODE_URL ||  "https://hq6elmg3a4.execute-api.us-east-1.amazonaws.com"
