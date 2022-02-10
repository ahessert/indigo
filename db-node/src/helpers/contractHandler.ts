import { Contract, providers } from 'ethers';
import { ALCHEMY_API_KEY, CONTRACT_ADDRESS } from '../environment';

const indigoUnsignedAbi = [
    // Event to listen for
    "event MintModel(string indexed modelNameHash, " 
        + "address indexed author, string modelName, "
        + "uint256 tokenId, string cloneUrl, uint64 ipFee)" ,
    // Get model details to build & Validate purchase receipt
    "function tokenURI(uint256 tokenId) view returns (string)"
];

export const IndigoContract = class {
    provider : providers.BaseProvider;
    contract: Contract;
    currentBlock: number;
    setUpComplete: Promise<void>;

    constructor() {
        this.provider = new providers.AlchemyProvider("ropsten", ALCHEMY_API_KEY); // Using Ropsten ETH testnet
        this.contract = new Contract(CONTRACT_ADDRESS, indigoUnsignedAbi, this.provider);
        this.setUpComplete = this._setBlock();
    }

    private _setBlock = async () => {
        this.currentBlock = await this.provider.getBlockNumber();
        console.log(`Current Block Number: ${this.currentBlock}`);
    }
}
