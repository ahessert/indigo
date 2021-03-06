import { ethers, getDefaultProvider } from 'ethers';
import indigoAbi from 'utils/abi.json';
import formatModelDescription from '../utils/formatModelDescription';
import { CHAIN_ID, CHAIN_ID_0x } from 'utils/constants';
declare let window: any;

const indigoAddress = '0xcB67767c819e8fC4Bd2b7BF6c2EFE03472D39676';
const tokenAddress = '0x169aD4fe902087b916E72917AB9b811BE29b2022';
const networkUrl = 'https://testnet.aurora.dev';

// type PublishedModel = {
//   modelName: string; // this is a hash .. need to add readable field
//   address: string; //hashedNodeAddress
//   url: string; // nodeUrl **SAVE IN  BACKGROUND FOR getData request**,
//   description: string; //model description .. currently hard-coded
//   gasConsumed: number;
// };

function useContract(provider: any, signer: any) {
  const indigoContract = new ethers.Contract(
    indigoAddress,
    indigoAbi,
    signer ?? provider,
  );

  function unsignedContract() : ethers.Contract {
    const provider = getDefaultProvider(networkUrl);
    return new ethers.Contract(
      indigoAddress,
      indigoAbi,
      provider,
    );
  }

  async function getChainId(){
    const network = await provider.getNetwork();
    return network.chainId;
  }

  async function changeNetwork() {
    const chainId = await getChainId();
    if (chainId !== CHAIN_ID) {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: CHAIN_ID_0x }],
      });
      window.location.reload();
    }
  }

  async function getAllModelDescriptions(): Promise<any> {
    const unsignedIndigo = unsignedContract();
    const publishModelFilter = unsignedIndigo.filters.PublishModel();
    const publishedModels = await unsignedIndigo.queryFilter(
      publishModelFilter,
    );
    return publishedModels.map((data) => {
      return formatModelDescription(data);
    });
  }

  async function getSingleModelDescription(modelName: string) {
    const unsignedIndigo = unsignedContract();
    const filter = unsignedIndigo.filters.PublishModel(modelName);
    const model = await unsignedIndigo.queryFilter(filter);
    return formatModelDescription(model[0]);
  }

  async function purchaseModel(modelName: string) {
    await changeNetwork();
    return await indigoContract.getModel(modelName);
  }

  async function getData(
    url: string,
    modelName: string,
    paymentReceipt: string,
  ) {
    const data = await fetch(
      `${url}/Prod/api/get-data?modelName=${modelName}&paymentReceipt=${paymentReceipt}`,
    );
    return data;
  }

  async function mintFreeTrialCoins() {
    await changeNetwork();
    return await indigoContract.freeTrial();
  }

  async function mintModel(name: string, cloneUrl: string): Promise<any> {
    // validate?
    await changeNetwork();
    return await indigoContract.mintModel(name, cloneUrl);
  }

  async function getReceipt(modelId: string): Promise<any> {
    return await indigoContract.getReceipt(modelId);
  }

  async function addToMetamask() {
    await window.ethereum.request({
      method: 'wallet_watchAsset',
      params: {
        type: 'ERC20', // Initially only supports ERC20, but eventually more!
        options: {
          address: tokenAddress, // The address that the token is at.
          symbol: 'INDG', // A ticker symbol or shorthand, up to 5 chars.
          decimals: 0, // The number of decimals in the token
          image: 'https://app.indigodapp.com/logo/default.svg', // A string url of the token logo
        },
      },
    });
  }

  return {
    indigoContract,
    addToMetamask,
    changeNetwork,
    getChainId,
    getAllModelDescriptions,
    getData,
    getReceipt,
    getSingleModelDescription,
    mintFreeTrialCoins,
    mintModel,
    purchaseModel,
  };
}

export default useContract;
