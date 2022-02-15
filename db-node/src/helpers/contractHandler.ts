import { Contract, Wallet, providers } from 'ethers';
import { 
    ALCHEMY_API_KEY, 
    CONTRACT_ADDRESS, 
    WALLET_PRIVATE_KEY 
} from '../environment';

const indigoAbi = [
    // UNSIGNED METHODS / EVENTS
    // Event to listen for triggering build and publish
    "event MintModel(string indexed modelNameHash, " 
        + "address indexed author, string modelName, "
        + "uint256 tokenId, string cloneUrl, uint64 ipFee)" ,
    // Get model details to build & Validate purchase receipt
    "function tokenURI(uint256 tokenId) view returns (string)",


    // SIGNED METHODS
    "functon publishModel(string indexed modelName, string description, uint64 gasFee)",
    "function burnReceipt(uint160 tokenId, string modelName) returns (bool)"
];

export class IndigoContract {
    provider : providers.BaseProvider;
    contract: Contract;
    currentBlock: number;
    setUpComplete: Promise<void>;
    private signedProvider: Wallet;

    constructor() {
        this.provider = new providers.AlchemyProvider("ropsten", ALCHEMY_API_KEY); // Using Ropsten ETH testnet
        this.signedProvider = new Wallet(WALLET_PRIVATE_KEY, this.provider)
        this.contract = new Contract(CONTRACT_ADDRESS, indigoAbi, this.signedProvider);
        this.setUpComplete = this._setBlock();
    }

    private _setBlock = async () => {
        this.currentBlock = await this.provider.getBlockNumber();
        console.log(`Current Block Number: ${this.currentBlock}`);
    }
}
