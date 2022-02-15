// import { ethers } from 'ethers';

// const indigoAddress = '0x12345';
// const indigoAbi = `[{
//   "inputs": [
//     {
//       "internalType": "string",
//       "name": "name",
//       "type": "string"
//     },
//     {
//       "internalType": "string",
//       "name": "cloneUrl",
//       "type": "string"
//     }
//   ],
//   "name": "mintModel",
//   "outputs": [],
//   "stateMutability": "nonpayable",
//   "type": "function"
// }]`;

// type Model = {
//   modelDescription: string;
//   fields: {
//     user_id: string;
//     nft_count: number;
//     last_seen_at: string;
//   };
//   gasFee: string;
//   ipFee: string;
// };

function useContract(provider: any, userAddress: string) {
  if (!provider) return {};
  // const indigoContract = new ethers.Contract(
  //   indigoAddress,
  //   indigoAbi,
  //   provider,
  // );
  const indigoContract: any = {};

  async function getAvailableModels(): Promise<{ available_models: string[] }> {
    return await indigoContract.getAvailableModels();
  }

  async function getModelData(
    modelName: string,
    address?: string,
  ): Promise<any> {
    console.log('getting model data');
    console.log(modelName, address);

    return;
    //returns Model type
  }

  async function getModelDetails(modelName: string) {
    return await indigoContract.getModelDetails(modelName);
  }

  async function mintFreeTrialCoins(address?: string) {
    const from = address ?? userAddress;
    return await indigoContract.mintFreeTrialCoins(from);
  }

  async function mintModelNFT(
    modelData: { modelName: string; githubUrl: string },
    address?: string,
  ): Promise<boolean> {
    // validate?
    const from = address ?? userAddress;
    return await indigoContract.mintModelNFT(from, modelData);
  }

  async function getReceipt(modelId: string): Promise<boolean> {
    console.log('receipt gotten ', modelId);
    return false;
    // return await new Promise((resolve) => resolve(true));
    // return await indigoContract.getReceipt(modelId);
  }

  return {
    indigoContract,
    getAvailableModels,
    getReceipt,
    getModelData,
    getModelDetails,
    mintFreeTrialCoins,
    mintModelNFT,
  };
}

export default useContract;
