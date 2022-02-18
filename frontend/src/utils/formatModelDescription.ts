import { ethers } from 'ethers';
import shortenAddress from './shortenAddress';

function formatModelDescription(model: ethers.Event) {
  const { address, args } = model;

  const modelDescription = JSON.parse(args?.description);

  return {
    address: shortenAddress(address),
    modelName: args?.modelName,
    modelNameHash: args?.modelNamehash?.hash,
    description: modelDescription.text,
    dapps: modelDescription.symbols,
    feeTotal: ethers.utils.formatUnits(args?.feeTotal, 0),
    url: args?._url
  };
}

export default formatModelDescription;
