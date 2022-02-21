import { Contract, Wallet, providers, getDefaultProvider } from 'ethers';

import { CONTRACT_ADDRESS, AURORA_URL } from '../environment';
import { getWalletPrivateKey } from './secretHandler';

const indigoAbi = [
    // UNSIGNED METHODS / EVENTS
    // Event to listen for triggering build and publish
    "event MintModel(string indexed modelNameHash, " 
        + "address indexed author, string modelName, "
        + "uint256 tokenId, string cloneUrl, uint64 ipFee)" ,
    // Get model details to build & Validate purchase receipt
    "function tokenURI(uint256 tokenId) view returns (string)",


    // SIGNED METHODS
    "function publishModel(string modelName, string description, uint64 gasFee, uint64 ipFee)",
    "function burnReceipt(uint160 tokenId, string modelName) returns (bool)"
];

export class IndigoContract {
    provider : providers.BaseProvider;
    contract: Contract;
    currentBlock: number;
    setUpComplete: Promise<void>;
    private signedProvider: Wallet;

    constructor() {
        this.setUpComplete = this._setUp();
    }

    private _setUp = async () => {
        const privateKey = await getWalletPrivateKey()

        this.provider = getDefaultProvider(AURORA_URL);
        this.signedProvider = new Wallet(privateKey, this.provider)
        this.contract = new Contract(CONTRACT_ADDRESS, indigoAbi, this.signedProvider);

        this.currentBlock = await this.provider.getBlockNumber();
        console.log(`Current Block Number: ${this.currentBlock}`);
    }
}
