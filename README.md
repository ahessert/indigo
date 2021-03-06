# Introduction

Indigo is an Open Source decentralized marketplace for refined data models on the NEAR blockchain.

# Repo structure

There are three key components to the Indigo dApp.

1. Indigo Contract ([contracts/](https://github.com/ahessert/indigo/tree/main/contracts#readme))
   - The key uncensorable element that gaurantees ownership and payments for data models. It is deployed on the NEAR blockchain using Aurora. 
2. Database Node ([db-node/](https://github.com/ahessert/indigo/tree/main/db-node#readme))
   - The application the removes the data infrastructure burden and automates the data pipeline for developers. It builds the data models and serves them to the customers. 
3. Client ([frontend/](https://github.com/ahessert/indigo/tree/main/frontend#readme))
   - The browser application that makes it simple for customers to access the marketplace communicating with both the Indigo Contract and Database Nodes. 
