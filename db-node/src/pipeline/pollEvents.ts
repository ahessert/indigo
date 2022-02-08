import { DynamoHandler } from '../helpers/dynamoHandler';
import { EventProcessor } from '../interfaces';
import { IndigoContract } from '../helpers/contractService';
import { MintModelProcessor } from './newModel';

const dynamo = new DynamoHandler();
const indigo = new IndigoContract();

enum ContractEvent {
    MintModel="MintModel",
    // New events to handle
}
const EventProcessors : Record<ContractEvent,EventProcessor> = {
    MintModel: MintModelProcessor
}

const EventPoll = class {
    eventToPoll: ContractEvent;
    eventProcessor : EventProcessor;

    constructor(contractEvent: ContractEvent) {
        this.eventToPoll = contractEvent;
        this.eventProcessor = EventProcessors[contractEvent]
    }

    private _getContractFilter() {
        if (this.eventToPoll === "MintModel") {
            return indigo.contract.filters.MintModel()
        } else {
            throw(Error(`: No filter for event '${this.eventToPoll}'`))
        }
    }

    private _getLastBlockQueried = async () : Promise<number> => {
        const key = {primaryKey: this.eventProcessor.pollProgressPK}
        const response = await dynamo.getDynamoRecord(key)
        
        if (!response.Item) {
            console.log(`LastBlockQueried Not Found: Initializing poll to blocknumber 0`)
            dynamo.createDynamoRecord({PK:{S:key.primaryKey},blockNumber: {N: '0'}})
            return 0
        }
    
        const lastBlockQueried = parseInt(response.Item.blockNumber.N);
        console.log(`Block Number of last query: ${lastBlockQueried}`);
        return lastBlockQueried
    }

    private _updateLastBlockQueried = async (blockNumbers : number[]) => {
        const lastBlock = Math.max(...blockNumbers)
        const key = {primaryKey: this.eventProcessor.pollProgressPK};
        const updateParams = {
            attributeName: "blockNumber",
            attributeValue: {"N": `${lastBlock}`}
        }
    
        await dynamo.updateDynamoRecord(key, [updateParams]);
    }

    run = async () => {
        const blockNumbers : number[] = [indigo.currentBlock];

        const eventFilter = this._getContractFilter();
        const lastBlockQueried = await this._getLastBlockQueried()
        const query = indigo.contract.queryFilter(eventFilter,lastBlockQueried)
        
        await query.then((data) => {
            console.log(`Found ${data.length} ${this.eventToPoll} events`)
            for (let i = 0; i < data.length; i++) {
                const newModel = this.eventProcessor.formatEvent(data[i].args!, data[i].blockNumber)
                this.eventProcessor.processEvent(newModel)
                blockNumbers.push(data[i].blockNumber)
            }
        })
        
        this._updateLastBlockQueried(blockNumbers);
    }
}

const pollContractEvents = async () => {
    const contractEvent = ContractEvent["MintModel"];
    const eventPoll = new EventPoll(contractEvent);
    await indigo.setUpComplete;
    await eventPoll.run();
}


pollContractEvents()
