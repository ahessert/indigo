import react from 'react';
import { ethers } from 'ethers';
import useMetamask from './useMetamask';

const indigoAddress = '0x12345';
const indigoAbi = `{fake: 'abi'}`;

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

function useContract() {
  const { userAddress, signer } = useMetamask();

  const indigoContract = new ethers.Contract(indigoAddress, indigoAbi, signer);

  async function getAvailableModels(): Promise<{ available_models: string[] }> {
    return await indigoContract.getAvailableModels();
  }

  async function getModelData(
    modelName: string,
    address?: string
  ): Promise<any> {
    // call contract with some data

    // get response

    // call db node with key? and some data
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
    address?: string
  ): Promise<boolean> {
		// validate?
    const from = address ?? userAddress;
    return await indigoContract.mintModelNFT(from, modelData);
  }

  return {
    indigoContract,
    getAvailableModels,
    getModelData,
    getModelDetails,
    mintFreeTrialCoins,
		mintModelNFT,
  };
}

export default useContract;
