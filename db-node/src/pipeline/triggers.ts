// import {
//     APIGatewayProxyEvent,
//     APIGatewayProxyResult,
//     SQSEvent
//   } from "aws-lambda";

import { Contract, getDefaultProvider } from 'ethers';
import { SqsHandler } from '../sqsHandler';

const sqsHandler = new SqsHandler()

const AURORA_URL : string = "http://127.0.0.1:8545";
const indigoAddress : string = '0x9846265213c3675cD2D7B352990F722Fc342D3D2';
const indigoUnsignedAbi = [
    // Event to listen for
    "event MintModel(string indexed _modelName, " 
        + "address indexed _author, uint256 tokenId, " 
        + "string _cloneUrl)",
    // Get model details to build & Validate purchase receipt
    "function tokenURI(uint256 tokenId) view returns (string)"
];

const getLastBlockQueried = (lastBlockMessages : AWS.SQS.Message[] | null ) : number => {
    if (lastBlockMessages?.length) {
        const blockNumbers = lastBlockMessages.map(function(msg) {
            return parseInt(msg.MessageAttributes!.blockNumber.StringValue!)
        })
        return Math.max(...blockNumbers)
    } else {
        return 0
    }
    
}

const run = async () => {
    const provider = getDefaultProvider(AURORA_URL);
    const indigoContract = new Contract(indigoAddress, indigoUnsignedAbi, provider);

    const newModelFilter = indigoContract.filters.MintModel();

    const lastBlockMessages = await sqsHandler.getLastBlockMessages();
    const lastBlockQueried = getLastBlockQueried(lastBlockMessages)
    console.log(`Block Number of last event query: ${lastBlockQueried}`)

    const currentBlock : Promise<number> = provider.getBlockNumber();

    indigoContract.queryFilter(newModelFilter, lastBlockQueried).then(
        async (data) => {
            const blockNumbers : number[] = [await currentBlock];

            for (let i = 0; i < data.length; i++) {
                processNewModel(data[i].args!, data[i].blockNumber)
                blockNumbers.push(data[i].blockNumber)
            }

            const lastBlock = Math.max(...blockNumbers);
            sqsHandler.sendLastBlockMessage(lastBlock);
            sqsHandler.deleteMessages(lastBlockMessages);
    })
    
    const processNewModel = async (
        [_modelName, _author, tokenId, _cloneUrl] : ReadonlyArray<any>,
        blockNumber : number) => {
        
        console.log(`New Model NFT -> ${ tokenId } by ${ _author} at ${_cloneUrl} on block ${blockNumber}`);
        const tokenURI = await indigoContract.tokenURI(tokenId);
        console.log(tokenURI);
        sqsHandler.sendNewModelMessage(tokenId, _cloneUrl, tokenURI, blockNumber);
    }
}

run()