# Database Node

## Introduction

This program runs the backend of the decentralized Indigo marketplace. Anyone can deploy and register their own node on the Indigo Network. DB Nodes are automatically compensated for building and serving data models that are minted on chain. 

Prior to registering your node on the Indigo Network, DB Nodes must stake 1000 INDG which functions a refundable deposit to deter bad actors on the network.

-----
## Architecture

The DB Node is a serverless application with three disctinct modules.
1. Poll Contract Events - This watches the Aurora network for new data models minted on the Indigo smart contract, queues them for building in the data pipeline, and publishes their availability on the Indigo marketplace contract.
2. Build Model - This is a python module that uses [DBT](https://docs.getdbt.com/docs/introduction) to download and execute remote SQL code populating the data warehouse with refined data assets.
3. Get Data API - This endpoint is where customers retrieve data payloads of the models they purchased. Customers receive a receipt in the form of an NFT to prove that they paid for access the model. The database node verifies that the receipt is authentic and burns it after the data is delivered.

Current backend services relied on are DynamoDB and Redshift.

This entire stack is built using the cloudformation template `./db-node/template.yml`

## Building the Stack

> \>  `clone https://github.com/ahessert/indigo.git`  
> \>  `cd db-node`  
> \>  `npm run build`  
> \>  `sam build`  
> \>  `sam deploy --guided`

Dependencies: aws-cli, aws-sam, node12.x, docker, aws account

### Coming Soon

- Validation module for confirming the remote repository conforms to [developer documentation](https://github.com/ahessert/indigo_developer_template/blob/main/README.md)
- Indigo Data Sandbox for developing new data models
- Dynamic fee calculation for data models based on compute and storage