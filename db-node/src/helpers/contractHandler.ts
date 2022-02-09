import { Contract, providers } from 'ethers';

const ALCHEMY_API_KEY : string = "8OYhDuflJekreW0vanJqrjbOjit3CS3M";
const indigoAddress : string = '0xdae7bb93969323a663177b952ee58a8493d072de';
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
        this.contract = new Contract(indigoAddress, indigoUnsignedAbi, this.provider);
        this.setUpComplete = this._setBlock();
    }

    private _setBlock = async () => {
        this.currentBlock = await this.provider.getBlockNumber();
        console.log(`Current Block Number: ${this.currentBlock}`);
    }
}
