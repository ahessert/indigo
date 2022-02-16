import { ScheduledEvent, Context } from 'aws-lambda'

import { DynamoHandler, DynamoKeys } from './helpers/dynamoHandler';
import { IndigoContract } from './helpers/contractHandler';
import { MintModelProcessor } from './pipeline/newModel';

const dynamo = new DynamoHandler();
const indigo = new IndigoContract();

enum ContractEvent {
    MintModel="MintModel",
}

const EventPoll = class {
    eventToPoll: ContractEvent;
    eventProcessor : typeof MintModelProcessor;
    pollKey : DynamoKeys = {primaryKey: 'LastBlockQueried'}

    constructor(contractEvent: ContractEvent) {
        this.eventToPoll = contractEvent;
        this.eventProcessor = MintModelProcessor;
        this.pollKey.sortKey = contractEvent;
    }

    private _getContractFilter() {
        if (this.eventToPoll === "MintModel") {
            return indigo.contract.filters.MintModel()
        } else {
            throw(Error(`: No filter for event '${this.eventToPoll}'`))
        }
    }

    private _getLastBlockQueried = async () : Promise<number> => {
        const response = await dynamo.getDynamoRecord(this.pollKey)
        
        if (!response.Item) {
            console.log(`LastBlockQueried Not Found: Initializing poll to blocknumber 0`)
            dynamo.createDynamoRecord({
                PK: {S: this.pollKey.primaryKey},
                SK: {S: this.pollKey.sortKey},
                blockNumber: {N: '0'}
            })
            return 0
        }
    
        const lastBlockQueried = parseInt(response.Item.blockNumber.N);
        console.log(`Block Number of last query: ${lastBlockQueried}`);
        return lastBlockQueried
    }

    private _updateLastBlockQueried = async (blockNumbers : number[]) => {
        const lastBlock = Math.max(...blockNumbers)
        const updateParams = {
            attributeName: "blockNumber",
            attributeValue: {"N": `${lastBlock}`}
        }
    
        await dynamo.updateDynamoRecord(this.pollKey, [updateParams]);
    }

    run = async () => {
        await indigo.setUpComplete
        const blockNumbers : number[] = [indigo.currentBlock];

        const eventFilter = this._getContractFilter();
        const lastBlockQueried = await this._getLastBlockQueried()
        const query = indigo.contract.queryFilter(eventFilter,lastBlockQueried)
        
        await query.then(async (data) => {
            console.log(`Found ${data.length} ${this.eventToPoll} events`)
            for (let i = 0; i < data.length; i++) {
                const eventProcessor = new this.eventProcessor(data[i].args!, data[i].blockNumber)
                await eventProcessor.processEvent()
                eventProcessor.publishModel(indigo)
                blockNumbers.push(data[i].blockNumber)
            }
        })
        
        await this._updateLastBlockQueried(blockNumbers);
    }
}

export const pollContractEvents = (event: ScheduledEvent, context: Context) => {
    const contractEvent = ContractEvent["MintModel"];
    const eventPoll = new EventPoll(contractEvent);
    eventPoll.run();
}
