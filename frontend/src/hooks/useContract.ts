import { ethers } from 'ethers';
import indigoAbi from 'utils/abi.json';
import formatModelDescription from '../utils/formatModelDescription';
import { CHAIN_ID, CHAIN_ID_0x } from 'utils/constants';
declare let window: any;

const indigoAddress = '0x438914A9e5d7e422de0eE0dA7B3A498e50403f43';

// type PublishedModel = {
//   modelName: string; // this is a hash .. need to add readable field
//   address: string; //hashedNodeAddress
//   url: string; // nodeUrl **SAVE IN  BACKGROUND FOR getData request**,
//   description: string; //model description .. currently hard-coded
//   gasConsumed: number;
// };

function useContract(provider: any, signer:any) {
  const indigoContract = new ethers.Contract(
    indigoAddress,
    indigoAbi,
    signer ?? provider,
  );

  async function changeNetwork() {
    const network = await provider.getNetwork();
    if (network.chainId !== CHAIN_ID) {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: CHAIN_ID_0x }],
      });
      window.location.reload();
    }
  }

  async function getAllModelDescriptions(): Promise<any> {
    await changeNetwork();
    const publishModelFilter = indigoContract.filters.PublishModel();
    const publishedModels = await indigoContract.queryFilter(
      publishModelFilter,
    );
    return publishedModels.map((data) => {
      return formatModelDescription(data);
    });
  }

  async function getSingleModelDescription(modelNameHash: string) {
    await changeNetwork();
    const filter = indigoContract.filters.PublishModel(modelNameHash);
    const model = await indigoContract.queryFilter(filter);
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
    await changeNetwork();
    const data = await fetch(
      `${url}/api/get-data?modelName=${modelName}&paymentReceipt=${paymentReceipt}`,
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

  async function getReceipt(modelId: string): Promise<boolean> {
    await changeNetwork();
    return await indigoContract.getReceipt(modelId);
  }

  return {
    indigoContract,
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
