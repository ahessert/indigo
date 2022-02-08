import { Contract, getDefaultProvider, providers } from 'ethers';

const AURORA_URL : string = "http://127.0.0.1:8545";
const indigoAddress : string = '0xa0DBB75783B34aB2e84b12F9ed8007eCc16c47F4';
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
        this.provider = getDefaultProvider(AURORA_URL);
        this.contract = new Contract(indigoAddress, indigoUnsignedAbi, this.provider);
        this.setUpComplete = this._setBlock();
    }

    private _setBlock = async () => {
        this.currentBlock = await this.provider.getBlockNumber();
        console.log(`Current Block Number: ${this.currentBlock}`);
    }
}
