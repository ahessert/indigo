import { ethers } from 'ethers';
import indigoAbi from 'utils/abi.json';
import formatModelDescription from '../utils/formatModelDescription';

const indigoAddress = '0x438914A9e5d7e422de0eE0dA7B3A498e50403f43';

// type PublishedModel = {
//   modelName: string; // this is a hash .. need to add readable field
//   address: string; //hashedNodeAddress
//   url: string; // nodeUrl **SAVE IN  BACKGROUND FOR getData request**,
//   description: string; //model description .. currently hard-coded
//   gasConsumed: number;
// };

function useContract(providerOrSigner: any) {
  const indigoContract = new ethers.Contract(
    indigoAddress,
    indigoAbi,
    providerOrSigner,
  );

  async function getAllModelDescriptions(): Promise<any> {
    const publishModelFilter = indigoContract.filters.PublishModel();
    const publishedModels = await indigoContract.queryFilter(
      publishModelFilter,
    );
    return publishedModels.map((data) => {
      return formatModelDescription(data);
    });
  }

  async function getSingleModelDescription(modelNameHash: string) {
    const filter = indigoContract.filters.PublishModel(modelNameHash);
    const model = await indigoContract.queryFilter(filter);
    return formatModelDescription(model[0]);
  }

  async function purchaseModel(modelName: string) {
    return await indigoContract.getModel(modelName);
  }

  async function getData(
    url: string,
    modelName: string,
    paymentReceipt: string,
  ) {
    const data = await fetch(
      `${url}/api/get-data?modelName=${modelName}&paymentReceipt=${paymentReceipt}`,
    );
    return data;
  }

  async function mintFreeTrialCoins() {
    return await indigoContract.freeTrial();
  }

  async function mintModel(name: string, cloneUrl: string): Promise<any> {
    // validate?
    return await indigoContract.mintModel(name, cloneUrl);
  }

  async function getReceipt(modelId: string): Promise<boolean> {
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
