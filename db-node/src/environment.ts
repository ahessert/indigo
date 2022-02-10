// AWS
export const AWS_REGION = process.env.AWS_REGION || 'us-east-1'

// Lambda
export const DBT_LAMBDA_ARN =  process.env.DBT_LAMBDA_ARN || 'DBT'

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
export const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS || '0xdae7bb93969323a663177b952ee58a8493d072de'
